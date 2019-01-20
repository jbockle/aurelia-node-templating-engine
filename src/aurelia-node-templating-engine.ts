import { NodeJsLoader } from 'aurelia-loader-nodejs';
import { Aurelia } from 'aurelia-framework';
import * as pal from 'aurelia-pal-nodejs';
import { IAurelia } from './interfaces';

export class AureliaNodeTemplatingEngine {
    private _aurelia: IAurelia;

    private _view: string | Element;

    private _host: Element;

    private _context: any;

    public constructor(view: string | Element) {
        this._view = view;
    }

    public async compile(context: any) {
        this._context = context;
        await this.bootstrap();
        return await this._compile();
    }

    private async _compile() {
        this.appendView();
        await this._aurelia.enhance(this._context, this._host);
        const _compiledHtml = this._host.innerHTML;
        this.dispose();
        return _compiledHtml;
    }

    private appendView() {
        if (this._view instanceof Element) {
            this._host = this._view;
        } else {
            this._host = document.createElement('div');
            this._host.innerHTML = this._view;
        }
        document.body.appendChild(this._host);
    }

    private async bootstrap(): Promise<void> {
        pal.globalize();
        const loader: NodeJsLoader = new NodeJsLoader();
        const aurelia: Aurelia = new Aurelia(loader);
        aurelia.use
            .defaultBindingLanguage()
            .defaultResources();
        await aurelia.start();
        this._aurelia = aurelia as IAurelia;
    }

    private dispose() {
        this._aurelia.root.detached();
        this._aurelia.root.unbind();
        this._host.parentNode.removeChild(this._host);
    }
}
