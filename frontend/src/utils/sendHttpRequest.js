import { BACKEND_URL } from '../config';
import { generateUrlQuery } from '../utils/generateUrlQuery';

/**
 * Make http request
 * @param {Object} params
 * @param {String} params.url
 * @param {String} params.method
 * @param {Object} [params.data]
 * @param {Object} [params.body] - Request body
 * @param {Object} [params.options]
 * @param {Object} [params.headers]
 * @param {Object} [params.headers]
 * @returns {Promise<Object>}
 */
export async function sendHttpRequest(params = {}) {
    const { ctx, url, data, queries, headers = {}, ...options } = params;

    const request = await fetch(
        `${BACKEND_URL}/${url}${generateUrlQuery({ queries })}`,
        {
            body: data ? JSON.stringify(data) : undefined,
            ...options,
            headers: {
                ...ctx?.req?.headers,
                'Content-Type': 'application/json',
                ...headers,
            },
        },
    );

    const result = await request.json();

    return result;
}
