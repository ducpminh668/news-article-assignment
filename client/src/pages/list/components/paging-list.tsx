import { Fragment, memo } from "react";
import { IArticle } from "~/entities/article";
import CardArticle from "./card";

interface IPagingList {
  data: IArticle[];
}

function PagingList({ data }: IPagingList) {
  return (
    <>
      {(data || []).map((article: IArticle) => (
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
    </>
  );
}

export default memo(PagingList);
