import { Fragment, memo } from "react";
import InfiniteScroll from "~/components/infinite-scroll";
import { DEFAULT_LIMIT } from "~/constants/pagination";
import { IArticle, IPagination } from "~/entities/article";
import useInfiniteArticles from "~/hooks/use-infinite-articles";
import CardArticle from "./card";

function InfiniteList({ keySearch }: { keySearch: string }) {
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteArticles({
    page: 1,
    limit: DEFAULT_LIMIT,
    keySearch: keySearch,
  } as IPagination);

  return (
    <InfiniteScroll
      threshold={1}
      onTouchAnchor={fetchNextPage}
      isLoading={isLoading}
      hasNextPage={!!hasNextPage}
    >
      {data.map((article: IArticle) => (
        <Fragment key={article._id}>
          <CardArticle
            _id={article._id}
            title={article.title}
            summary={article.summary}
            date={article.date}
            publisher={article.publisher}
          />
        </Fragment>
      ))}
    </InfiniteScroll>
  );
}

export default memo(InfiniteList);
