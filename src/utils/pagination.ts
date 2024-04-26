import { cloneDeep, pick } from "lodash";
import toNumber from "lodash/toNumber";

import Constant from "../data/constant";

const { PAGINATION_PAGESIZE, PAGINATION_PAGE } = { PAGINATION_PAGESIZE: 50, PAGINATION_PAGE: 0 };

export const removeParamsPagination = ({ data }: any) => {
  const cloneData = cloneDeep(data);

  delete cloneData.size;
  delete cloneData.page;
  delete cloneData.fromIndex;

  return cloneData;
};

export const resetPageWhenSizeChange = ({ page, size, prevSize }: any) => ({
  page: prevSize !== size ? PAGINATION_PAGE : page,
  size,
});

export const getDefaultPagination = () => ({ size: PAGINATION_PAGESIZE, page: PAGINATION_PAGE });

export const getConfigTablePagination = (pagination?: any) => {
  const { total = 0, size = PAGINATION_PAGESIZE, page = PAGINATION_PAGE } = pick(pagination, ["size", "page", "total"]);

  return {
    total: toNumber(total),
    pageSize: toNumber(size),
    current: toNumber(page) + 1,
  };
};
