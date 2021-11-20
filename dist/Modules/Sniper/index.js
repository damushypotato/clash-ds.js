"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastest_levenshtein_1 = require("fastest-levenshtein");
const CrApi_1 = require("../CrApi");
var Sniper;
(function (Sniper) {
    Sniper.Snipe = async (api_key, name, clan) => {
        const start = Date.now();
        const clanReq = await CrApi_1.default.get(api_key, `clans?name=${encodeURIComponent(clan)}&limit=20`);
        if (!clanReq)
            return;
        const clans = clanReq.data.items;
        if (clans.length == 0)
            return;
        const cRes = (0, fastest_levenshtein_1.closest)(clan, clans.map((c) => c.name));
        const cMatches = clans.filter((c) => c.name == cRes);
        const members_clanReqs = cMatches.map((c) => CrApi_1.default.get(api_key, `clans/${encodeURIComponent(c.tag)}`));
        const membersReq = await Promise.all(members_clanReqs);
        for (const mr in membersReq) {
            if (!membersReq[mr])
                return;
        }
        let allMembers = [];
        membersReq.forEach((c) => allMembers.push(...c.data.memberList));
        const nRes = (0, fastest_levenshtein_1.closest)(name, allMembers.map((m) => m.name));
        const nMatch = allMembers.find((m) => m.name == nRes);
        if (!nMatch)
            return;
        const time = Date.now() - start;
        const req = await CrApi_1.default.get(api_key, `players/${encodeURIComponent(nMatch.tag)}`);
        if (!req) {
            return;
        }
        const player = req.data;
        return {
            player,
            time,
        };
    };
})(Sniper || (Sniper = {}));
exports.default = Sniper;
