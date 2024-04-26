import { useMemo } from "react";

import qs from "qs";

import isEmpty from "lodash/isEmpty";
import isObject from "lodash/isObject";

import { useInfiniteQuery, useQuery } from "@/libs/ReactQuery";

export const fetchQuery = ({ isInfinityQuery = false, key, params, api, ...rest }: any) => {
  const qsStringParams = qs.stringify(params);

  const mergeKey = useMemo(() => {
    if (!isEmpty(qsStringParams)) return [key, qsStringParams];
    return [key];
  }, [qsStringParams]);

  // if (isInfinityQuery) {
  //   return useInfiniteQuery(
  //     mergeKey,
  //     ({ signal, pageParam }: any) => {
  //       return api({
  //         signal,
  //         params: {
  //           ...params,
  //           ...(isObject(pageParam) ? pageParam : { page: pageParam }),
  //           fromIndex: ((isObject(pageParam) ? pageParam?.page : pageParam) || 0) * params.size,
  //         },
  //       });
  //     },
  //     { ...enabled },
  //   );
  // }

  return useQuery({
    queryKey: mergeKey,
    queryFn: ({ signal }: any) => api({ signal, params }),
    ...rest,
  });
};
