import { MMP_CANCER_API_URI } from '../utils/constants';
import Drugset from '../models/Drugset';


class MmpCancerClient {

    public static async getDrugsets<Drugset>(searchText: string | undefined, abortSignal: AbortSignal): Promise<Drugset> {
        const queryParams = !!searchText ? { searchText: searchText } : undefined;        
        return this.get<Drugset>(`${MMP_CANCER_API_URI}drugSets`, queryParams, abortSignal);
    }

    public static async getDrugsetById<Drugset>(id: string | undefined, searchText: string | undefined, abortSignal: AbortSignal): Promise<Drugset> {
        const queryParams = !!searchText ? { searchText: searchText } : undefined;        
        return this.get<Drugset>(`${MMP_CANCER_API_URI}drugSets/${id}`, queryParams, abortSignal);
    }

    private static readonly translateDate = (dateStr: string) => {
        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(5, 7);
        const day = dateStr.substring(8, 10);
        return `${day}/${month}/${year}`;
    }

    private static async exchange<T>(serviceUrl: string, httpMethod: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
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
        const queryUrl = `${serviceUrl}${!!queryStr ? "?" : ""}${queryStr}`;
        console.log(params);
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

    private static async get<T>(serviceUrl: string, queryParams: any, abortSignal: AbortSignal): Promise<T> {
        return this.exchange(serviceUrl, "GET", queryParams, undefined, abortSignal);
    }   

    private static async put<T>(serviceUrl: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {
        return this.exchange(serviceUrl, "PUT", queryParams, requestBody, abortSignal);
    }

    private static async post<T>(serviceUrl: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {
        return this.exchange(serviceUrl, "POST", queryParams, requestBody, abortSignal);
    }

    private static async delete<T>(serviceUrl: string, queryParams: any, abortSignal: AbortSignal): Promise<T> {
        return this.exchange(serviceUrl, "DELETE", queryParams, undefined, abortSignal);
    }

}


export default MmpCancerClient;