import { NodeJsLoader } from 'aurelia-loader-nodejs';
import { Aurelia } from 'aurelia-framework';
import * as pal from 'aurelia-pal-nodejs';
import { IAurelia } from './interfaces';

export class AureliaNodeTemplatingEngine {
    private _aurelia: IAurelia;

    private _host: HTMLDivElement;

    private _context: any;

    public constructor(private _view: string) { }

    public async compile(context: any) {
        this._context = context;
        await this.bootstrap();
        return await this._compile();
    }

    private async _compile() {
        this.createBodyElement(this._view);
        await this._aurelia.enhance(this._context, this._host);
        const _compiledHtml = this._host.outerHTML;
        this.dispose();
        return _compiledHtml;
    }

    private dispose() {
        this._aurelia.root.detached();
        this._aurelia.root.unbind();
        this._host.parentNode.removeChild(this._host);
    }

    private createBodyElement(innerHTML: string) {
        this._host = document.createElement('div');
        this._host.innerHTML = innerHTML;
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
}
