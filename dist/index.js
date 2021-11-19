"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const devPath = (0, path_1.join)(__dirname, '..', 'dev');
const dev = (0, fs_1.existsSync)(devPath);
if (dev) {
    require('dotenv').config({ path: (0, path_1.join)(devPath, 'dev.env') });
}
const inquirer_1 = require("inquirer");
const Sniper_1 = require("./Modules/Sniper");
(async function init() {
    const { name, clan } = await (0, inquirer_1.prompt)([
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
    const snipe = await Sniper_1.default.Snipe(name, clan);
    if (!snipe) {
        return console.log('Snipe failed.');
    }
    console.log(`Sniped in ${snipe.time}ms`);
    console.log(`Player: ${snipe.player.name} | Clan: ${snipe.player.clan?.name || '🚫 No clan'} | Trophies: ${snipe.player.trophies},`);
    console.log(snipe.player.currentDeck.map((c) => c.name).join(', '));
    const { again } = await (0, inquirer_1.prompt)([
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
