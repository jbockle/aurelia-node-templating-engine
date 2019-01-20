import { Aurelia, View } from 'aurelia-framework';

export interface IAurelia extends Aurelia {
    root: IViewViewModel;
}

interface IViewViewModel extends View {
    controllers: Array<{ viewModel: any }>;
}
