declare function pad(value: string): string;
declare function formatDate(date: Date, format: string): string;
declare const _default: {
    pad: typeof pad;
    formatDate: typeof formatDate;
};
export default _default;
