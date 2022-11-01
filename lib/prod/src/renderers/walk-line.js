// eslint-disable-next-line max-params, complexity
export function walkLine(ctx, items, lineType, visibleRange, barWidth, 
// the values returned by styleGetter are compared using the operator !==,
// so if styleGetter returns objects, then styleGetter should return the same object for equal styles
styleGetter, finishStyledArea) {
    if (items.length === 0 || visibleRange.from >= items.length) {
        return;
    }
    const firstItem = items[visibleRange.from];
    let currentStyle = styleGetter(ctx, firstItem);
    let currentStyleFirstItem = firstItem;
    if (visibleRange.to - visibleRange.from < 2) {
        const halfBarWidth = barWidth / 2;
        ctx.beginPath();
        const item1 = { _internal_x: firstItem._internal_x - halfBarWidth, _internal_y: firstItem._internal_y };
        const item2 = { _internal_x: firstItem._internal_x + halfBarWidth, _internal_y: firstItem._internal_y };
        ctx.moveTo(item1._internal_x, item1._internal_y);
        ctx.lineTo(item2._internal_x, item2._internal_y);
        finishStyledArea(ctx, currentStyle, item1, item2);
        return;
    }
    const changeStyle = (newStyle, currentItem) => {
        finishStyledArea(ctx, currentStyle, currentStyleFirstItem, currentItem);
        ctx.beginPath();
        currentStyle = newStyle;
        currentStyleFirstItem = currentItem;
    };
    let currentItem = currentStyleFirstItem;
    ctx.beginPath();
    ctx.moveTo(firstItem._internal_x, firstItem._internal_y);
    for (let i = visibleRange.from + 1; i < visibleRange.to; ++i) {
        currentItem = items[i];
        const itemStyle = styleGetter(ctx, currentItem);
        switch (lineType) {
            case 0 /* LineType.Simple */:
                ctx.lineTo(currentItem._internal_x, currentItem._internal_y);
                break;
            case 1 /* LineType.WithSteps */:
                ctx.lineTo(currentItem._internal_x, items[i - 1]._internal_y);
                if (itemStyle !== currentStyle) {
                    changeStyle(itemStyle, currentItem);
                    ctx.lineTo(currentItem._internal_x, items[i - 1]._internal_y);
                }
                ctx.lineTo(currentItem._internal_x, currentItem._internal_y);
                break;
            case 2 /* LineType.Curved */: {
                const [cp1, cp2] = getControlPoints(items, i - 1, i);
                ctx.bezierCurveTo(cp1._internal_x, cp1._internal_y, cp2._internal_x, cp2._internal_y, currentItem._internal_x, currentItem._internal_y);
                break;
            }
        }
        if (lineType !== 1 /* LineType.WithSteps */ && itemStyle !== currentStyle) {
            changeStyle(itemStyle, currentItem);
            ctx.moveTo(currentItem._internal_x, currentItem._internal_y);
        }
    }
    if (currentStyleFirstItem !== currentItem || currentStyleFirstItem === currentItem && lineType === 1 /* LineType.WithSteps */) {
        finishStyledArea(ctx, currentStyle, currentStyleFirstItem, currentItem);
    }
}
const curveTension = 6;
function subtract(p1, p2) {
    return { _internal_x: p1._internal_x - p2._internal_x, _internal_y: p1._internal_y - p2._internal_y };
}
function add(p1, p2) {
    return { _internal_x: p1._internal_x + p2._internal_x, _internal_y: p1._internal_y + p2._internal_y };
}
function divide(p1, n) {
    return { _internal_x: p1._internal_x / n, _internal_y: p1._internal_y / n };
}
/**
 * @returns Two control points that can be used as arguments to {@link CanvasRenderingContext2D.bezierCurveTo} to draw a curved line between `points[fromPointIndex]` and `points[toPointIndex]`.
 */
export function getControlPoints(points, fromPointIndex, toPointIndex) {
    const beforeFromPointIndex = Math.max(0, fromPointIndex - 1);
    const afterToPointIndex = Math.min(points.length - 1, toPointIndex + 1);
    const cp1 = add(points[fromPointIndex], divide(subtract(points[toPointIndex], points[beforeFromPointIndex]), curveTension));
    const cp2 = subtract(points[toPointIndex], divide(subtract(points[afterToPointIndex], points[fromPointIndex]), curveTension));
    return [cp1, cp2];
}
