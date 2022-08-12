import last from './array/last';
declare const _default: {
    env: {
        isAndroid: boolean;
        isiOS: boolean;
        isWechat: boolean;
        isMusee: boolean;
        isMini: (resolve: Function) => void;
    };
    date: {
        pad: (value: string) => string;
        formatDate: (date: Date, format: string) => string;
    };
    utils: {
        loadStyle: (url: string) => void;
    };
    validate: {
        isMobile: (s: string) => boolean;
        isEmail: (s: string) => boolean;
        isIDCard: (s: string) => boolean;
    };
    last: typeof last;
    url: {
        getQueryParam: (key: string, url: string) => string | {
            [key: string]: string;
        };
    };
};
export default _default;
