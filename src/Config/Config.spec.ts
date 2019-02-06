import { Injector } from 'sloth-ts-injection';
import { Config } from './Config';

/** Mocks */
jest.mock('fs', () => ({
    readFileSync: () =>  {
        return new Buffer('{"root": "a"}');
    }
}));
/** Mocks End */

import * as fs from 'fs';

describe("Generator", () => {

    let injector: Injector;
    let config: Config;

    beforeEach(() => {
        injector = new Injector();
        config = injector.inject(Config);
    });

    describe("getConfig", () => {

        it("Should read user Config", () => {
            jest.spyOn(fs, 'readFileSync').mockReturnValue(
                '{"root": "app/src/"}'
            );
            expect(config['getConfig']()).toEqual({
                root: "app/src/"
            });
        });

        it("Should return default config on missing user config", () => {
            jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
                throw Error("UT");
            });
            expect(config['getConfig']()).toEqual({
                root: "src/"
            });
        });

    });

    describe("getSrcRoot", () => {

        it("Should retreive root from user config", () => {
            jest.spyOn(fs, 'readFileSync').mockReturnValue(
                '{"root": "app/src/"}'
            );
            expect(config.getSrcRoot()).toEqual('app/src/');
        });

        it("Should overdide user config if invalid", () => {
            jest.spyOn(fs, 'readFileSync').mockReturnValue(
                '{"_": "app/src/"}'
            );
            expect(config.getSrcRoot()).toEqual('src/');
        });
    });

});
