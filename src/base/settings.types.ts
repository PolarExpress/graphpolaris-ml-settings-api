/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used for documentation.
import { receiveSettings } from "./eventListeners";

/**
 * The type that configurations must adhere to. The keys must be strings and the
 * values can be any JS objects that can be cloned by
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm structuredClone()}.
 *
 * @see {@link receiveSettings}
 */
export type Settings = Record<string, unknown>;
