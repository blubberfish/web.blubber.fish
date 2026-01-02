import { useEffect, useState } from "react";
import { join } from "./utils";

export function useFolder(
  root?: FileSystemDirectoryHandle | Promise<FileSystemDirectoryHandle>,
  basePath = ""
) {
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState<Promise<FileSystemDirectoryHandle>>();
  const [origin, setOrigin] = useState<FileSystemDirectoryHandle>();
  const [directories, setDirectories] = useState<FileSystemDirectoryHandle[]>();
  const [files, setFiles] = useState<FileSystemFileHandle[]>();
  useEffect(() => {
    setPending(Promise.resolve(root ?? navigator.storage.getDirectory()));
    setReady(true);
  }, [root]);
  useEffect(() => {
    if (!pending) {
      return;
    }
    let cancel = false;
    pending.then(async (resolvedRoot) => {
      const directories: FileSystemDirectoryHandle[] = [];
      const files: FileSystemFileHandle[] = [];
      for await (const handle of (
        resolvedRoot as typeof resolvedRoot & {
          values(): AsyncIterable<
            FileSystemDirectoryHandle | FileSystemFileHandle
          >;
        }
      ).values()) {
        switch (handle.kind) {
          case "directory":
            directories.push(handle as FileSystemDirectoryHandle);
            break;
          case "file":
            files.push(handle as FileSystemFileHandle);
            break;
        }
      }
      if (cancel) return;
      setOrigin(resolvedRoot);
      setDirectories(directories);
      setFiles(files);
      setPending(() => undefined);
    });
    return () => {
      cancel = true;
    };
  }, [pending]);

  return !ready || pending
    ? null
    : {
        getPath() {
          if (!origin) throw new Error();
          return join(basePath, origin.name);
        },
        getRoot() {
          if (!origin) throw new Error();
          return origin;
        },
        getDirectories() {
          if (!directories) throw new Error();
          return directories;
        },
        getFiles() {
          if (!files) throw new Error();
          return files;
        },
        createFolder(name: string) {
          if (!origin) throw new Error();
          if (directories?.some((dir) => dir.name === name)) {
            return;
          }
          setPending(
            origin.getDirectoryHandle(name, { create: true }).then(() => origin)
          );
        },
        createFile(name: string) {
          if (!origin) throw new Error();
          if (files?.some((file) => file.name === name)) {
            return;
          }
          setPending(
            origin.getFileHandle(name, { create: true }).then(() => origin)
          );
        },
        delete(name: string) {
          if (!origin) throw new Error();
          if (
            !(
              files?.some((file) => file.name === name) ||
              directories?.some((dir) => dir.name === name)
            )
          ) {
            return;
          }
          setPending(origin.removeEntry(name).then(() => origin));
        },
      };
}
