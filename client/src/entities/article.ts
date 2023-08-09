import { object, string } from "yup";
export interface IArticle {
  _id: string;
  title: string;
  summary: string;
  date: string;
  publisher: string;
}

export interface PaginateResult<T> {
  data: T[];
  page: number;
  perPage: number;
  totalPage: number;
  totalCount: number;
}

export interface IArticleResponse {
  articles: IArticle[];
  articlesCount: number;
}

export interface IPagination {
  page: number;
  limit: number;
  keySearch?: string;
}
export const articleSchema = object({
  title: string().trim().required("Article Title is required."),
  summary: string().trim().required("Article Summary is required."),
  date: string().trim().required("Article date is required."),
  publisher: string().trim().required("Publisher Of Article is required."),
});

export default articleSchema;
