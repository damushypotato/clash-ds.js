import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
const devPath = join(__dirname, '..', 'dev');
const dev = existsSync(devPath);
import { prompt } from 'inquirer';
import Sniper from './Modules/Sniper';
import { greenBright, blue, yellow } from 'chalk';
import CardParser from './Modules/CardParser';

(async function init() {
    const keyPath = dev ? join(devPath, 'key.txt') : 'key.txt';
    let key: string;
    if (existsSync(keyPath)) {
        key = readFileSync(keyPath).toString();
    } else {
        const { key_ }: { key_: string } = await prompt([
            {
                type: 'input',
                name: 'key_',
                message: 'API Key not found. Please enter it here:',
            },
        ]);
        key = key_;
        writeFileSync(keyPath, key_);
    }

    const { name, clan }: { name: string; clan: string } = await prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Player name:',
        },
        {
            type: 'input',
            name: 'clan',
            message: 'Clan name:',
        },
    ]);

    const snipe = await Sniper.Snipe(key, name, clan);

    if (snipe) {
        const str = `
Sniped in ${greenBright(`${snipe.time}ms`)}

Player: ${blue(snipe.player.name)} | Clan: ${blue(snipe.player.clan?.name || 'No clan')} | Trophies: ${yellow(snipe.player.trophies)}

Deck:

${CardParser.ParseDeck(snipe.player.currentDeck)}
`;
        console.log(str);
    } else {
        console.log(
            "Snipe failed. Maybe the clan/player wasn't found, or there was an API error. Make sure the clan name is more than 3 characters long, and also that the API Key in key.txt is correct."
        );
    }

    const { again }: { again: boolean } = await prompt([
        {
            type: 'confirm',
            name: 'again',
            message: 'Snipe again?',
        },
    ]);

    if (again) {
        init();
    }
})();
