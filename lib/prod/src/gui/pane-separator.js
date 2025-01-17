import { clamp } from '../helpers/mathex';
import { createPreconfiguredCanvas, getContext2D, Size } from './canvas-utils';
import { MouseEventHandler } from './mouse-event-handler';
export const SEPARATOR_HEIGHT = 1;
export class PaneSeparator {
    constructor(chartWidget, topPaneIndex, bottomPaneIndex, disableResize) {
        this._private__startY = 0;
        this._private__deltaY = 0;
        this._private__totalHeight = 0;
        this._private__totalStretch = 0;
        this._private__minPaneHeight = 0;
        this._private__maxPaneHeight = 0;
        this._private__pixelStretchFactor = 0;
        this._private__chartWidget = chartWidget;
        this._private__paneA = chartWidget._internal_paneWidgets()[topPaneIndex];
        this._private__paneB = chartWidget._internal_paneWidgets()[bottomPaneIndex];
        this._private__rowElement = document.createElement('tr');
        this._private__rowElement.style.height = SEPARATOR_HEIGHT + 'px';
        this._private__cell = document.createElement('td');
        this._private__cell.style.padding = '0';
        this._private__cell.setAttribute('colspan', '3');
        this._private__updateBorderColor();
        this._private__rowElement.appendChild(this._private__cell);
        if (disableResize) {
            this._private__handle = null;
            this._private__mouseEventHandler = null;
        }
        else {
            this._private__handle = document.createElement('div');
            this._private__handle.style.position = 'absolute';
            this._private__handle.style.zIndex = '50';
            this._private__handle.style.height = '5px';
            this._private__handle.style.width = '100%';
            this._private__handle.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
            this._private__handle.style.cursor = 'ns-resize';
            this._private__cell.appendChild(this._private__handle);
            const handlers = {
                _internal_mouseDownEvent: this._private__mouseDownEvent.bind(this),
                _internal_touchStartEvent: this._private__mouseDownEvent.bind(this),
                _internal_pressedMouseMoveEvent: this._private__pressedMouseMoveEvent.bind(this),
                _internal_touchMoveEvent: this._private__pressedMouseMoveEvent.bind(this),
                _internal_mouseUpEvent: this._private__mouseUpEvent.bind(this),
                _internal_touchEndEvent: this._private__mouseUpEvent.bind(this),
            };
            this._private__mouseEventHandler = new MouseEventHandler(this._private__handle, handlers, {
                _internal_treatVertTouchDragAsPageScroll: () => false,
                _internal_treatHorzTouchDragAsPageScroll: () => true,
            });
        }
    }
    _internal_destroy() {
        if (this._private__mouseEventHandler !== null) {
            this._private__mouseEventHandler._internal_destroy();
        }
    }
    _internal_getElement() {
        return this._private__rowElement;
    }
    _internal_getSize() {
        return new Size(this._private__paneA._internal_getSize()._internal_w, SEPARATOR_HEIGHT);
    }
    _internal_getImage() {
        const size = this._internal_getSize();
        const res = createPreconfiguredCanvas(document, size);
        const ctx = getContext2D(res);
        ctx.fillStyle = this._private__chartWidget._internal_options().timeScale.borderColor;
        ctx.fillRect(0, 0, size._internal_w, size._internal_h);
        return res;
    }
    _internal_update() {
        this._private__updateBorderColor();
    }
    _private__updateBorderColor() {
        this._private__cell.style.background = this._private__chartWidget._internal_options().timeScale.borderColor;
    }
    _private__mouseDownEvent(event) {
        this._private__startY = event._internal_pageY;
        this._private__deltaY = 0;
        this._private__totalHeight = this._private__paneA._internal_getSize()._internal_h + this._private__paneB._internal_getSize()._internal_h;
        this._private__totalStretch = this._private__paneA._internal_stretchFactor() + this._private__paneB._internal_stretchFactor();
        this._private__minPaneHeight = 30;
        this._private__maxPaneHeight = this._private__totalHeight - this._private__minPaneHeight;
        this._private__pixelStretchFactor = this._private__totalStretch / this._private__totalHeight;
    }
    _private__pressedMouseMoveEvent(event) {
        this._private__deltaY = (event._internal_pageY - this._private__startY);
        const upperHeight = this._private__paneA._internal_getSize()._internal_h;
        const newUpperPaneHeight = clamp(upperHeight + this._private__deltaY, this._private__minPaneHeight, this._private__maxPaneHeight);
        const newUpperPaneStretch = newUpperPaneHeight * this._private__pixelStretchFactor;
        const newLowerPaneStretch = this._private__totalStretch - newUpperPaneStretch;
        this._private__paneA._internal_setStretchFactor(newUpperPaneStretch);
        this._private__paneB._internal_setStretchFactor(newLowerPaneStretch);
        this._private__chartWidget._internal_model()._internal_fullUpdate();
        if (this._private__paneA._internal_getSize()._internal_h !== upperHeight) {
            this._private__startY = event._internal_pageY;
        }
    }
    _private__mouseUpEvent(event) {
        this._private__startY = 0;
        this._private__deltaY = 0;
        this._private__totalHeight = 0;
        this._private__totalStretch = 0;
        this._private__minPaneHeight = 0;
        this._private__maxPaneHeight = 0;
        this._private__pixelStretchFactor = 0;
    }
}
