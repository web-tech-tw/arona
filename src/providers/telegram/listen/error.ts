/**
 * Handle Telegram client errors.
 * @param {Error} error - The error object.
 * @return {void}
 */
export default (error: Error): void => {
    console.warn("Telegram client error:", error);
};
