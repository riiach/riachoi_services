import { createElement } from "react";
import { parseDocument } from "htmlparser2";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import java from "highlight.js/lib/languages/java";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import sql from "highlight.js/lib/languages/sql";
import python from "highlight.js/lib/languages/python";
import php from "highlight.js/lib/languages/php";
import cpp from "highlight.js/lib/languages/cpp";
import yaml from "highlight.js/lib/languages/yaml";

const grammars = { javascript, typescript, java, css, xml, bash, json, sql, python, php, cpp, yaml };
for (const [name, grammar] of Object.entries(grammars)) hljs.registerLanguage(name, grammar);
const aliases = { js: "javascript", jsx: "javascript", ts: "typescript", tsx: "typescript", html: "xml", sh: "bash", shell: "bash", "c++": "cpp", yml: "yaml" };

const languageLabels = { javascript: "JavaScript", typescript: "TypeScript", java: "Java", jsx: "JSX", tsx: "TSX", css: "CSS", html: "HTML", xml: "HTML / XML", bash: "Bash", json: "JSON", sql: "SQL", python: "Python", php: "PHP", cpp: "C++", yaml: "YAML" };

export function CodeBlock({ value }) {
  const code = value?.code || "";
  const selected = value?.language?.trim().toLowerCase();
  const explicit = aliases[selected] || selected;
  // Short SQL snippets can otherwise resemble shell commands to auto-detection.
  const language = explicit || (/^\s*(?:SELECT\b[\s\S]*?\bFROM\b|(?:INSERT\s+INTO|UPDATE|DELETE\s+FROM|CREATE\s+TABLE|ALTER\s+TABLE)\b)/i.test(code) ? "sql" : undefined);
  const plain = ["text", "plaintext", "plain"].includes(language);
  const highlighted = plain ? null : hljs.getLanguage(language || "")
    ? hljs.highlight(code, { language })
    : hljs.highlightAuto(code, Object.keys(grammars));
  const displayLanguage = plain ? "Plain text" : languageLabels[selected] || languageLabels[highlighted?.language] || "Code";
  return createElement("figure", { className: "blog-code my-8 min-w-0 overflow-hidden rounded-2xl" },
    createElement("figcaption", { className: "border-b border-foreground/10 px-6 py-3 text-xs font-medium text-foreground/65" }, displayLanguage),
    createElement("pre", { className: "m-0 overflow-x-auto p-6 text-sm", "aria-label": `${displayLanguage} code` },
      highlighted
        ? createElement("code", {
            className: `hljs${highlighted.language ? ` language-${highlighted.language}` : ""}`,
            // highlight.js escapes source text before generating token spans.
            dangerouslySetInnerHTML: { __html: highlighted.value },
          })
        : createElement("code", null, code)));
}

const tableTags = new Set(["table", "caption", "thead", "tbody", "tfoot", "tr", "th", "td", "colgroup", "col"]);
const inlineTags = new Set(["strong", "b", "em", "i", "u", "s", "code", "br", "p", "span", "sub", "sup"]);

function renderNodes(nodes, inTable = false) {
  return nodes.flatMap((node, index) => {
    if (node.type === "text") return inTable ? [node.data] : [];
    if (node.type !== "tag") return [];
    const isTable = node.name === "table";
    if (!isTable && !inTable) return renderNodes(node.children || []);
    if (!tableTags.has(node.name) && !inlineTags.has(node.name)) return [];
    const props = { key: index };
    if (node.name === "td" || node.name === "th") {
      for (const [htmlName, reactName] of [["colspan", "colSpan"], ["rowspan", "rowSpan"]]) {
        const value = node.attribs[htmlName];
        if (/^[1-9]\d{0,2}$/.test(value || "")) props[reactName] = Number(value);
      }
      if (node.name === "th" && ["row", "col", "rowgroup", "colgroup"].includes(node.attribs.scope)) {
        props.scope = node.attribs.scope;
      }
    }
    // Never pass arbitrary HTML attributes, handlers, URLs or CSS to React.
    let children = node.children || [];
    if (isTable) {
      // Browsers insert tbody around bare rows; match that structure for hydration.
      const normalized = [];
      let body;
      for (const child of children) {
        if (child.type === "text" && !child.data.trim()) continue;
        if (child.type === "tag" && child.name === "tr") {
          if (!body) {
            body = { type: "tag", name: "tbody", attribs: {}, children: [] };
            normalized.push(body);
          }
          body.children.push(child);
        } else {
          body = null;
          normalized.push(child);
        }
      }
      children = normalized;
    }
    return [createElement(node.name, props, ...renderNodes(children, true))];
  });
}

export function HtmlTable({ value }) {
  const document = parseDocument(value?.html || "");
  return createElement("div", { className: "blog-table my-8 overflow-x-auto" },
    ...renderNodes(document.children));
}
