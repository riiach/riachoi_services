import { createElement } from "react";
import { parseDocument } from "htmlparser2";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-java.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-json.js";

const languages = new Set(["javascript", "jsx", "java", "css", "html", "bash", "json"]);

export function CodeBlock({ value }) {
  const code = value?.code || "";
  const language = languages.has(value?.language) ? value.language : null;
  return createElement("pre", { className: "blog-code my-8 overflow-x-auto rounded-2xl p-6 text-sm" },
    language
      ? createElement("code", {
          className: `language-${language}`,
          // Prism escapes source text before generating its own token spans.
          dangerouslySetInnerHTML: { __html: Prism.highlight(code, Prism.languages[language], language) },
        })
      : createElement("code", null, code));
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
