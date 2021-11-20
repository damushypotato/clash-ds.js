import axios, { AxiosResponse } from 'axios';

namespace CrApi {
    const baseURL = 'https://proxy.royaleapi.dev/v1/';

    export const Get = async (key: string, endpoint: string): Promise<AxiosResponse | void> => {
        let res: AxiosResponse;
        try {
            res = await axios({
                method: 'GET',
                baseURL,
                headers: {
                    Authorization: `Bearer ${key}`,
                },
                url: endpoint,
            });
        } catch {
            return;
        }

        return res;
    };
}

export default CrApi;
