import { Injector } from 'sloth-ts-injection';
import { Command } from './Command';
import * as fs from 'fs';

describe("Command", () => {

    let injector: Injector;
    let command: Command;

    beforeEach(() => {
        injector = new Injector();
        command = injector.inject(Command);
    });

    it("Should detect new class", () => {
        spyOn(fs, 'readdirSync').and.returnValues(['class.ts'], []);
        process.argv = [
            "bin",
            "a",
            "class",
            "name"
        ];
        command.handler();
        expect(command.getCommands().class).toBe('name');
    });

    describe("findTemplates", () => {

        it("ok", () => {
            spyOn(fs, 'readdirSync').and.returnValues(['test.ts'], ['test1.ts']);
            const template = command['findTemplates']();
            expect(template).toEqual(['test', 'test1']);
            expect(command.getTemplateList()).toEqual(['test', 'test1']);
        });

        it("Should remove non ts script files", () => {
            spyOn(fs, 'readdirSync').and.returnValues(['test.ts'], ['config.json']);
            const template = command['findTemplates']();
            expect(template).toEqual(['test']);
            expect(command.getTemplateList()).toEqual(['test']);
        });

        it("Should handle no user custom template", () => {
            spyOn(fs, 'readdirSync').and.callFake(() => {
                throw Error("UT");
            });
            const template = command['findTemplates']();
            expect(template).toEqual([]);
        });

    });

    describe("Custom Template", () => {

        it("Should add custom template", () => {
            spyOn(process, 'exit').and.callFake(() => {
                return 1;
            });
            spyOn(fs, 'readdirSync').and.returnValues(['test.ts'], []);
            process.argv = [
                'bin',
                'app',
                'test',
                'name'
            ];
            command.handler();
            expect(command.getCommands()['test']).toBe('name');
        });

    });

    afterEach(() => {
        process.argv = [];
        command = null;
    });

});
