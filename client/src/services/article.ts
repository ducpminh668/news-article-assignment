import {
  IArticle,
  IArticleResponse,
  IPagination,
  PaginateResult,
} from "~/entities/article";
import { omitParams } from "~/utils/common";
import _axios from "./setup";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export function getListArticle(queries: IPagination) {
  const searchParams = new URLSearchParams({
    ...omitParams(queries),
  });

  return _axios<IArticleResponse>({
    method: "GET",
    url: `${API_URL}/articles`,
    params: searchParams,
  }).then((res) => {
    const data = res.data.articles || [];
    const total = Math.ceil(res.data.articlesCount / queries.limit);
    return {
      data,
      totalPage: total,
      page: queries.page,
      perPage: queries.limit,
      totalCount: res.data.articlesCount,
    } as PaginateResult<IArticle>;
  });
}

export function getArticle(id: string) {
  return _axios.get<{ article: IArticle }>(`${API_URL}/articles/${id}`);
}

export function createArticle(payload: IArticle) {
  const { date, title, publisher, summary } = payload;
  return _axios<IArticle>({
    method: "POST",
    url: `${API_URL}/articles`,
    data: {
      date,
      title,
      publisher,
      summary,
    },
  });
}

export function uploadArticle(payload: IArticle) {
  return _axios<IArticle>({
    method: "PATCH",
    url: `${API_URL}/articles/${payload._id}`,
    data: payload,
  });
}

export function deleteArticle(id: string) {
  return _axios.delete(`${API_URL}/articles/${id}`);
}
