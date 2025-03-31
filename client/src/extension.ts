import * as path from "path";
import { workspace, ExtensionContext, TextDocument } from "vscode";

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
  SocketTransport,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  // The server is implemented in node
  const serverModule = context.asAbsolutePath(
    path.join("server", "out", "server.js")
  );

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const transportOption = {kind:TransportKind.socket, port:1957}
  const serverOptions: ServerOptions = {
  //  run: { command: '/home/ecm/ext/Coding/lsp/riscv-lsp/lsp/riscv-lsp', transport: {kind:TransportKind.socket, port:1957}},
  //  debug: {
  //    command: '/home/ecm/ext/Coding/lsp/riscv-lsp/lsp/riscv-lsp', transport: {kind:TransportKind.socket, port:1957}
  //  },
    run: { command: '/home/ecm/ext/Coding/lsp/riscv-lsp/lsp/riscv-lsp', transport:TransportKind.stdio},
    debug: {
      command: '/home/ecm/ext/Coding/lsp/riscv-lsp/lsp/riscv-lsp', transport: TransportKind.stdio
    },
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for all documents by default
    documentSelector: [{ scheme: "file", language: "plaintext"}],
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    "risc-v",
    "RISC V lsp",
    serverOptions,
    clientOptions
  );

  // Start the client. This will also launch the server
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
