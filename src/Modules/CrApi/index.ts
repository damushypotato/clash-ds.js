import axios, { AxiosResponse } from 'axios';

namespace CrApi {
    const baseURL = 'https://proxy.royaleapi.dev/v1/';

    export const get = async (key: string, endpoint: string): Promise<AxiosResponse> => {
        const res = await axios({
            method: 'GET',
            baseURL,
            headers: {
                Authorization: `Bearer ${key}`,
            },
            url: endpoint,
        });

        return res;
    };
}

export default CrApi;
