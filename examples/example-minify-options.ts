import 'aurelia-polyfills';
import { AureliaNodeTemplatingEngine } from '../src/aurelia-node-templating-engine';

const view = `
    <h1 if.bind="title" textcontent.bind="title"></h1>
    <ul>
        <li repeat.for="user of users">
            \${message} \${user}!
        </li>
    </ul>
    <img src="dancingcat.gif" />
`;

const context: any = {
    title: 'Howdy!',
    message: 'hello',
    users: [
        'jim',
        'bob',
    ],
};

(async () => {

    let engine = new AureliaNodeTemplatingEngine(view); // default options
    let result = await engine.compile(context);
    console.log({ defaultOptions: result, options: engine.options });

    context.title = 'Welcome!';
    engine = new AureliaNodeTemplatingEngine(view, {}); // no options
    result = await engine.compile(context);
    console.log({ noOptions: result, options: engine.options });

    engine = new AureliaNodeTemplatingEngine(view, {
        collapseWhitespace: true,
        keepClosingSlash: true, // this option does not work, as aurelia-pal-nodejs sets doctype for HTML5
        html5: false,
    });

    result = await engine.compile(context);
    console.log({ customOptions: result, options: engine.options });
})();
