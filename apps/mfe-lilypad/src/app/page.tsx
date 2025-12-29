"use client";
import Editor, { useMonaco } from "@monaco-editor/react";

export default function Page() {
  return (
    <div>
      <C />
      <Editor
        className="h-full min-h-svh"
        language="javascript"
        onChange={(value, event) => {
          console.log({
            value,
            event,
          });
        }}
        theme="vs-dark"
      />
    </div>
  );
}

function C() {
  const a = useMonaco();

  return (
    <button
      onClick={() => {
        if (!a) return;
        console.log(a.editor);
      }}
    >
      a
    </button>
  );
}
