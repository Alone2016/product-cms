import { BUSINESS_TYPE_OPTIONS, EMPLOYEES_OPTIONS, FACTORIES_OPTIONS, OFFICES_OPTIONS, REVENUE_OPTIONS } from "@/constants";
import _, { find, isEmpty } from "lodash";
import map from "lodash/map";
import reduce from "lodash/reduce";
import React from "react";

export const getResultData = ({ data }: any) => data?.data?.data?.items;

export const pickByTrueValue = ({ values }: any) =>
  reduce(
    Object.keys(values),
    (sum: any, cur: any) => {
      if (values[cur]) sum[cur] = true;
      return sum;
    },
    {},
  );

export const truncate = (str: string, max: number) => (str?.length > max ? str.substr(0, max - 1) + "…" : str);

export const sumFields = (array: any, field: string) => {
  return Array.isArray(array)
    ? array?.reduce((sum: number, item: any) => {
        let str = item?.[`${field}`]?.toString();
        // console.log(`${field}`, parseFloat(str?.replace(/,/g, "")));
        const number: number = parseFloat(str?.replace(/,/g, "")) || 0;
        return (sum += number);
      }, 0)
    : 0;
};

export const mergeParentAndChildren = (parentArray: any, childArray: any) => {
  // Create a merged result array
  const mergedResult = [];

  let parentIndex = 0;
  let childIndex = 0;

  // Loop through both arrays and merge them without a common identifier
  while (parentIndex < parentArray.length || childIndex < childArray.length) {
    if (parentIndex < parentArray.length) {
      mergedResult.push(parentArray[parentIndex]);
      parentIndex++;
    }

    if (childIndex < childArray.length) {
      mergedResult.push(childArray[childIndex]);
      childIndex++;
    }
  }

  return mergedResult;
};

export const arrayToObject = (arr: any) => {
  return arr.reduce((acc: any, currentElement: any) => {
    acc[currentElement["id"]] = currentElement;
    return acc;
  }, {});
};

export const getItem = (key: any) => {
  try {
    const itemValue = localStorage.getItem(key);

    if (typeof itemValue === "string") {
      return JSON.parse(itemValue);
    }

    return undefined;
  } catch {
    return undefined;
  }
};

export const checkTextAgreementStatus = (value: string) => {
  let config: any = {};
  switch (value) {
    case "draft":
      config = {
        color: "#1A94FF",
        text: "Đang soạn thảo",
        bgColor: "#DBEEFF",
      };
      break;

    case "agreement_completed":
      config = {
        color: "#00AB56",
        text: "Đã nhận",
        bgColor: "#D7FAE0",
      };
      break;

    case "agreement_confirmed":
      config = {
        color: "#CC8100",
        text: "Đã gửi",
        bgColor: "#FFFCED",
      };
      break;

    case "agreement_cancelled":
      config = {
        color: "#D93843",
        text: "Đã huỷ",
        bgColor: "#FBE6E6",
      };
      break;
    default:
      config = {
        color: "#00AB56",
        text: "Đã hoàn thành",
        bgColor: "#D7FAE0",
      };
  }
  return config;
};

export const calculateAverageRating = (ratingCounts: any) => {
  let totalPoints = 0;
  let totalCount = 0;

  for (const rating in ratingCounts) {
    const count = ratingCounts[rating];
    totalPoints += parseInt(rating) * count;
    totalCount += count;
  }

  if (totalCount === 0) {
    return 0; // Default to 0 if there are no ratings
  }

  const averageRating = (totalPoints / totalCount)?.toFixed(1);
  return averageRating;
};

