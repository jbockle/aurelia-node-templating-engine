# aurelia-node-templating-engine

[![npm](https://img.shields.io/npm/v/aurelia-node-templating-engine.svg)](https://www.npmjs.com/package/aurelia-node-templating-engine)

Compile [Aurelia](https://aurelia.io) templates from node!

## Why?

I needed to build a templating engine for an emailer service, and why not continue using Aurelia for it??

## Installation

`npm install aurelia-node-templating-engine`

## Use

```typescript
import 'aurelia-polyfills';
import { AureliaNodeTemplatingEngine } from '../src/aurelia-node-templating-engine';

const view = `
    <span>\${message}</span>
    <ul>
        <li repeat.for="item of items">\${item}</li>
    </ul>
`;

const contexts = [
    {
        message: 'hello world!',
        items: [
            'jim',
            'bob',
        ],
    }, {
        message: 'hello again world!',
        items: [
            'sue',
            'jim',
        ],
    }, {
        message: 'goodbye world!',
        items: [
            'bob',
            'jim',
        ],
    },
];

(async () => {

    const engine = new AureliaNodeTemplatingEngine(view);

    const timer = 'compile view/view-model';
    for (const context of contexts) {
        console.time(timer);

        const result = await engine.compile(context);

        console.log(result);

        console.timeEnd(timer);
    }
})();

```