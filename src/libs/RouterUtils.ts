import { map } from "lodash";
import { NextRouter } from "next/router";

export type PathKeyType = "MyArobid" | "ManageRFQ" | "FRQGeneral" | 'CreateFRQRequest' | 'FRQEditBusinessCard';

type PathOptions = {
    path: string;
}

export const PathMapping: Record<PathKeyType, PathOptions> = {
    'FRQEditBusinessCard': {
        path: '/quote-management/request-general-quote/edit-business-card',
    },
    MyArobid: { path: "/business-profile/create" },
    ManageRFQ: { path: "/account/rfq/quote-management" },
    FRQGeneral: { path: "/account/rfq/general" },
    CreateFRQRequest: { path: '/account/rfq/quote-management/request-general-quote' },
}

export class RouterUtils {
    private static _router: NextRouter;

    static router(router: NextRouter): typeof RouterUtils {
        this._router = router;
        return this;
    }

    static backWithBackUrlParam() {
        const router = this._router;
        let url = router.query['back_url'] as string;
        router.push(decodeURIComponent(url));
    }

    static gotoWithBackUrlParam(pathOptions: PathOptions, customOptions?: Partial<PathOptions>) {
        const router = this._router;
        const options = {...pathOptions, ...(customOptions ?? {})};
        let url = options.path;
        let paramStrList = ``;
        // map(Object.keys(router.query), (key, index) => {
        //     paramStrList += `${key}=${router.query[key]}${index === Object.keys(router.query)?.length - 1 ? '' : '&'}`
        // });
        // url += `?back_url=${router.pathname}${paramStrList ? '?' + encodeURIComponent(paramStrList) : ''}`;
        url += `?back_url=${encodeURIComponent(router.asPath)}`
        router.push(url);
    }

    static goto(pathOptions: PathOptions, customOptions?: Partial<PathOptions>) {
        const router = this._router;
        const options = {...pathOptions, ...(customOptions ?? {})};
        let url = options.path;
        router.push(url);
    }
}