import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../sanity/image";

const components = {
  types: {
    image: ({ value }) => {
      const sizeClass = {
        small: "max-w-sm",
        medium: "max-w-2xl",
        large: "max-w-4xl",
        full: "w-full",
      };

      return (
        <figure className={`mx-auto my-10 ${sizeClass[value.size] || "w-full"}`}>
          <Image
            src={urlFor(value).width(1600).url()}
            alt={value.alt || "Blog image"}
            width={1600}
            height={900}
            className="h-auto w-full rounded-2xl object-cover"
          />

          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-foreground/60">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
    block: {
      h1: ({ children }) => (
        <h1 className="text-5xl font-bold mt-12 mb-6">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
            <h2 className="mt-10 mb-4 text-3xl font-semibold">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="mt-8 mb-3 text-2xl font-semibold">{children}</h3>
        ),
      h4: ({ children }) => (
        <h4 className="text-2xl font-medium mt-6 mb-3">
          {children}
        </h4>
      ),
        h5: ({ children }) => (
            <h4 className="text-xl font-medium mt-4 mb-2">
                {children}
            </h4>
        ),
        h6: ({ children }) => (
            <h4 className="text-lg font-medium mt-2 mb-2">
                {children}
            </h4>
        ),

      normal: ({ children }) => (
            <p className="mb-5 leading-8 text-neutral-700">{children}</p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 pl-4 italic text-neutral-600">
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
      <span style={{ color: value?.color }}>
      {children}
    </span>
    ),

    backgroundColor: ({ children, value }) => (
      <span
        style={{ backgroundColor: value?.color }}
        className="rounded px-1"
      >
      {children}
    </span>
    ),

    highlight: ({ children }) => (
      <span className="rounded bg-[#eeeeee] px-1">
      {children}
    </span>
    ),
  },
};

export default function PortableContent({ value }) {
    return <PortableText value={value} components={components} />;
}