import Image from "next/image";
import MemoBlock from "./MemoBlock";
import MermaidDiagram from "./MermaidDiagram";
import { getHeadingId } from "../lib/util/article-headings";
import { CodeBlock, HtmlTable } from "./RichContentBlocks.js";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../sanity/image";

function ContentImage({ value }) {
  const animated = value._type === "gif" || /-gif$/.test(value.asset?._ref || value.asset?._id || "") || /\.gif(?:[?#]|$)/i.test(value.asset?.url || "");
  const sizeClass = {
    small: "max-w-xs",
    medium: "max-w-2xl",
    large: "max-w-4xl",
    full: "w-full",
  };

  return (
    <figure
      className={`my-10 mr-auto ${sizeClass[value.size] || "w-full"}`}
    >
      {value?.asset?._ref || value?.asset?._id || value?.asset?.url ? (
        <Image
          src={animated ? urlFor(value).url() : urlFor(value).width(1600).url()}
          unoptimized={animated}
          alt={value.alt || "Blog image"}
          width={1600}
          height={900}
          className="h-auto w-full rounded-2xl object-cover"
        />
      ) : null}

      {value.caption && (
        <figcaption className="text-foreground/60 -mt-6 text-center text-sm">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}

const components = {
  types: {
    image: ContentImage,
    gif: ContentImage,

    code: ({ value }) => <CodeBlock value={value} />,
    memo: MemoBlock,
    htmlTable: ({ value }) => <HtmlTable value={value} />,
    mermaidDiagram: ({ value }) => <MermaidDiagram value={value} />,
  },
  block: {
    h1: ({ children, value, index }) => (
      <h1 id={getHeadingId(value, index)} tabIndex={-1} className="scroll-mt-24 mt-12 mb-6 text-3xl font-bold">{children}</h1>
    ),
    h2: ({ children, value, index }) => (
      <h2 id={getHeadingId(value, index)} tabIndex={-1} className="scroll-mt-24 mt-10 mb-4 text-2xl font-semibold">{children}</h2>
    ),
    h3: ({ children, value, index }) => (
      <h3 id={getHeadingId(value, index)} tabIndex={-1} className="scroll-mt-24 mt-8 mb-3 text-xl font-semibold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-3 text-lg font-semibold">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="mt-4 mb-2 text-base font-semibold">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="mt-4 mb-2 text-sm font-semibold">{children}</h6>
    ),

    normal: ({ children }) => {
      const isEmpty =
        !children ||
        (Array.isArray(children) && children.every((child) => !child));

      return (
        <p className="text-foreground mb-5 leading-8">
          {isEmpty ? "\u00A0" : children}
        </p>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="text-foreground/80 my-6 border-l-4 pl-4 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  marks: {
    "strike-through": ({ children }) => <s>{children}</s>,
    code: ({ children }) => (
      <code className="bg-foreground/10 text-accent rounded-md px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.openInNewTab ? "_blank" : "_self"}
        rel={value?.openInNewTab ? "noopener noreferrer" : undefined}
        className="text-foreground underline underline-offset-4 [overflow-wrap:anywhere]"
      >
        {children}
      </a>
    ),

    textColor: ({ children, value }) => (
      <span style={{ color: value?.color }}>{children}</span>
    ),

    backgroundColor: ({ children, value }) => (
      <span
        data-highlight={value?.color ? "" : undefined}
        style={{ backgroundColor: value?.color }}
        className="rounded-sm px-1 text-black"
      >
        {children}
      </span>
    ),

    highlight: ({ children }) => (
      <span data-highlight="" className="rounded-sm bg-yellow-200/80 px-1 text-black">{children}</span>
    ),
  },
};

export default function PortableContent({ value }) {
    return <PortableText value={value} components={components} />;
}