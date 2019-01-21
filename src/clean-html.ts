const AU_TARGET_ID_QUERY = '[au-target-id]';
const AU_TARGET_ID = 'au-target-id';

const AU_TARGET_QUERY = '.au-target';
const AU_TARGET = 'au-target';
// tslint:enable:variable-name
export class CleanHtml {
    public static execute(element: Element): Element {
        element.querySelectorAll(AU_TARGET_ID_QUERY)
            .forEach((el) => el.removeAttribute(AU_TARGET_ID));

        element.querySelectorAll(AU_TARGET_QUERY)
            .forEach((el) => el.classList.remove(AU_TARGET));

        return element;
    }
}
