# Inject-cli

[![Build Status](https://travis-ci.org/ImOverlord/inject-cli.svg?branch=master)](https://travis-ci.org/ImOverlord/inject-cli)
[![Coverage Status](https://coveralls.io/repos/github/ImOverlord/inject-cli/badge.svg?branch=master)](https://coveralls.io/github/ImOverlord/inject-cli?branch=master)

Simple cli for creating projects that used Dependency injection. The cli uses [sloth-ts-injection](https://github.com/ImOverlord/sloth-ts-injection) as DI library.

# Installing

```
$ npm i -g inject-cli
```

# Getting Started

You can use the cli to create a new project. During the creation on the new project, it will create the package.json, install the DI lib.
```
$ inject init ProjectName
```

You can then start coding in the src/app.ts.

# Create a new Class

Once the project created you can create your first class.
```
$ inject class ClassName
```

The Class will be created in the src/ folder. You can then call it from the src/app.ts

```ts
import { Injector } from 'sloth-ts-injection';

import { ClassName } from './src/ClassName/ClassName';

const inject = new Injector();
const commander: ClassName = inject.inject(ClassName);
```

You can now call its member functions.

# Custom Templates

You can use the cli to create a custom class template. For this, you need to create a folder .injector at the root of your project. Here is the template used by default.

```ts
import { slothInject } from 'sloth-ts-injection';

@slothInject()
export class __NAME__ {

    constructor() { }
}
```

`__NAME__` is reserved as it is replaced by the Class Name.