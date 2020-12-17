import User from "../models/User";
import UserFilter from "../models/UserFilter";

import { API_ENDPOINT } from '../../utils/constants';


class MmpClient {

    static async getUserPage(sessionToken: string, filter: UserFilter, pageSize: number, page: number, abortSignal: AbortSignal): Promise<User[]> {
        const queryParams = {} as any;
        queryParams.size = pageSize;
        queryParams.page = page;
        if (!!filter.searchText) {
            queryParams.search = filter.searchText;
        }
        if (!!filter.createdAfter) {
            queryParams.dateCreatedStart = this.translateDate(filter.createdAfter.toISOString().substring(0, 10));
        }
        if (!!filter.createdBefore) {
            queryParams.dateCreatedEnd = this.translateDate(filter.createdBefore.toISOString().substring(0, 10));
        }
        if (!!filter.lastAccessAfter) {
            queryParams.dateLastAccessStart = this.translateDate(filter.lastAccessAfter.toISOString().substring(0, 10));
        }
        if (!!filter.lastAccessBefore) {
            queryParams.dateLastAccessEnd = this.translateDate(filter.lastAccessBefore.toISOString().substring(0, 10));
        }
        if (!!filter.sortBy) {
            const value = filter.sortBy + (undefined !== filter.sortDirection ? "," + filter.sortDirection : "");
            queryParams.sort = value;
        }
        if (!!filter.userType) {
            queryParams.userType = filter.userType;
        }
        return MmpClient.get<User[]>(sessionToken, "/users/list", queryParams, abortSignal).then((response: any) => {
            return response.content as User[];
        });
    }

    // TODO: remove this and make all strings ISO
    private static readonly translateDate = (dateStr: string) => {
        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(5, 7);
        const day = dateStr.substring(8, 10);
        return `${day}/${month}/${year}`;
    }

    private static async exchange<T>(sessionToken: string, serviceUrl: string, httpMethod: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {
        // const mmpHostUrl = clientConfig.get("mmp-host") as string;

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