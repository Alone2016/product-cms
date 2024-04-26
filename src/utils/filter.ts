import { findIndex, includes, split, toLower, trim } from "lodash";

import { removeAccents } from "./text";

export const includesFilter = ({ data, value, isCompareLength = false, isValueMulti, valueSymbol }: any) => {
  let isMatchingGlobal = false;

  const newData = toLower(removeAccents(data));
  let newValue = toLower(removeAccents(value));

  //case data: Coc, value: coc/phan
  const trimNewData = trim(newData);
  const trimNewValue = trim(newValue);
  if (isValueMulti) {
    const splitNewValue = split(newValue, valueSymbol);

    const findIndexDataInSplitNewValue = findIndex(splitNewValue, (item) => {
      let isMatching = includes(trimNewData, item);
      if (isCompareLength) isMatching && isCompareLength && trimNewData === trimNewValue;
      return isMatching;
    });
    isMatchingGlobal = findIndexDataInSplitNewValue !== -1;
  } else isMatchingGlobal = isCompareLength ? trimNewData === trimNewValue : includes(trimNewData, newValue);

  return isMatchingGlobal;
};

export const getShopUuid = (shops: any, shopId: string) => {
  return shops.filter((shop : any) => shop.id === parseInt(shopId))[0].uuid ?? [];
}

export const getShopName = (shops: any, shopId: string) => {
  return shops.filter((shop : any) => shop.id === parseInt(shopId))[0].name ?? [];
}

export const filterItemsWithTraditionalVillage = (categories: any) => {
  const filteredItems: any = [];
  
  categories.forEach((item: any) => {
    if (item.children) {
      item.children.forEach((child: any) => {
        if (child.traditional_village) {
          filteredItems.push(...child.children);
        }
      });
    }
  });
  
  return filteredItems;
}
