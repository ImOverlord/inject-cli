#!/usr/bin/env node

import { Injector } from 'sloth-ts-injection';
import { Command } from './Command/Command';
import { Creator } from './Creator/Creator';
import { Generator } from './Generator/Generator';

const inject = new Injector();

const commander: Command = inject.inject(Command);
const generator: Generator = inject.inject(Generator);
const creator: Creator = inject.inject(Creator);

commander.handler();
if (commander.getCommands().init)
    creator.handler();
else
    generator.generate();
