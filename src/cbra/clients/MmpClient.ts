// TODO: parametrize this

import User from "../models/User";
import UserFilter from "../models/UserFilter";


const clientConfig = { 
    get: (paramName: string) => {
        switch(paramName) {
            case "mmp-host": return "http://192.168.150.151:8080/api/";
            default: return "";
        }
    }
};


class MmpClient { 

    static async getUserPage(sessionToken: string, filter: UserFilter, pageSize: number, page: number, abortSignal: AbortSignal): Promise<User[]> {
        const queryParams = {} as any;
        queryParams.size = pageSize;
        queryParams.page = page;
        if (!!filter.searchText) {
            queryParams.search = filter.searchText;            
        }
        return MmpClient.get<User[]>(sessionToken, "users/list", queryParams, abortSignal).then((response: any) => {
            return response.content as User[];
        });
    }

    private static async exchange<T>(sessionToken: string, serviceUrl: string, httpMethod: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {
        const mmpHostUrl = clientConfig.get("mmp-host") as string;
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
        const queryUrl = `${mmpHostUrl}${serviceUrl}${!!queryStr ? "?" : ""}${queryStr}`;
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
        return MmpClient.exchange(sessionToken, serviceUrl, "GET", queryParams, undefined, abortSignal);
    }

    private static async put<T>(sessionToken: string, serviceUrl: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {
        return MmpClient.exchange(sessionToken, serviceUrl, "PUT", queryParams, requestBody, abortSignal);
    }

    private static async post<T>(sessionToken: string, serviceUrl: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {
        return MmpClient.exchange(sessionToken, serviceUrl, "POST", queryParams, requestBody, abortSignal);
    }

    private static async delete<T>(sessionToken: string, serviceUrl: string, queryParams: any, abortSignal: AbortSignal): Promise<T> {
        return MmpClient.exchange(sessionToken, serviceUrl, "DELETE", queryParams, undefined, abortSignal);
    }
}





export default MmpClient;