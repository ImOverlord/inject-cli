import * as root from 'app-root-path';
import * as commander from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { slothInject } from 'sloth-ts-injection';

/**
 * Command
 * @description Command line Argument Parser
 * @author ImOverlord
 */
@slothInject()
export class Command {

    private commands: typeof commander;
    private template: Array<string>;

    constructor() { }

    /**
     * getCommands
     * @description Returns commands
     */
    public getCommands(): typeof commander {
        return this.commands;
    }

    public getTemplateList(): Array<string> {
        return this.template;
    }

    /**
     * handler
     * @description Parses ARGV and adds templates to stack
     */
    public handler() {
        commander.option("init <project>", "Create new project");
        this.findTemplates().forEach((template) => {
            commander.option(`${template} [${template}]`, `Create New ${template}`);
        });
        commander.parse(process.argv);
        this.commands = commander;
    }

    /**
     * findTemplate
     * @description Finds templates
     */
    private findTemplates(): Array<string> {
        const templates: Array<string> = [];
        try {
            let files = fs.readdirSync(`${root.path}/.injector`);
            files = files.filter((file) => {
                return path.extname(file) === '.ts';
            });
            files = files.map((file) => {
                return file.replace('.ts', '');
            });
            templates.push(...files);
        } catch (e) { }
        try {
            let files = fs.readdirSync(`./.injector`);
            files = files.filter((file) => {
                return path.extname(file) === '.ts';
            });
            files = files.map((file) => {
                return file.replace('.ts', '');
            });
            templates.push(...files);
        } catch (e) { }
        this.template = templates;
        return templates;
    }
}
