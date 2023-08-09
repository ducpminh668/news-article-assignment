import { useInfiniteQuery } from "@tanstack/react-query";
import cloneDeep from "lodash.clonedeep";
import React from "react";
import { MINUTE, NO_CACHE_TIME } from "~/constants/time";
import { IPagination } from "~/entities/article";
import { getListArticle } from "~/services/article";

export default function useInfiniteArticles(params: IPagination) {
  const { data, ...rest } = useInfiniteQuery(
    ["articles-infinity", params],
    ({ pageParam = 1 }) => getListArticle({ ...params, page: pageParam }),
    {
      getNextPageParam: (lastPage) => {

        return lastPage.page < lastPage.totalPage
          ? lastPage.page + 1
          : undefined;
      },
      cacheTime: NO_CACHE_TIME,
      staleTime: NO_CACHE_TIME,
    },
  );
  const articles = React.useMemo(
    () => cloneDeep(data?.pages.flatMap((page) => page.data) || []),

    [data],
  );

  return { data: articles, ...rest };
}
