import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export default {
    gotoShopContractDetail({router}: {router: NextRouter}) {
        const shopId = router?.query?.shopId;
        const id = router?.query?.contractId ?? router?.query?.id;
        if (!shopId) {
            console.error("can not detach shop id from query")
            return;
        }

          if (!id) {
            console.error("can not detach contract id from query")
            return;
        }

        router?.push(`/shop/${shopId}/contract/${id}`)
    },
     gotoShopContractList({router}: {router: NextRouter}) {
        const shopId = router?.query?.shopId;
        if (!shopId) {
            console.error("can not detach shop id from query")
            return;
        }
        router?.push(`/shop/${shopId}/contract`)
    },
} 