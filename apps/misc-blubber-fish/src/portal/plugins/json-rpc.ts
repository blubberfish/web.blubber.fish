import { App, Hook } from "../../core";

export interface IJsonRpcRequest<TParams extends unknown[] = unknown[]> {
  jsonrpc: "2.0";
  id: string;
  method: string;
  params: TParams;
}

export interface IJsonRpcResponse<TResult = unknown, TErrorData = unknown> {
  jsonrpc: "2.0";
  id: string;
  result?: TResult;
  error?: {
    code: number;
    message: string;
    data?: TErrorData;
  };
}

export class JsonRpcRequest extends Hook implements IJsonRpcRequest {
  static readonly spec = "2.0" as const;

  static validate(payload: unknown): payload is IJsonRpcRequest {
    if (!payload) return false;
    const { jsonrpc, id, method, params } = payload as IJsonRpcRequest;
    if (
      !(
        jsonrpc === JsonRpcRequest.spec &&
        id &&
        typeof id === "string" &&
        method &&
        typeof method === "string" &&
        params &&
        Array.isArray(params)
      )
    ) {
      return false;
    }
    return true;
  }

  constructor(
    public readonly data: unknown,
    public readonly origin: string,
    public readonly source: MessageEventSource
  ) {
    super();
    if (!JsonRpcRequest.validate(data)) {
      throw new TypeError("Invalid event payload");
    }
  }

  get jsonrpc() {
    return JsonRpcRequest.spec;
  }

  get id() {
    return (this.data as IJsonRpcRequest).id;
  }

  get method() {
    return (this.data as IJsonRpcRequest).method;
  }

  get params() {
    return (this.data as IJsonRpcRequest).params;
  }

  #replied = false;

  get hasReplied() {
    return this.#replied;
  }

  replySuccess<TData = unknown>(data: TData) {
    if (this.#replied) {
      return;
    }
    this.#replied = true;
    this.source.postMessage(
      {
        id: this.id,
        jsonrpc: this.jsonrpc,
        result: data,
      },
      { targetOrigin: this.origin }
    );
  }

  replyFailure<TData = unknown>(
    code: IJsonRpcResponse["error"]["code"],
    message: IJsonRpcResponse["error"]["message"],
    data?: TData
  ) {
    if (this.#replied) {
      return;
    }
    this.#replied = true;
    this.source.postMessage(
      {
        id: this.id,
        jsonrpc: this.jsonrpc,
        error: {
          code,
          message,
          data,
        },
      },
      { targetOrigin: this.origin }
    );
  }
}

export function jsonRpcBrokerPlugin(app: App) {
  window.addEventListener("message", (event) => {
    const { data, origin, source } = event;
    if (!JsonRpcRequest.validate(data)) {
      return;
    }
    app.hook(JsonRpcRequest, data, origin, source);
  });
  return app;
}
