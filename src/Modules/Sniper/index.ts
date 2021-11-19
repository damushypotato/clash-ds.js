import { closest, distance } from 'fastest-levenshtein';
import CrApi from '../CrApi';
import { PlayerData } from '../../Typings/ClashRoyale/Player';

namespace Sniper {
    const api_key = process.env['CR_API_KEY'];

    interface SnipeData {
        player: PlayerData;
        time: Number;
    }
    export const Snipe = async (name: string, clan: string): Promise<SnipeData | void> => {
        const start = Date.now();

        const clans: any[] = (await CrApi.get(api_key, `clans?name=${encodeURIComponent(clan)}&limit=20`)).data.items;
        if (clans.length == 0) return;
        const cRes = closest(
            clan,
            clans.map((c) => c.name)
        );
        const cMatches = clans.filter((c) => c.name == cRes);

        const clanReqs = cMatches.map((c) => CrApi.get(api_key, `clans/${encodeURIComponent(c.tag)}`));

        const membersReq = await Promise.all(clanReqs);

        let allMembers = [];
        membersReq.forEach((c) => allMembers.push(...c.data.memberList));

        const nRes = closest(
            name,
            allMembers.map((m) => m.name)
        );

        const nMatch = allMembers.find((m) => m.name == nRes);

        if (!nMatch) return;

        const time = Date.now() - start;

        const player: PlayerData = (await CrApi.get(api_key, `players/${encodeURIComponent(nMatch.tag)}`)).data;

        return {
            player,
            time,
        } as SnipeData;
    };
}

export default Sniper;
