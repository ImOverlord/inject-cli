import * as root from 'app-root-path';
import * as fs from 'fs';
import { slothInject } from 'sloth-ts-injection';
import { Command } from '../Command/Command';
import { Config } from '../Config/Config';

@slothInject()
export class Generator {

    constructor(
        private command: Command,
        private config: Config
    ) { }

    /**
     * getDestination
     * @description Returns template destination
     * @returns {string} destination
     */
    public generate() {
        const commands = this.command.getCommands();
        const templates = this.command.getTemplateList();

        templates.forEach((template) => {
            if (commands[template]) {
                let file = this.getTemplate(template);
                const dest = this.config.getSrcRoot();
                file = file.replace("__NAME__", commands[template]);
                fs.mkdirSync(`./${dest}/${commands[template]}/`);
                fs.writeFileSync(`./${dest}/${commands[template]}/${commands[template]}.ts`, file);
                console.log(`Generated ${template} ${commands[template]}`);
            }
        });
    }

    /**
     * getTemplate
     * @description Returns template
     * @param {string} type Template name
     * @returns {string} template content
     */
    private getTemplate(type: string): string {
        let file: string;
        try {
            file = fs.readFileSync(`./.injector/${type}.ts`).toString('utf-8');
        } catch (e) {
            file = fs.readFileSync(`${root.path}/.injector/${type}.ts`).toString('utf-8');
        }
        return file;
    }
}
