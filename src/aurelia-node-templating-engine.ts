import { IAurelia } from './interfaces';
import { IMinifyOptions, minify, getOptions } from './minification';
import { Bootstrapper } from './bootstrapper';
import { CleanHtml } from './clean-html';

type View = string | Element;

export class AureliaNodeTemplatingEngine {
    private _aurelia!: IAurelia;

    private _host!: Element;

    private _context: any;

    private _view: View;

    private _options: IMinifyOptions;

    public get options(): IMinifyOptions {
        return this._options;
    }

    public constructor(view: View, options?: IMinifyOptions) {
        this._view = view;
        this._options = getOptions(options);
    }

    public async compile(context: any): Promise<string> {
        await this
            .setContext(context)
            .bootstrapAndRender();

        const result = minify(CleanHtml.execute(this._host).innerHTML, this._options);

        this.dispose();

        return result;
    }

    private setContext(context: any): AureliaNodeTemplatingEngine {
        this._context = context;

        return this;
    }

    private async bootstrapAndRender(): Promise<AureliaNodeTemplatingEngine> {
        this._aurelia = await Bootstrapper.start();

        this.appendView();

        await this.render();

        return this;
    }

    private async render(): Promise<void> {
        await this._aurelia.enhance(this._context, this._host);
    }

    private appendView(): void {
        if (this._view instanceof Element) {
            this._host = this._view;
        } else {
            this._host = document.createElement('div');
            this._host.innerHTML = this._view;
        }
        document.body.appendChild(this._host);
    }

    private dispose(): void {
        Bootstrapper.dispose();
        if (this._host.parentNode) {
            this._host.parentNode.removeChild(this._host);
        }
    }
}
