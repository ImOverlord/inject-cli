import * as fs from 'fs';
import { slothInject } from 'sloth-ts-injection';
import { IConfig } from './IConfig';

@slothInject()
export class Config {

    constructor() { }

    /**
     * getSrcRoot
     * @description Reads config file for src root
     */
    public getSrcRoot() {
        const config = this.getConfig();
        if (config.root)
            return config.root;
        return 'src/';
    }

    /**
     * getConfig
     * @description Returns injector config
     */
    private getConfig() {
        let config: IConfig;
        try {
            const cwd = process.cwd();
            const raw = fs.readFileSync(`${cwd}/.injector/config.json`).toString('utf-8');
            config = JSON.parse(raw);
        } catch (e) {
            config = {
                root: "src/"
            };
        }
        return config;
    }
}
