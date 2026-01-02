"use client";

import { useState } from "react";
import { useFolder } from "./hooks";

export interface IRenderFolderProps {
  folderName: string;
  isOpened?: boolean;
  canDelete?: boolean;
  onCreateFile?: { (name: string): void };
  onCreateFolder?: { (name: string): void };
  onDelete?: { (): void };
  onToggleContents?: { (): void };
}
export interface IRenderFileProps {
  fileName: string;
  folderName: string;
  canDelete?: boolean;
  onDelete?: { (): void };
}

export function FileExplorer({
  renderLoading,
  renderFile,
  renderFolder,
  basePath,
  defaultHideContents = false,
  defaultName = "(root)",
  onDeleteContent,
  source,
}: {
  basePath?: string;
  defaultHideContents?: boolean;
  defaultName?: string;
  source?: FileSystemDirectoryHandle | Promise<FileSystemDirectoryHandle>;
  onDeleteContent?: { (name: string): void };
  renderLoading: { (): React.ReactNode };
  renderFile: { (props: IRenderFileProps): React.ReactNode };
  renderFolder: { (props: IRenderFolderProps): React.ReactNode };
}) {
  const folder = useFolder(source, basePath || "");
  const [showContents, setShowContents] = useState(!defaultHideContents);

  if (!folder) {
    return renderLoading();
  }

  const directories = folder.getDirectories();
  const files = folder.getFiles();

  return (
    <>
      {renderFolder({
        folderName: folder.getRoot().name || defaultName,
        canDelete: Boolean(onDeleteContent),
        isOpened: showContents,
        onCreateFile(name) {
          folder.createFile(name);
        },
        onCreateFolder(name) {
          folder.createFolder(name);
        },
        onDelete: () => {
          if (onDeleteContent) {
            onDeleteContent(folder.getRoot().name);
          }
        },
        onToggleContents() {
          setShowContents((current) => !current);
        },
      })}
      {showContents && (
        <>
          {directories.map((directory) => (
            <FileExplorer
              defaultHideContents
              basePath={folder.getPath()}
              source={directory}
              renderLoading={renderLoading}
              renderFile={renderFile}
              renderFolder={renderFolder}
              onDeleteContent={(name) => {
                folder.delete(name);
              }}
            />
          ))}
          {files.map((file) =>
            renderFile({
              fileName: file.name,
              folderName: folder.getPath(),
              canDelete: true,
              onDelete() {
                folder.delete(file.name);
              },
            })
          )}
        </>
      )}
    </>
  );
}
