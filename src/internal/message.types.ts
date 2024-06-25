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
export interface SettingsMessage extends BaseMessage {
  data: Settings;
  type: "Settings";
}

/**
 * A message that is sent from the frontend to request the default config. The
 * response should be a {@link SettingsMessage}.
 *
 * @internal
 */
export interface SettingsRequestMessage extends BaseMessage {
  type: "SettingsRequest";
  data: undefined;
}

/**
 * A message that notifies the frontend that the add-on wants to receive data.
 *
 * @internal
 */
export interface ReadyMessage extends BaseMessage {
  data: undefined;
  type: `${ReceiveMessage["type"]}Ready`;
}

/**
 * The types of messages that an add-on can receive.
 *
 * @internal
 */
export type ReceiveMessage = SettingsMessage | SettingsRequestMessage;

/**
 * The types of messages that an add-on can send.
 *
 * @internal
 */
export type SendMessage = ReadyMessage | SettingsMessage;
