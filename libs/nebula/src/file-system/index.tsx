"use client";

import { useMemo, useState } from "react";
import { CreateFolderButton } from "./components/create-folder-button";
import { useFolder } from "./hooks";

export function FileExplorer({
  source,
}: {
  source?: FileSystemDirectoryHandle | Promise<FileSystemDirectoryHandle>;
}) {
  const folder = useFolder(source, "");
  const [showContent, setShowContent] = useState(false);
  const [creatingFolder, setCreatingFolder] = useState(false);

  if (!folder) {
    return null;
  }

  const root = folder.getRoot();
  const directories = folder.getDirectories();
  const files = folder.getFiles();
  return (
    <div>
      <div>{root.name}</div>
      <nav>
        <CreateFolderButton
          disabled={creatingFolder}
          onClick={() => setCreatingFolder(true)}
        />
      </nav>
      <>
        <ul>
          {creatingFolder && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                folder.createFolder(data.get("folder") as string);
                setCreatingFolder(false);
              }}
            >
              <input type="text" name="folder" required />
            </form>
          )}
          {showContent && (
            <>
              {directories.map((directory) => (
                <li key={directory.name}>
                  <FileExplorer source={directory} />
                </li>
              ))}
            </>
          )}
        </ul>
        <ul>
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      </>
    </div>
  );
}
