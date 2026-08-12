import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../sanity/image";

const components = {
  types: {
    image: ({ value }) => {
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
          <Image
            src={urlFor(value).width(1600).url()}
            alt={value.alt || "Blog image"}
            width={1600}
            height={900}
            className="h-auto w-full rounded-2xl object-cover"
          />

          {value.caption && (
            <figcaption className="text-foreground/60 -mt-6 text-center text-sm">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    code: ({ value }) => (
      <pre className="bg-primary text-foreground my-8 overflow-x-auto rounded-2xl p-6 text-sm">
        <code>{value.code}</code>
      </pre>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="mt-12 mb-6 text-2xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-xl font-semibold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-lg font-semibold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-3 text-lg font-normal">{children}</h4>
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
        className="text-[#FE257B] underline underline-offset-4"
      >
        {children}
      </a>
    ),

    textColor: ({ children, value }) => (
      <span style={{ color: value?.color }}>{children}</span>
    ),

    backgroundColor: ({ children, value }) => (
      <span
        style={{ backgroundColor: value?.color }}
        className="rounded px-1 text-gray-500"
      >
        {children}
      </span>
    ),

    highlight: ({ children }) => (
      <span className="rounded bg-[#9ca3af] p-1">{children}</span>
    ),
  },
};

export default function PortableContent({ value }) {
    return <PortableText value={value} components={components} />;
}