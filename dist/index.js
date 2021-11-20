"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const devPath = (0, path_1.join)(__dirname, '..', 'dev');
const dev = (0, fs_1.existsSync)(devPath);
const inquirer_1 = require("inquirer");
const Sniper_1 = require("./Modules/Sniper");
(async function init() {
    const keyPath = dev ? (0, path_1.join)(devPath, 'key.txt') : 'key.txt';
    let key;
    if ((0, fs_1.existsSync)(keyPath)) {
        key = (0, fs_1.readFileSync)(keyPath).toString();
    }
    else {
        const { key_ } = await (0, inquirer_1.prompt)([
            {
                type: 'input',
                name: 'key_',
                message: 'API Key not found. Please enter it here:',
            },
        ]);
        key = key_;
        (0, fs_1.writeFileSync)(keyPath, key_);
    }
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
    const snipe = await Sniper_1.default.Snipe(key, name, clan);
    if (snipe) {
        console.log(`Sniped in ${snipe.time}ms`);
        console.log(`Player: ${snipe.player.name} | Clan: ${snipe.player.clan?.name || '🚫 No clan'} | Trophies: ${snipe.player.trophies},`);
        console.log(snipe.player.currentDeck.map((c) => c.name).join(', '));
    }
    else {
        console.log("Snipe failed. Maybe the clan/player wasn't found, or there was an API error. Make sure the name and clan name are more than 3 characters long, and also that the API Key in key.txt is correct.");
    }
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
