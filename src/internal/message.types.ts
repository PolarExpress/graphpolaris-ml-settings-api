/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Settings } from "../base";

/**
 * The base message type for all messages.
 */
interface BaseMessage {
  /**
   * A unique string determining the type of the message.
   */
  type: string;
  /**
   * The data sent with the message.
   */
  data: unknown;
}

/**
 * A message containing visualization settings.
 *
 * @internal
 */
export interface MLSettingsMessage extends BaseMessage {
  data: Settings;
  type: "MLSettings";
}

/**
 * A message that is sent from the frontend to request the default config. The
 * response should be a {@link MLSettingsMessage}.
 *
 * @internal
 */
export interface MLSettingsRequestMessage extends BaseMessage {
  type: "MLSettingsRequest";
  data: undefined;
}

/**
 * A message that notifies the frontend that the add-on wants to receive data.
 *
 * @internal
 */
export interface MLReadyMessage extends BaseMessage {
  data: undefined;
  type: `${MLReceiveMessage["type"]}Ready`;
}

/**
 * The types of messages that an add-on can receive.
 *
 * @internal
 */
export type MLReceiveMessage = MLSettingsMessage | MLSettingsRequestMessage;

/**
 * The types of messages that an add-on can send.
 *
 * @internal
 */
export type MLSendMessage = MLReadyMessage | MLSettingsMessage;
