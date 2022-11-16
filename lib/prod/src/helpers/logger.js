export function warn(msg) {
    if (process.env.LIGHTWEIGHT_CHARTS_NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.warn(msg);
    }
}
