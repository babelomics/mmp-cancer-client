
class PandrugsClient {


    // TODO: remove this and make all strings ISO
    private static readonly translateDate = (dateStr: string) => {
        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(5, 7);
        const day = dateStr.substring(8, 10);
        return `${day}/${month}/${year}`;
    }

    private static async exchange<T>(sessionToken: string, serviceUrl: string, httpMethod: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {

        const API_ENDPOINT = "localhost:8080/drugSets";

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionToken}`,
        };
        const params = {
            method: httpMethod,
            headers: headers,
            signal: abortSignal,
            body: undefined === requestBody ? undefined : JSON.stringify(requestBody)
        };
        const queryStr = undefined === queryParams ? "" : Object.entries(queryParams)
            .filter(([paramName, paramValue]) => undefined !== paramValue)
            .map(([paramName, paramValue]) => {
                const value: string = paramValue instanceof Date ? paramValue.toISOString() : paramValue as string;
                return `${encodeURIComponent(paramName)}=${encodeURIComponent(value)}`;
            }).join("&");
        const queryUrl = `${API_ENDPOINT}${serviceUrl}${!!queryStr ? "?" : ""}${queryStr}`;
        const response = await fetch(queryUrl, params);
        if (!!response.ok) {
            const actualResponse = await response.json();
            return actualResponse;
        } else {
            const error = new Error(response.statusText);
            error.name = `${response.status}`;
            throw error;
        }
    }

    private static async get<T>(sessionToken: string, serviceUrl: string, queryParams: any, abortSignal: AbortSignal): Promise<T> {
        return PandrugsClient.exchange(sessionToken, serviceUrl, "GET", queryParams, undefined, abortSignal);
    }

    private static async put<T>(sessionToken: string, serviceUrl: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {
        return PandrugsClient.exchange(sessionToken, serviceUrl, "PUT", queryParams, requestBody, abortSignal);
    }

    private static async post<T>(sessionToken: string, serviceUrl: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {
        return PandrugsClient.exchange(sessionToken, serviceUrl, "POST", queryParams, requestBody, abortSignal);
    }

    private static async delete<T>(sessionToken: string, serviceUrl: string, queryParams: any, abortSignal: AbortSignal): Promise<T> {
        return PandrugsClient.exchange(sessionToken, serviceUrl, "DELETE", queryParams, undefined, abortSignal);
    }
}


export default PandrugsClient;