import Product, { ProductPrice, ProductVariant } from "@/types/models/product";
import { formatCurrencyVN } from "@/utils/currency";
import { difference, differenceBy, filter, find, get, isNil, map, max, min, reject, uniq, uniqBy } from "lodash";
import { useMemo } from "react";

/**
 * build a common utils for support compute product information
 */

export default class ProductRepository {
  getPopularProductPrice() {
    const productPrice = get(this.product, 'product_prices.0', null);
    if (productPrice) {
      const minQuantity: any = min(productPrice.product_price_ranges.map(i => i.min_quantity));
      const priceRanges = find(productPrice.product_price_ranges,(item: any) => +item?.min_quantity <= +minQuantity && +minQuantity <= item?.max_quantity)
      return {
        amount: priceRanges?.price,
        labels: this.getVariantsByProductPrice(productPrice.id).map( i => i.name),
        quantity: minQuantity
      }
    }
    return null;
  }

  constructor(private product: Product) {}
  static getProductWrap(product: Product): ProductRepository {
    return new ProductRepository(product);
  }

  // common
  getProductRangePrice(): number | number[] {
    const prices = map(get(this.product, 'product_prices', []), i => i.price);
    if (prices.length > 1) {
      return [min(prices) ?? 0, max(prices) ?? 0];
    }
    return prices?.[0] ?? 0;
  }

  getProductRangePriceText() {
    const ranges = this.getProductRangePrice();
    return Array.isArray(ranges) ? `${formatCurrencyVN(ranges[0])} - ${formatCurrencyVN(ranges[1])}` : formatCurrencyVN(ranges);
  }

  getProductThumbnail() {
    return get(this.product, "image_urls.0");
  }

  getVariantTextOfProductPrice(groupName: string, productPriceId: number) {
    const productPrice = this.getProductPriceById(productPriceId);
    const variantItem = productPrice.variants?.find(i => i?.group === groupName);
    return variantItem?.name;
  }


  getVariantsByProductPrice(productPriceId: number): ProductVariant[] {
    const productPrice = this.getProductPriceById(productPriceId);
    return productPrice?.variants ?? [];
  }



  // utils
  getProductPriceById(product_price_id: number) {
    const productPrice = this.product.product_prices?.find(i => i.id === product_price_id);
    return {
      ...(productPrice ?? {}),
      variants: reject((productPrice?.product_variant_ids ?? []).map(i => this.getVariant(i)), isNil) as ProductVariant[]
    }
  }

  getVariantGroupLabels(): string[] {
    const variants = this.product?.product_variants ?? [];
    return uniq(variants.map(i => i.group)) ?? [];
  }

  getVariant(variantId: number) {
    return find(this.product.product_variants, (i) => i.id === variantId);
  }


  getVariantsByGroup(groupName: string) {
    return filter(this.product?.product_variants ?? [], (i) => i.group == groupName );
  }


  // get product prices by filter variant id
  getProductPricesByVariants(variants: Array<ProductVariant>) : Array<ProductPrice> {
    if (variants.length === 0) return this.product?.product_prices ?? [];
    const variantIds = map(variants, i => i.id);
    return filter(this.product?.product_prices ?? [], (i) => {
      let ok = true;
      for (const vid of variantIds) {
        ok = ok && i.product_variant_ids.some((pvid) => pvid == vid );
      }
      return ok;
    })
  }

  getProductPriceByVariants(variants: Array<ProductVariant>) : ProductPrice | null {
    const productPrices: Array<ProductPrice> =  this.getProductPricesByVariants(variants);
    if (productPrices.length === 1 && variants.length === productPrices[0].product_variant_ids.length) {
      return productPrices[0];
    }
    return null;
  }

  getVariantsByProductPrices(groupName: string, productPriceIds: number[]): ProductVariant[] {
    const productPrices = reject(map(productPriceIds, (productPriceId) => this.getProductPriceById(productPriceId)), isNil);
    return uniqBy(reject(map(productPrices, (i) => i.variants.find( (i2: any) => i2.group === groupName)), isNil) as ProductVariant[], i => i.id);
  }

  getAmountByQuantity(productPriceId: number, quantity: number): number | null {
    const productPrice = this.getProductPriceById(productPriceId);
    let amount: number | null = null;
    if (productPrice.product_price_ranges) {
      productPrice.product_price_ranges.map(i => {
          let ok = true;
          if (i.min_quantity && i.min_quantity > quantity) {
            ok  = false;
          }

           if (i.max_quantity && i.max_quantity < quantity) {
            ok  = false;
          }

          if (ok) {
            amount = i.price;
          }
      })
    }
    return amount;
  }

}
