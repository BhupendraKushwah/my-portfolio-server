/**
 * @typedef {object} error_response
 * @property {number} code - The status code of the error (e.g., 400, 404, 500).
 * @property {Error|object} data - The error object or any data associated with the error (could be error message, stack, or custom data).
 */

/**
 * @typedef {object} success_response
 * @property {number} code - The success status code (usually 200 for OK).
 * @property {object|null} data - The response data (null if no data is returned, or an object containing the response).
 */

/**
 * Utility function for creating a success response.
 * 
 * @param {object|null} data - The data to be included in the success response.
 * @param {number} [code=200] - The HTTP status code (default is 200).
 * 
 * @returns {success_response} - The success response object.
 */
const success = (data = null, code = 200) => ({ code, data });

/**
 * Utility function for creating an error response.
 * 
 * @param {Error|object|null} data - The error data to include (could be an Error object or a custom error message or data).
 * @param {number} [code=500] - The HTTP status code for the error (default is 500 for Internal Server Error).
 * 
 * @returns {error_response} - The error response object.
 */
const error = (data = null, code = 500) => ({ code, data });

/**
 * Utility function for creating a bad request response.
 * 
 * @param {object|null} data - The error data associated with the bad request (e.g., validation errors).
 * @param {number} [code=400] - The HTTP status code for the bad request (default is 400).
 * 
 * @returns {error_response} - The error response object with 400 status code.
 */
const BadRequest = (data = null, code = 400) => ({ code, data });

/**
 * Utility function for creating an unauthorized request response.
 * 
 * @param {object|null} data - The error data associated with the unauthorized request (e.g., missing or invalid token).
 * @param {number} [code=401] - The HTTP status code for unauthorized requests (default is 401).
 * 
 * @returns {error_response} - The error response object with 401 status code.
 */
const Unauthorized = (data = null, code = 401) => ({ code, data });

/**
 * Utility function for creating a forbidden request response.
 * 
 * @param {object|null} data - The error data associated with the forbidden request (e.g., permission issues).
 * @param {number} [code=403] - The HTTP status code for forbidden requests (default is 403).
 * 
 * @returns {error_response} - The error response object with 403 status code.
 */
const Forbidden = (data = null, code = 403) => ({ code, data });

/**
 * Utility function for creating a not found response.
 * 
 * @param {object|null} data - The error data associated with the not found resource (e.g., resource doesn't exist).
 * @param {number} [code=404] - The HTTP status code for not found responses (default is 404).
 * 
 * @returns {error_response} - The error response object with 404 status code.
 */
const NotFound = (data = null, code = 404) => ({ code, data });

/**
 * Utility function for creating a conflict response.
 * 
 * @param {object|null} data - The error data associated with the conflict (e.g., duplicate resource).
 * @param {number} [code=409] - The HTTP status code for conflict responses (default is 409).
 * 
 * @returns {error_response} - The error response object with 409 status code.
 */
const Conflict = (data = null, code = 409) => ({ code, data });

/**
 * Utility function for creating a server error response.
 * 
 * @param {object|null} data - The error data associated with a server error (e.g., database failure).
 * @param {number} [code=500] - The HTTP status code for server errors (default is 500).
 * 
 * @returns {error_response} - The error response object with 500 status code.
 */
const InternalServerError = (data = null, code = 500) => ({ code, data });

/**
 * Utility function for creating a service unavailable response.
 * 
 * @param {object|null} data - The error data associated with service unavailability (e.g., service downtime).
 * @param {number} [code=503] - The HTTP status code for service unavailable responses (default is 503).
 * 
 * @returns {error_response} - The error response object with 503 status code.
 */
const ServiceUnavailable = (data = null, code = 503) => ({ code, data });

module.exports = {
  success,
  error,
  Error: error,
  Success: success,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  Conflict,
  InternalServerError,
  ServiceUnavailable,
};
