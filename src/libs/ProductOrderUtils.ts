import _ from "lodash";

export type OrderItem = any & {selected?: boolean, price?: number, quantity?: number};

type ProductVariant = {
    name?: string;
    group?: string;
}

export default {
    fetctProductVariantsByOrderItem(orderItem: OrderItem) : ProductVariant[] {
        const dataVariants = orderItem?.product?.product_variants;
        const variants = orderItem?.product_price?.product_variant_ids?.map((productVariantId: number) => dataVariants.find((dataItem: any) => dataItem?.id === productVariantId));
        return variants
    },
    computeQuoteAmountOrderItems(orderItems: OrderItem[]): number {
        return _.sum(orderItems?.map(this.computeQuoteAmountOrderItem) ?? [])
    },
    computeQuoteAmountOrderItem(orderItem: OrderItem): number {
        return (orderItem?.price ?? 0) * (orderItem?.quantity ?? 0);
    },
    computeQuoteQuantityOrderItem(orderItem: OrderItem): number {
        return (_.sumBy(orderItem, (item: any) => item?.quantity) ?? 1)
    }
    
}