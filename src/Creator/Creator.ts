import { execSync } from 'child_process';
import * as fs from 'fs';
import { slothInject } from 'sloth-ts-injection';
import { Command } from '../Command/Command';

@slothInject()
export class Creator {

    constructor(
        private command: Command
    ) { }
    public handler() {
        const commands = this.command.getCommands();
        const name = commands.init;

        this.createProjectDir(name);
    }

    private createProjectDir(name: string) {
        fs.mkdirSync(`./${name}`);
        process.chdir(`./${name}`);
        execSync('git init');
        execSync('npm init -y');
        execSync('npm install sloth-ts-injection --save');
        execSync('npm install typescript --save');
        fs.mkdirSync('./src');
        fs.copyFileSync(`${__dirname}/../../resource/tsconfig.json`, `./tsconfig.json`);
        fs.copyFileSync(`${__dirname}/../../resource/app.ts`, './src/app.ts');
    }
}
