import { filter, forEach, groupBy } from "lodash";

export const getOrders = (orderItems: any): any => {
  const orders: any = [];
  const addOnOrders: any = getAddonOrders(orderItems);
  forEach(orderItems, function (orderItem) {
    if (orderItem.add_on_of_id == null) {
      const order = getOrderAttribute(orderItem);
      const addOn = filter(addOnOrders, { add_on_of_id: order.id });
      if (addOn) {
        order.addOn = addOn;
      }

      orders.push(order);
    }
  });

  return orders;
};

export const getAddonOrders = (orderItems: any): any => {
  const addOnOrders: any = [];
  forEach(orderItems, function (orderItem) {
    if (orderItem.add_on_of_id) {
      addOnOrders.push(getOrderAttribute(orderItem));
    }
  });

  return addOnOrders;
};

export const getOrderAttribute = (oi: any): any => {
  return {
    id: oi?.id,
    add_on_of_id: oi?.add_on_of_id,
    selected: !!oi?.selected,
    dataProductPrices: oi?.product?.product_prices,
    productThumbnail: oi?.product?.image_urls[0],
    productName: oi?.product?.name,
    attribute_src: groupBy(oi?.product?.product_variants, "group"),
    selected_attributes: JSON.parse(
      `{${oi?.product_price?.product_variant_ids
        ?.map(
          (id: any) =>
            `"${oi?.product?.product_variants?.find((i2: any) => i2.id === id)?.group}": ${oi?.product?.product_variants?.find((i2: any) => i2.id === id)?.id}`,
        )
        .join(", ")}}`,
    ),
    attributes: oi?.product_price?.product_variant_ids?.map((id: any) => oi?.product?.product_variants?.find((i2: any) => i2.id === id)?.name).join(", "),
    quantity: oi?.quantity,
    productPrice: oi?.product_price,
    price: 0,
    discountPrice: 0,
  };
};
