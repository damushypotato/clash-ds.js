import { Card, MaxLevel, Level } from '../../Typings/ClashRoyale/Player';
import { yellow, magenta, white, whiteBright, blueBright } from 'chalk';
import chunk from '../Utils/Chunk';

namespace CardParser {
    /**
     * 0 - Champion,
     * 1 - Legendary,
     * 2 - Epic,
     * 3 - Rare,
     * 4 - Common
     */
    type Rarity = 0 | 1 | 2 | 3 | 4;
    export const GetCardRarity = (maxLevel: MaxLevel): Rarity => {
        switch (maxLevel) {
            case 14:
                return 4;
            case 12:
                return 3;
            case 9:
                return 2;
            case 6:
                return 1;
            case 4:
                return 0;
        }
    };

    export const GetTrueCardLevel = (card: Card): Level => (14 - card.maxLevel + card.level) as Level;

    export const ParseCard = (card: Card, extraInfo = true): string => {
        const rarity = GetCardRarity(card.maxLevel);
        let str = '[ ';
        switch (rarity) {
            case 0:
                str += `${yellow('<')}${whiteBright(card.name)}${yellow('>')}`;
                break;
            case 1:
                str += blueBright(card.name);
                break;
            case 2:
                str += magenta(card.name);
                break;
            case 3:
                str += yellow(card.name);
                break;
            case 4:
                str += whiteBright(card.name);
                break;
        }
        if (extraInfo) str += ` (${white(`lvl.${GetTrueCardLevel(card)}`)})`;
        str += ' ]';
        return str;
    };

    export const ParseDeck = (deck: Card[]): string =>
        chunk<Card>(deck, 4)
            .map((cc) => cc.map((c) => ParseCard(c)).join(' '))
            .join('\n\n');
}

export default CardParser;
