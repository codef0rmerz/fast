import { html, ref, when } from "@microsoft/fast-element";
import type { ViewTemplate } from "@microsoft/fast-element";
import { AnchoredRegion } from "../anchored-region/anchored-region.js";
import { endSlotTemplate, startSlotTemplate } from "../patterns/start-end.js";
import type { FoundationElementTemplate } from "../foundation-element/foundation-element.js";
import { MenuItemRole } from "./menu-item.js";
import type { MenuItem, MenuItemOptions } from "./menu-item.js";

/**
 * Generates a template for the {@link @microsoft/fast-foundation#(MenuItem:class)} component using
 * the provided prefix.
 *
 * @public
 */
export const menuItemTemplate: FoundationElementTemplate<
    ViewTemplate<MenuItem>,
    MenuItemOptions
> = (context, definition) => html<MenuItem>`
    <template
        role="${x => x.role}"
        aria-haspopup="${x => (x.hasSubmenu ? "menu" : void 0)}"
        aria-checked="${x => (x.role !== MenuItemRole.menuitem ? x.checked : void 0)}"
        aria-disabled="${x => x.disabled}"
        aria-expanded="${x => x.expanded}"
        @keydown="${(x, c) => x.handleMenuItemKeyDown(c.event as KeyboardEvent)}"
        @click="${(x, c) => x.handleMenuItemClick(c.event as MouseEvent)}"
        @mouseover="${(x, c) => x.handleMouseOver(c.event as MouseEvent)}"
        @mouseout="${(x, c) => x.handleMouseOut(c.event as MouseEvent)}"
        class="${x => (x.disabled ? "disabled" : "")} ${x =>
    x.expanded ? "expanded" : ""} ${x => `indent-${x.startColumnCount}`}"
    >
            ${when(
                x => x.role === MenuItemRole.menuitemcheckbox,
                html<MenuItem>`
                    <div part="input-container" class="input-container">
                        <span part="checkbox" class="checkbox">
                            <slot name="checkbox-indicator">
                                ${definition.checkboxIndicator || ""}
                            </slot>
                        </span>
                    </div>
                `
            )}
            ${when(
                x => x.role === MenuItemRole.menuitemradio,
                html<MenuItem>`
                    <div part="input-container" class="input-container">
                        <span part="radio" class="radio">
                            <slot name="radio-indicator">
                                ${definition.radioIndicator || ""}
                            </slot>
                        </span>
                    </div>
                `
            )}
        </div>
        ${startSlotTemplate(context, definition)}
        <span class="content" part="content">
            <slot></slot>
        </span>
        ${endSlotTemplate(context, definition)}
        ${when(
            x => x.hasSubmenu,
            html<MenuItem>`
                <div
                    part="expand-collapse-glyph-container"
                    class="expand-collapse-glyph-container"
                >
                    <span part="expand-collapse" class="expand-collapse">
                        <slot name="expand-collapse-indicator">
                            ${definition.expandCollapseGlyph || ""}
                        </slot>
                    </span>
                </div>
            `
        )}
        ${when(
            x => x.expanded,
            html<MenuItem>`
                <${context.tagFor(AnchoredRegion)}
                    :anchorElement="${x => x}"
                    vertical-positioning-mode="dynamic"
                    vertical-default-position="bottom"
                    vertical-inset="true"
                    horizontal-positioning-mode="dynamic"
                    horizontal-default-position="end"
                    class="submenu-region"
                    dir="${x => x.currentDirection}"
                    @loaded="${x => x.submenuLoaded()}"
                    ${ref("submenuRegion")}
                    part="submenu-region"
                >
                    <slot name="submenu"></slot>
                </${context.tagFor(AnchoredRegion)}>
            `
        )}
    </template>
`;
