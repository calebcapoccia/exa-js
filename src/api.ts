/* tslint:disable */
/* eslint-disable */
/**
 * Search API
 * A comprehensive API for neural internet-scale search, allowing users to perform queries and retrieve results from a wide variety of sources.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface FindSimilarRequest
 */
export interface FindSimilarRequest {
    /**
     * The url for which you would like to find similar links
     * @type {string}
     * @memberof FindSimilarRequest
     */
    'url': string;
    /**
     * Number of search results to return. Maximum 500. Default 100
     * @type {number}
     * @memberof FindSimilarRequest
     */
    'numResults'?: number;
    /**
     * An optional list of domain names to include in the search. If specified, results will only come from these domains.
     * @type {Array<string>}
     * @memberof FindSimilarRequest
     */
    'includeDomains'?: Array<string>;
    /**
     * An optional list of domain names to exclude from the search. If specified, results will not include any from these domains.
     * @type {Array<string>}
     * @memberof FindSimilarRequest
     */
    'excludeDomains'?: Array<string>;
    /**
     * The optional start date (inclusive) for the crawled data. Must be specified in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ). The search will only include results crawled on or after this date.
     * @type {string}
     * @memberof FindSimilarRequest
     */
    'startCrawlDate'?: string;
    /**
     * The optional end date (inclusive) for the crawled data. Must be specified in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ). The search will only include results crawled on or before this date.
     * @type {string}
     * @memberof FindSimilarRequest
     */
    'endCrawlDate'?: string;
    /**
     * The optional start date (inclusive) for the published data. Must be specified in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ). The search will only include results published on or after this date.
     * @type {string}
     * @memberof FindSimilarRequest
     */
    'startPublishedDate'?: string;
    /**
     * The optional end date (inclusive) for the published data. Must be specified in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ). The search will only include results published on or before this date.
     * @type {string}
     * @memberof FindSimilarRequest
     */
    'endPublishedDate'?: string;
}
/**
 * 
 * @export
 * @interface GetContents200Response
 */
export interface GetContents200Response {
    /**
     * A list of document contents containing URL, title, and extract. In the future, we will support more content types.
     * @type {Array<GetContents200ResponseContentsInner>}
     * @memberof GetContents200Response
     */
    'contents'?: Array<GetContents200ResponseContentsInner>;
}
/**
 * 
 * @export
 * @interface GetContents200ResponseContentsInner
 */
export interface GetContents200ResponseContentsInner {
    /**
     * The URL of the document, which directs to the web page containing the content.
     * @type {string}
     * @memberof GetContents200ResponseContentsInner
     */
    'url'?: string;
    /**
     * The title of the document, typically representing the main heading of the content.
     * @type {string}
     * @memberof GetContents200ResponseContentsInner
     */
    'title'?: string;
    /**
     * The first 1000 tokens of content in the document. This is designed for current language models to process.
     * @type {string}
     * @memberof GetContents200ResponseContentsInner
     */
    'extract'?: string;
}
/**
 * 
 * @export
 * @interface Result
 */
export interface Result {
    /**
     * The title of the search result, typically representing the main heading of the content.
     * @type {string}
     * @memberof Result
     */
    'title'?: string;
    /**
     * The URL of the search result, which directs to the web page containing the relevant content.
     * @type {string}
     * @memberof Result
     */
    'url'?: string;
    /**
     * An estimate of the creation date, from parsing HTML content. Format is YYYY-MM-DD. Nullable
     * @type {string}
     * @memberof Result
     */
    'publishedDate'?: string | null;
    /**
     * If available, the author of the content. Nullable
     * @type {string}
     * @memberof Result
     */
    'author'?: string | null;
    /**
     * A number from 0 to 1 representing similarity between the query/url and the result
     * @type {number}
     * @memberof Result
     */
    'score'?: number;
    /**
     * The temporary ID for the document. Useful for /contents endpoint.
     * @type {string}
     * @memberof Result
     */
    'id'?: string;
}
/**
 * 
 * @export
 * @interface Search200Response
 */
export interface Search200Response {
    /**
     * A list of search results containing title, URL, published date, author, and score.
     * @type {Array<Result>}
     * @memberof Search200Response
     */
    'results'?: Array<Result>;
}
/**
 * 
 * @export
 * @interface SearchRequest
 */
