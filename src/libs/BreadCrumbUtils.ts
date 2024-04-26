import { ILists } from "@/layouts/AccountAuthSellerLayout/Breadcrumbs";
import { map } from "lodash"
import { PathKeyType, PathMapping } from "./RouterUtils";

type BreadCrumbKeyType = PathKeyType;

const BREAD_CRUMBS: Record<BreadCrumbKeyType, Omit<Omit<ILists, 'key'>, 'path'>> = {
  MyArobid: { title: "Arobid của tôi" },
  ManageRFQ:  { title: "Quản lý RFQ" },
  FRQGeneral: { title: "RFQ chung"},
  CreateFRQRequest: { title: "Tạo yêu cầu báo giá" },
  FRQEditBusinessCard: { title: "Chỉnh sửa danh thiếp" },
}

type mixItemKeyType = BreadCrumbKeyType | {key: BreadCrumbKeyType, fn: any};

const generateBreadCrumbList = (list: mixItemKeyType[] ) : ILists[] => {
    return map(list, (optionItem: mixItemKeyType, index: number) => {
      const key = typeof optionItem === 'string' ? optionItem : optionItem.key; 
      return {
        key: index + 1,
        path: PathMapping[key].path,
        title: BREAD_CRUMBS[key].title,
        ...typeof optionItem === 'object' ? {fn: optionItem.fn } : {},
      };
    });
}

export {
    generateBreadCrumbList 
}