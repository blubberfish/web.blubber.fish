"use client";

import { FolderPlus } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

export function CreateFolderButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button title="create folder" type="button" {...props}>
      <FolderPlus />
    </button>
  );
}