export interface SearchRequest {
    /**
     * The query string. On the web, people often recommend content - it\'s vital that the query takes the form of a declarative suggestion, where a high quality search result link would follow.
     * @type {string}
     * @memberof SearchRequest
     */
    'query': string;
    /**
     * Number of search results to return. Maximum 500. Default 100
     * @type {number}
     * @memberof SearchRequest
     */
    'numResults'?: number;
    /**
     * List of domains to include in the search. If specified, results will only come from these domains. Only one of includeDomains and excludeDomains should be specified.
     * @type {Array<string>}
     * @memberof SearchRequest
     */
    'includeDomains'?: Array<string>;
    /**
     * List of domains to exclude in the search. If specified, results will only come from these domains. Only one of includeDomains and excludeDomains should be specified.
     * @type {Array<string>}
     * @memberof SearchRequest
     */
    'excludeDomains'?: Array<string>;
    /**
     * \"Crawl date\" refers to the date that Metaphor discovered a link, which is more granular and can be more useful than published date. If startCrawlDate is specified, results will only include links that were crawled after startCrawlDate. Must be specified in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)
     * @type {string}
     * @memberof SearchRequest
     */
    'startCrawlDate'?: string;
    /**
     * \"Crawl date\" refers to the date that Metaphor discovered a link, which is more granular and can be more useful than published date. If endCrawlDate is specified, results will only include links that were crawled before endCrawlDate. Must be specified in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)
     * @type {string}
     * @memberof SearchRequest
     */
    'endCrawlDate'?: string;
    /**
     * If specified, only links with a published date after startPublishedDate will be returned. Must be specified in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ). Note that for some links, we have no published date, and these links will be excluded from the results if startPublishedDate is specified.
     * @type {string}
     * @memberof SearchRequest
     */
    'startPublishedDate'?: string;
    /**
     * If specified, only links with a published date before endPublishedDate will be returned. Must be specified in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ). Note that for some links, we have no published date, and these links will be excluded from the results if endPublishedDate is specified.
     * @type {string}
     * @memberof SearchRequest
     */
    'endPublishedDate'?: string;
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Find similar links to the link provided.
         * @summary Find similar links
         * @param {FindSimilarRequest} findSimilarRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findSimilar: async (findSimilarRequest: FindSimilarRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'findSimilarRequest' is not null or undefined
            assertParamExists('findSimilar', 'findSimilarRequest', findSimilarRequest)
            const localVarPath = `/findSimilar`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apikey required
            await setApiKeyToObject(localVarHeaderParameter, "x-api-key", configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(findSimilarRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Retrieve contents of documents based on a list of document IDs.
         * @summary Get contents of documents
         * @param {Array<string>} ids An array of document IDs obtained from either /search or /findSimilar endpoints.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContents: async (ids: Array<string>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'ids' is not null or undefined
            assertParamExists('getContents', 'ids', ids)
            const localVarPath = `/contents`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apikey required
            await setApiKeyToObject(localVarHeaderParameter, "x-api-key", configuration)

            if (ids) {
                localVarQueryParameter['ids'] = ids;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Perform a search with a Metaphor prompt-engineered query and retrieve a list of relevant results.
         * @summary Search
         * @param {SearchRequest} searchRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        search: async (searchRequest: SearchRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'searchRequest' is not null or undefined
            assertParamExists('search', 'searchRequest', searchRequest)
            const localVarPath = `/search`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apikey required
            await setApiKeyToObject(localVarHeaderParameter, "x-api-key", configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(searchRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * Find similar links to the link provided.
         * @summary Find similar links
         * @param {FindSimilarRequest} findSimilarRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findSimilar(findSimilarRequest: FindSimilarRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Search200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findSimilar(findSimilarRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Retrieve contents of documents based on a list of document IDs.
         * @summary Get contents of documents
         * @param {Array<string>} ids An array of document IDs obtained from either /search or /findSimilar endpoints.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getContents(ids: Array<string>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetContents200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getContents(ids, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Perform a search with a Metaphor prompt-engineered query and retrieve a list of relevant results.
         * @summary Search
         * @param {SearchRequest} searchRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async search(searchRequest: SearchRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Search200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.search(searchRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * Find similar links to the link provided.
         * @summary Find similar links
         * @param {FindSimilarRequest} findSimilarRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findSimilar(findSimilarRequest: FindSimilarRequest, options?: any): AxiosPromise<Search200Response> {
            return localVarFp.findSimilar(findSimilarRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve contents of documents based on a list of document IDs.
         * @summary Get contents of documents
         * @param {Array<string>} ids An array of document IDs obtained from either /search or /findSimilar endpoints.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContents(ids: Array<string>, options?: any): AxiosPromise<GetContents200Response> {
            return localVarFp.getContents(ids, options).then((request) => request(axios, basePath));
        },
        /**
         * Perform a search with a Metaphor prompt-engineered query and retrieve a list of relevant results.
         * @summary Search
         * @param {SearchRequest} searchRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        search(searchRequest: SearchRequest, options?: any): AxiosPromise<Search200Response> {
            return localVarFp.search(searchRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export default class DefaultApi extends BaseAPI {
    /**
     * Find similar links to the link provided.
     * @summary Find similar links
     * @param {FindSimilarRequest} findSimilarRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public findSimilar(findSimilarRequest: FindSimilarRequest, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).findSimilar(findSimilarRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieve contents of documents based on a list of document IDs.
     * @summary Get contents of documents
     * @param {Array<string>} ids An array of document IDs obtained from either /search or /findSimilar endpoints.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getContents(ids: Array<string>, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).getContents(ids, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Perform a search with a Metaphor prompt-engineered query and retrieve a list of relevant results.
     * @summary Search
     * @param {SearchRequest} searchRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public search(searchRequest: SearchRequest, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).search(searchRequest, options).then((request) => request(this.axios, this.basePath));
    }
}

