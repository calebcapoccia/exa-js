import fetch, { Headers } from "cross-fetch";

const isBeta = false;

/**
 * Search options for performing a search query.
 * @typedef {Object} SearchOptions
 * @property {number} [numResults] - Number of search results to return. Default 10. Max 10 for basic plans.
 * @property {string[]} [includeDomains] - List of domains to include in the search.
 * @property {string[]} [excludeDomains] - List of domains to exclude in the search.
 * @property {string} [startCrawlDate] - Start date for results based on crawl date.
 * @property {string} [endCrawlDate] - End date for results based on crawl date.
 * @property {string} [startPublishedDate] - Start date for results based on published date.
 * @property {string} [endPublishedDate] - End date for results based on published date.
 * @property {boolean} [useAutoprompt] - If true, converts query to a Exa query.
 * @property {string} [type] - Type of search, 'keyword', 'neural', or 'auto'.
 * @property {string} [category] - A data category to focus on.
 * @property {string[]} [includeText] - List of strings that must be present in webpage text of results.
 * @property {string[]} [excludeText] - List of strings that must not be present in webpage text of results.
 */
export type BaseSearchOptions = {
  numResults?: number;
  includeDomains?: string[];
  excludeDomains?: string[];
  startCrawlDate?: string;
  endCrawlDate?: string;
  startPublishedDate?: string;
  endPublishedDate?: string;
  category?: string;
  includeText?: string[];
  excludeText?: string[];
};

export type RegularSearchOptions = BaseSearchOptions & {
  useAutoprompt?: boolean;
  type?: string;
};

export type FindSimilarOptions = BaseSearchOptions & {
  excludeSourceDomain?: boolean;
};

export type ContentsOptions = {
  text?: TextContentsOptions | true;
  highlights?: HighlightsContentsOptions | true;
  summary?: SummaryContentsOptions | true;
  livecrawl?: LivecrawlOptions;
  livecrawlTimeout?: number;
  filterEmptyResults?: boolean;
  subpages?: number;
  subpageTarget?: string | string[];
  extras?: ExtrasOptions;
};

export type ExtrasOptions = {
  links?: number;
};

export type LivecrawlOptions = "never" | "fallback" | "always";

export type TextContentsOptions = {
  maxCharacters?: number;
  includeHtmlTags?: boolean;
};

export type HighlightsContentsOptions = {
  query?: string;
  numSentences?: number;
  highlightsPerUrl?: number;
};

export type SummaryContentsOptions = {
  query?: string;
};

export type TextResponse = { text: string };

export type HighlightsResponse = {
  highlights: string[];
  highlightScores: number[];
};

export type SummaryResponse = { summary: string };

export type SubpagesResponse = {
  subpages: SearchResult[];
};

export type ExtrasResponse = {
  extras: {
    links?: string[];
  };
};

export type Default<T extends {}, U> = [keyof T] extends [never] ? U : T;

export type ContentsResultComponent<T extends ContentsOptions> = Default<
  (T["text"] extends object | true ? TextResponse : {}) &
    (T["highlights"] extends object | true ? HighlightsResponse : {}) &
    (T["summary"] extends object | true ? SummaryResponse : {}) &
    (T["subpages"] extends number ? SubpagesResponse : {}) &
    (T["extras"] extends ExtrasOptions ? ExtrasResponse : {}),
  TextResponse
>;

export type SearchResult<T extends ContentsOptions = {}> = {
  title: string | null;
  url: string;
  publishedDate?: string;
  author?: string;
  score?: number;
  id: string;
  image?: string;
} & ContentsResultComponent<T>;

export type SearchResponse<T extends ContentsOptions = {}> = {
  results: SearchResult<T>[];
  autopromptString?: string;
  autoDate?: string;
  requestId: string;
};

class Exa {
  private baseURL: string;
  private headers: Headers;

  constructor(apiKey?: string, baseURL: string = "https://api.exa.ai") {
    this.baseURL = baseURL;
    if (!apiKey) {
      apiKey = process.env.EXASEARCH_API_KEY;
      if (!apiKey) {
        throw new Error(
          "API key must be provided as an argument or as an environment variable (EXASEARCH_API_KEY)",
        );
      }
    }
    this.headers = new Headers({
      "x-api-key": apiKey,
      "Content-Type": "application/json",
      "User-Agent": "exa-node 1.1.0",
    });
  }

  private async request(
    endpoint: string,
    method: string,
    body?: any,
  ): Promise<any> {
    const response = await fetch(this.baseURL + endpoint, {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const message = (await response.json()).error;
      throw new Error(
        `Request failed with status ${response.status}. ${message}`,
      );
    }

    return await response.json();
  }

  async search(
    query: string,
    options?: RegularSearchOptions,
  ): Promise<SearchResponse> {
    return await this.request("/search", "POST", { query, ...options });
  }

  async searchAndContents<T extends ContentsOptions>(
    query: string,
    options?: RegularSearchOptions & T,
  ): Promise<SearchResponse<T>> {
    const { text, highlights, summary, subpages, subpageTarget, extras, ...rest } = options || {};
    return await this.request("/search", "POST", {
      query,
      contents:
        !text && !highlights && !summary && !subpages && !subpageTarget && !extras
          ? {
              text: true,
              ...options,
            }
          : {
              ...(text ? { text } : {}),
              ...(highlights ? { highlights } : {}),
              ...(summary ? { summary } : {}),
              ...(subpages ? { subpages } : {}),
              ...(subpageTarget ? { subpageTarget } : {}),
              ...(extras ? { extras } : {}),
              ...options,
            },
      ...rest,
    });
  }

  async findSimilar(
    url: string,
    options?: FindSimilarOptions,
  ): Promise<SearchResponse> {
    return await this.request("/findSimilar", "POST", { url, ...options });
  }

  async findSimilarAndContents<T extends ContentsOptions>(
    url: string,
    options?: FindSimilarOptions & T,
  ): Promise<SearchResponse<T>> {
    const { text, highlights, summary, subpages, subpageTarget, extras, ...rest } = options || {};
    return await this.request("/findSimilar", "POST", {
      url,
      contents:
        !text && !highlights && !summary && !subpages && !subpageTarget && !extras
          ? {
              text: true,
              livecrawl: options?.livecrawl,
              livecrawlTimeout: options?.livecrawlTimeout,
              ...options,
            }
          : {
              livecrawl: options?.livecrawl,
              livecrawlTimeout: options?.livecrawlTimeout,
              ...(text ? { text } : {}),
              ...(highlights ? { highlights } : {}),
              ...(summary ? { summary } : {}),
              ...(subpages ? { subpages } : {}),
              ...(subpageTarget ? { subpageTarget } : {}),
              ...(extras ? { extras } : {}),
              ...options,
            },
      ...rest,
    });
  }

  async getContents<T extends ContentsOptions>(
    ids: string | string[] | SearchResult[],
    options?: T,
  ): Promise<SearchResponse<T>> {
    if (ids.length === 0) {
      throw new Error("Must provide at least one ID");
    }
    let requestIds: string[];
    if (typeof ids === "string") {
      requestIds = [ids];
    } else if (typeof ids[0] === "string") {
      requestIds = ids as string[];
    } else {
      requestIds = (ids as SearchResult[]).map((result) => result.id);
    }
    return await this.request(`/contents`, "POST", {
      ids: requestIds,
      ...options,
    });
  }
}

export default Exa;