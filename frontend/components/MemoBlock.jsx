export default function MemoBlock({ value }) {
  if (!value?.text) return null;
  return (
    <aside aria-label="메모" className="my-8 w-full min-w-0 whitespace-pre-wrap rounded-lg border border-black/10 bg-white p-6 leading-relaxed text-black [overflow-wrap:anywhere]">
      {value.text}
    </aside>
  );
}
