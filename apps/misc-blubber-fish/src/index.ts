function storeDelegate(
  ...params: [
    { read: { filter: string } } | { write: { filter: string; value: string } },
    { location: "sessionstorage" | "localstorage" }
  ]
) {
  const [command, options] = params;
  const storage =
    options?.location === "localstorage"
      ? window.localStorage
      : window.sessionStorage;
  if (Object.hasOwn(command, "read")) {
    const {
      read: { filter },
    } = command as { read: { filter: string } };
    return storage.getItem(filter);
  }
  const {
    write: { filter, value },
  } = command as { write: { filter: string; value: string } };
  storage.setItem(filter, value);
}

window.onmessage = (event) => {
  if (!(event instanceof MessageEvent)) return;
  if (
    !(
      event.data &&
      event.data.id &&
      typeof event.data.id === "string" &&
      /^[a-z0-9]+\.[a-z0-9]+\.[a-z0-9]+$/i.test(event.data.id) &&
      event.data.method &&
      typeof event.data.method === "string" &&
      event.data.parameters &&
      Array.isArray(event.data.parameters)
    )
  ) {
    return;
  }
  const { id, method, parameters } = event.data;
  const reply = (result: unknown, error: unknown) => {
    if (error) {
      event.source.postMessage({ id, error }, { targetOrigin: event.origin });
      return;
    }
    event.source.postMessage({ id, result }, { targetOrigin: event.origin });
  };
  switch (method) {
    case "store":
      try {
        reply(
          storeDelegate(...(parameters as Parameters<typeof storeDelegate>)),
          null
        );
      } catch (error) {
        reply(null, error);
      }
      return;
    default:
      reply(null, new Error());
      break;
  }
};

window.parent.postMessage(
  {
    id: new URLSearchParams(window.location.search).get("hs"),
    result: "ready",
  },
  { targetOrigin: "*" }
);
