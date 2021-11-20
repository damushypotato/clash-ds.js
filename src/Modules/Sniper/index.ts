import { closest } from 'fastest-levenshtein';
import CrApi from '../CrApi';
import { PlayerData } from '../../Typings/ClashRoyale/Player';
import { AxiosResponse } from 'axios';

namespace Sniper {
    interface SnipeData {
        player: PlayerData;
        time: Number;
    }
    export const Snipe = async (api_key: string, name: string, clan: string): Promise<SnipeData | void> => {
        const start = Date.now();

        const clanReq = await CrApi.Get(api_key, `clans?name=${encodeURIComponent(clan)}&limit=20`);
        if (!clanReq) return;
        const clans: any[] = clanReq.data.items;
        if (clans.length == 0) return;
        const cRes = closest(
            clan,
            clans.map((c) => c.name)
        );
        const cMatches = clans.filter((c) => c.name == cRes);

        const members_clanReqs = cMatches.map((c) => CrApi.Get(api_key, `clans/${encodeURIComponent(c.tag)}`));

        const membersReq = await Promise.all(members_clanReqs);

        for (const mr in membersReq) {
            if (!membersReq[mr]) return;
        }

        let allMembers = [];
        membersReq.forEach((c) => allMembers.push(...(c as AxiosResponse).data.memberList));

        const nRes = closest(
            name,
            allMembers.map((m) => m.name)
        );

        const nMatch = allMembers.find((m) => m.name == nRes);

        if (!nMatch) return;

        const time = Date.now() - start;

        const req = await CrApi.Get(api_key, `players/${encodeURIComponent(nMatch.tag)}`);

        if (!req) {
            return;
        }

        const player: PlayerData = req.data;

        return {
            player,
            time,
        } as SnipeData;
    };
}

export default Sniper;
