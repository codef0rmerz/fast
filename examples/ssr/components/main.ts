/* eslint-disable */
import { css, FASTElement, html, when } from "@microsoft/fast-element";

export class Main extends FASTElement {
    public initializedString: string = "bar";
    public initializedBool: boolean = true;
}

FASTElement.define(Main, {
    name: "fast-main",
    /*html*/
    template: html<Main>`
        <p id="static-element">Static Element Content</p>
        <ul>
            <li>Inline content</li>
            <li>
                Initialized string binding: ${(x: Main): string => x.initializedString}
            </li>
            ${when(
                (x: Main): boolean => x.initializedBool,
                html`
                    <li>When directive: should be emitted</li>
                `
            )}
            ${when(
                (x: Main): boolean => !x.initializedBool,
                html`
                    <li>When directive: should not be emitted</li>
                `
            )}
            <li><fast-leaf></fast-leaf></li>
            <li><fast-closed-shadow-root></fast-closed-shadow-root></li>
            <li><fast-open-shadow-root></fast-open-shadow-root></li>
            <li>
                <fast-slot>
                    Shadow DOM slotted leaf:
                    <fast-leaf></fast-leaf>
                </fast-slot>
            </li>
            <li>
                <fast-bindings
                    attribute="attribute-value"
                    ?boolean=${x => true}
                    :property=${x => "property-value"}
                ></fast-bindings>
            </li>
        </ul>
        <fast-repeater></fast-repeater>
        <fast-repeater :data=${x => [1, 2, 3, 4].map(x => x.toString())}></fast-repeater>
    `,
    styles: css`
        :host {
            display: "block";
        }
    `,
});