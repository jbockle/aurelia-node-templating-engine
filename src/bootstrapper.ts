import * as pal from 'aurelia-pal-nodejs';
import { NodeJsLoader } from 'aurelia-loader-nodejs';
import { Aurelia } from 'aurelia-framework';
import { IAurelia } from './interfaces';

export class Bootstrapper {
    public static get aurelia(): IAurelia {
        if (this.instance) {
            return this.instance.aurelia;
        }
        throw new Error('Aurelia instance is undefined');
    }
    public static async start(): Promise<IAurelia> {
        if (!this.instance) {
            this.instance = new Bootstrapper();

            this.instance
                .globalizePal()
                .createLoader();
        }

        await this.instance.bootstrap();
        return this.instance.aurelia as IAurelia;
    }

    public static dispose(): void {
        this.instance.aurelia.root.detached();
        this.instance.aurelia.root.unbind();
    }

    private static instance: Bootstrapper;

    private loader!: NodeJsLoader;

    private aurelia!: IAurelia;

    private constructor() { }

    private globalizePal(): Bootstrapper {
        pal.globalize();
        return this;
    }

    private createLoader(): Bootstrapper {
        this.loader = new NodeJsLoader();
        return this;
    }

    private createAureliaInstance(): IAurelia {
        const aurelia = new Aurelia(this.loader);
        return aurelia as IAurelia;
    }

    private async bootstrap(): Promise<void> {
        this.aurelia = this.createAureliaInstance();
        this.aurelia.use
            .defaultBindingLanguage()
            .defaultResources();

        await this.aurelia.start();
    }
}
