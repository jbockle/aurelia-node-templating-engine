import 'html-minifier/src/htmlparser';
import { minify as minifier, Options as IMinifyOptions } from 'html-minifier';

export { IMinifyOptions };

const defaultOptions: IMinifyOptions = {
    removeComments: true,
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    collapseBooleanAttributes: true,
    minifyCSS: true,
    minifyJS: true,
    removeStyleLinkTypeAttributes: true,
    ignoreCustomFragments: [/\${.*?}/g],
};

export function getOptions(options?: IMinifyOptions): IMinifyOptions {
    return Object.assign({}, options || defaultOptions);
}

export function minify(compiled: string, options: IMinifyOptions): string {
    return minifier(compiled, options);
}
