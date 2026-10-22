export default function Tag({ tag, useFor }) {
  return (
    <span className={`uppercase inline-flex h-fit w-fit items-center justify-center rounded-2xl bg-white/15 px-3 py-1 font-doto font-semibold tracking-wide shadow-sm backdrop-blur-md ${useFor === "banner"
      ? "text-lg text-foreground"
      : useFor === "main_banner"
        ? "text-sm text-white"
        : "text-sm text-foreground"}`}>
      {tag}
    </span>
  );
}
