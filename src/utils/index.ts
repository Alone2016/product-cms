import { includes, reduce } from "lodash";

export const buildFormData = (formData?: any, data?: any, parentKey?: any, listKeyImage = ["images", "attachments", "product_attribute_values"]) => {
  if (data && typeof data === "object" && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
    Object.keys(data).forEach((key) => {
      buildFormData(formData, data[key], parentKey ? (includes(listKeyImage, parentKey) ? `${parentKey}[]` : `${parentKey}[${+key >= 0 ? "" : key}]`) : key);
    });
  } else {
    const value = data === null ? "" : data;

    formData.append(parentKey, value);
  }
  return formData;
};

// export const builFormDataCommon = (formData?: any, data?: any, parentKey?: any) => {
//   if (data && typeof data === "object") {
//     Object.keys(data).forEach((key) => {
//       builFormDataCommon(formData, data[key], parentKey ? `${parentKey}[]`: key);
//     });
//   } else {
//     const value = data == null ? "" : data;

//     formData.append(parentKey, value);
//   }
//   return formData;
// };
