import { Injector } from 'sloth-ts-injection';
import { Command } from '../Command/Command';
import { ConfigMock } from '../Config/Config.mock';
import { Generator } from './Generator';

/** Mocks */
jest.mock('fs', () => ({
    readFileSync: () =>  {
        return new Buffer('{"root": "a"}');
    },
    writeFileSync: () => {
        return;
    },
    mkdirSync: () => {
        return;
    }
}));
/** Mocks End */

import * as fs from 'fs';

describe("Generator", () => {

    let injector: Injector;
    let generator: Generator;
    let command: Command;

    beforeEach(() => {
        injector = new Injector();
        injector.register('Config', ConfigMock);
        generator = injector.inject(Generator);
        command = injector.inject(Command);
    });

    describe("getTemplate", () => {

        it('Should return file template', () => {
            spyOn(fs, 'readFileSync').and.returnValues(`test`);
            expect(generator['getTemplate']('temp')).toBe('test');
        });

    });

    describe("generate", () => {

        it("Should generate and fill template", (done) => {
            spyOn(command, 'getCommands').and.returnValue({
                class: 'name'
            });
            spyOn(command, 'getTemplateList').and.returnValues([
                'temp',
                'class'
            ]);
            spyOn(fs, 'mkdirSync').and.callFake((dirName) => {
                expect(dirName).toContain("name");
            });
            spyOn(fs, 'readFileSync').and.returnValues([
`import { slothInject } from 'sloth-ts-injection';

@slothInject()
export class __NAME__ {

    constructor() { }
}
`
            ]);
            spyOn(fs, 'writeFileSync').and.callFake((file, data) => {
                expect(file).toContain("/name/name.ts");
                expect(data).toBe(
`import { slothInject } from 'sloth-ts-injection';

@slothInject()
export class name {

    constructor() { }
}
`
                );
                done();
            });
            generator.generate();
        });
    });
});
