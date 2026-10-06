import { useSearchParams } from "react-router-dom";

export default function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const skip = (page - 1) * limit;

  const changePage = (newPage) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      next.set("page", String(newPage));

      return next;
    });
  };

  const changeLimit = (newLimit) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      next.set("limit", String(newLimit));
      next.set("page", "1");

      return next;
    });
  };

  return {
    page,
    limit,
    skip,
    changePage,
    changeLimit,
  };
}
