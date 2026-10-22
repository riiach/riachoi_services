export default function Tag({ tag, useFor }) {
  return (
    <span className={`inline-flex h-fit w-fit items-center justify-center rounded-lg border border-white/40 bg-white/15 px-3 py-1 font-mono font-semibold tracking-wide text-white shadow-sm backdrop-blur-md ${useFor === "banner" ? "text-lg" : "text-sm"}`}>
      {tag}
    </span>
  );
}