export const mappingMultiArrayString = (result: Record<string, string[]>) => {
  let ar: string[][] = [];
  const ls = Object.keys(result);

  for (let i = 0; i < ls.length; i++) {
    let j = i + 1;

    const firstArr = ar[i] ?? result[ls[i]],
      secondArr = result[ls[j]];

    switch (true) {
      case isEmpty(secondArr) && isEmpty(ar):
        firstArr.forEach((e) => ar.push([e]));
        break;

      case !isEmpty(secondArr) && isEmpty(ar):
        firstArr.forEach((e1: any) => {
          secondArr.forEach((e2: any) => {
            ar.push([e1, e2]);
          });
        });
        break;

      case !isEmpty(secondArr) && !isEmpty(ar):
        let ar1: string[][] = [];

        ar.forEach((e1: any) => {
          secondArr.forEach((e2) => {
            ar1.push([...e1, e2]);
          });
        });
        ar = ar1;
        ar1 = [];
        break;

      default:
        break;
    }
  }
  return ar;
};

export const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
}


export const capitalizeFirstLetter = (str: any) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export const isArrayEqual = (x: any, y: any) => (
_.size(x) === _.size(y) && _.isEmpty(_.xorWith(x, y, _.isEqual))
);


export const isURL = (str: any) => {
    // Regular expression to match URLs (simple one for demonstration purposes)
    var urlRegex = /^(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(?:\/\S*)?$/;
    return urlRegex.test(str);
}


export const checkDataUndefineOrZero = (data: any) => {
    if (_.isUndefined(data) || +data === 0) {
      return true;
    } else {
      return false;
    }
  };

export const checkDataUndefineOrZeroImage = (data: any, isCheck: any) => {
  if (isCheck) {
    if (_.isUndefined(data) || +data?.length === 0) {
      return true;
    } else {
      return false;
    }
  } else return false;
    
};

export const removeVietnameseAccent = (str: any) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const isEnableB2C = (): boolean => {
  return process.env.NEXT_PUBLIC_ENABLE_B2C === "true";
}

export const formatNumber = (value: any, defaultValue: any = "") => {
  return  !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") : defaultValue
}

function createKeys(length: any) {
    return Array.from({ length }, (_, i) => i);
  }

  function joinLabels(item: any, keys: any) {
    // return productPrices.reduce((result, price) => {
    //   const label = keys.map(key => price[key]).join('-');
    // }, []);
    const label = keys.map((key: any) => item[key])?.join("-");
    return label;
  }

  const build_label = (item: any, numVariant: any) => {
    const keys = createKeys(numVariant);
    if (numVariant > 0) {
      return joinLabels(item, keys);
    }
  };

export const mapItemCategory = (items: any, array: any) => {
    return items?.map((item: any, index: number) => _.filter(array, (obj) => _.includes(items, obj?.id))?.[`${index}`]?.name);
  };


export const mapProductVariant = (dataProductPrice: any, numVariant: any) => map(dataProductPrice, (item, index) => ({ label: build_label(item, numVariant)?.replace("-", " ")?.replaceAll("-", ""), value: `${index}`, id: item?.id }));


export const priceRanges = (data: any, quantity: any) =>
  find(data, (itemVarint: any) => +itemVarint?.min_quantity <= +quantity && +quantity <= itemVarint?.max_quantity);
    

export const checkConditionRenderData = (content: any, title: any) => {
  switch(title) {
    case "Loại hình kinh doanh": 
      return find(BUSINESS_TYPE_OPTIONS, (item: any) => item?.value === content)?.label;
      break;
    case "Mô tả ngắn (dưới 200 từ) về doanh nghiệp": 
      return content
      break;
    case "Tổng số nhân viên": 
    case "Tổng nhân sự":
      return find(EMPLOYEES_OPTIONS, (item: any) => item?.value === content)?.label;
      break;
    case "Quy mô nhà máy": 
      return find(FACTORIES_OPTIONS, (item: any) => item?.value === content)?.label;
      break;
    case "Doanh thu hằng năm": 
      return find(REVENUE_OPTIONS, (item: any) => item?.value === content)?.label;
      break;
    case "Số lượng văn phòng":
      return find(OFFICES_OPTIONS, (item: any) => item?.value === content)?.label;
      break;
    case "Tổng số lượng sản phẩm sản xuất hàng năm":
    case "Nhân sự R&D":
    case "Số lượng dây chuyển sản xuất":
    case "Số lượng thiết bị/ máy móc sử dụng sản xuất":
      return formatNumber(content);
      break;
    default:
      return content;
      break;
  }
}