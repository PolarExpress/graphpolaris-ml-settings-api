/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */
import type { Settings } from ".";
import type { ReadyMessage, ReceiveMessage, SendMessage } from "../internal";

/**
 * Performs an action every time a message of the specified type is received.
 *
 * @param   typeFilter    The type of messages to listen for.
 * @param   callback      The action to perform an receiving a message.
 * @param   windowContext The window to attach to.
 *
 * @returns               A function to unsubscribe from the message event
 *   listener.
 *
 * @category Message event listeners
 *
 * @internal
 */
export function receiveMessage<
  TFilter extends ReceiveMessage["type"],
  TData extends Extract<ReceiveMessage, { type: TFilter }>["data"]
>(
  typeFilter: TFilter,
  callback: (data: TData) => void,
  windowContext: Window = window
): () => void {
  function updateMessage(event: MessageEvent<ReceiveMessage>) {
    const data = event.data;

    if (data.type === typeFilter) callback(data.data as TData);
  }

  const readyMessage: ReadyMessage = {
    data: undefined,
    type: `${typeFilter}Ready`
  };

  windowContext.addEventListener("message", updateMessage);
  sendMessage(readyMessage);

  return () => windowContext.removeEventListener("message", updateMessage);
}

/**
 * Performs an action every time a message with settings is received.
 *
 * @param   callback The action to perform an receiving a message.
 *
 * @returns          A function to unsubscribe from the message event listener.
 *
 * @category Message event listeners
 */
export function receiveSettings(callback: (data: Settings) => void) {
  return receiveMessage("MLSettings", callback);
}

/**
 * Sends a message to the GraphPolaris frontend.
 *
 * @param message The message to send.
 *
 * @category Message event listeners
 *
 * @internal
 */
export function sendMessage(message: SendMessage) {
  window.top?.postMessage(message, "*");
}

/**
 * Send a message with updated settings to the GraphPolaris frontend.
 *
 * @param settings The updated settings to send. Only the modified settings need
 *   to be sent.
 *
 * @category Message event listeners
 */
export function sendSettings(settings: Settings) {
  sendMessage({
    data: settings,
    type: "MLSettings"
  });
}
