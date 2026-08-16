/**
 * Handle Telegram polling errors.
 * @param {Error} error - The error object.
 * @return {void}
 */
export default (error: Error): void => {
    console.warn("Telegram polling error:", error);
};
