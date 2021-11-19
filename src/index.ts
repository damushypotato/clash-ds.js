import { existsSync } from 'fs';
import { join } from 'path';
const devPath = join(__dirname, '..', 'dev');
const dev = existsSync(devPath);
if (dev) {
    require('dotenv').config({ path: join(devPath, 'dev.env') });
}
import { prompt } from 'inquirer';
import Sniper from './Modules/Sniper';

(async function init() {
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

    const snipe = await Sniper.Snipe(name, clan);

    if (!snipe) {
        return console.log('Snipe failed.');
    }
    console.log(`Sniped in ${snipe.time}ms`);
    console.log(`Player: ${snipe.player.name} | Clan: ${snipe.player.clan?.name || '🚫 No clan'} | Trophies: ${snipe.player.trophies},`);
    console.log(snipe.player.currentDeck.map((c) => c.name).join(', '));

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
