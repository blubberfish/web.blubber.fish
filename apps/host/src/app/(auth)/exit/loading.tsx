export default function Loading() {
  return (
    <div className="w-xs mx-auto p-6 gap-6 flex flex-col items-center-safe bg-gray-800 rounded">
      <div className="size-16 rounded-full border border-sky-600 border-t-gray-300 animate-spin" />
      <p className="font-semibold">Please wait...</p>
    </div>
  );
}
