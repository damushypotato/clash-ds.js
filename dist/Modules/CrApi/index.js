"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
var CrApi;
(function (CrApi) {
    const baseURL = 'https://proxy.royaleapi.dev/v1/';
    CrApi.get = async (key, endpoint) => {
        let res;
        try {
            res = await (0, axios_1.default)({
                method: 'GET',
                baseURL,
                headers: {
                    Authorization: `Bearer ${key}`,
                },
                url: endpoint,
            });
        }
        catch {
            return;
        }
        return res;
    };
})(CrApi || (CrApi = {}));
exports.default = CrApi;
