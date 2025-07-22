/**
 * Logs detailed error information to the console, including the context, error message, stack trace, and timestamp.
 *
 * @function logError
 * 
 * @param {string} context - The context or module where the error occurred.
 * @param {Error} error - The error object containing the message and stack trace.
 *
 * @returns {void} This function does not return any value, it just logs the error to the console.
 */
export const consoleError = (context, error) => {
   console.error(`
 ------------------------------------------------------------------------
 [ERROR] Internal Server Error in "${context}"
    \nERROR MESSAGE: ${error.message}
    \nERROR STACK: ${error.stack}
 \nTIMESTAMP: ${new Date().toISOString()}
 ------------------------------------------------------------------------
 `);
}
