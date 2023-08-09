import { FormControl, Pagination, PaginationItem } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { DEFAULT_LIMIT, TOTAL_PAGE } from "~/constants/pagination";
import { ViewContext } from "~/contexts/view-context";
import { IPagination } from "~/entities/article";
import ToggledListLayout from "~/layouts/toggled-list-layout";
import { converToNumber, omitEmpty } from "~/utils/common";
import InfiniteList from "./components/infinite-list";
import PagingList from "./components/paging-list";
import Result from "./components/result";
import { useQuery } from "@tanstack/react-query";
import { getListArticle } from "~/services/article";

export default function List() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { view } = useContext(ViewContext);
  const [pagination, setPagination] = useImmer<IPagination>({
    page: 1,
    limit: DEFAULT_LIMIT,
    keySearch: "",
  });

  const onChangeLimit = (event: SelectChangeEvent) => {
    setQueryParams({
      keySearch: pagination.keySearch,
      limit: +event.target.value,
      page: 1,
    });
  };

  const onChangePage = (_: any, page: number) => {
    setQueryParams({
      ...pagination,
      page: +page,
    });
  };

  const setQueryParams = (p: IPagination) => {
    console.log(p);
    const search = new URLSearchParams({
      ...omitEmpty(p),
    });

    navigate(`/article?${search.toString()}`);
  };

  useEffect(() => {
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || DEFAULT_LIMIT;
    const keySearch = searchParams.get("keySearch");
    setPagination((draft) => {
      draft.page = converToNumber(page);
      draft.limit = converToNumber(limit);
      draft.keySearch = keySearch || "";
    });
  }, [searchParams]);

  useEffect(() => {
    setPagination({
      page: 1,
      limit: DEFAULT_LIMIT,
      keySearch: "",
    });
    navigate("/article");
  }, [view]);

  const { page, limit, keySearch } = pagination;
  const { data } = useQuery(["get-paging-list", page, limit, keySearch], () =>
    getListArticle({
      page,
      limit,
      keySearch,
    }),
  );

  return (
    <div>
      <ToggledListLayout
        header={<Result amount={data?.totalCount.toLocaleString("en-US") ?? "0"} />}
      >
        {view === "list" ? (
          <>
            <InfiniteList keySearch={pagination.keySearch || ""} />
          </>
        ) : (
          <PagingList data={data?.data ?? []} />
        )}
      </ToggledListLayout>
      {view === "grid" && (
        <div className="paggination flex justify-between mt-8 items-center">
          <FormControl size="small">
            <div className="flex items-center">
              <span className="mr-2 dark:text-white"> Records to display:</span>
              <Select
                value={`${pagination.limit}`}
                onChange={onChangeLimit}
                className="dark:text-white outline-white border-white"
              >
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
              </Select>
            </div>
          </FormControl>
          <div>
            <Pagination
              page={pagination.page}
              count={data?.totalPage ?? TOTAL_PAGE}
              shape="rounded"
              onChange={onChangePage}
              renderItem={(item) => (
                <PaginationItem {...item} className="dark:text-white" />
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
