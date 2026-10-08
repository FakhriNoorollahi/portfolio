import { useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import { getProducts } from "../../services/products";
import { useSearchParams } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import { getCategories } from "../../services/categories";
import {
  getDataLocalStorage,
  saveDataLocalStorage,
} from "../../hooks/useLocalStorage";
import {
  CATEGORIES,
  PRODUCTS,
} from "../../features/products/constants/productConst";

function ProductsProvider({ children }) {
  const [categories, setCategories] = useState(
    getDataLocalStorage(CATEGORIES) || [],
  );
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(getDataLocalStorage(PRODUCTS) || []);
  const [total, setTotal] = useState(0);

  const { page, limit, skip, changePage, changeLimit } = usePagination();

  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const rowsPerPage = Number(searchParams.get("limit") || 10);
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    if (searchInput.length < 3 && searchInput.length !== 0) {
      return;
    }

    if (searchInput === search) {
      return;
    }

    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        if (searchInput) {
          next.set("search", searchInput);
        } else {
          next.delete("search");
        }

        next.set("page", "1");

        return next;
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, search, setSearchParams]);

  useEffect(() => {
    const localProducts = getDataLocalStorage(PRODUCTS);

    if (localProducts.length > 0) {
      return;
    }

    const loadProducts = async () => {
      setIsLoading(true);

      const response = await getProducts({
        limit: 0,
        skip,
      });

      saveDataLocalStorage(PRODUCTS, response.data.products);
      setProducts(response.data.products);
      setTotal(response.data.total);
      setIsLoading(false);
    };

    loadProducts();
  }, [search, limit, skip, category]);

  useEffect(() => {
    const localCategories = getDataLocalStorage(CATEGORIES);

    if (localCategories.length > 0) {
      return;
    }

    async function getAllCategories() {
      setIsLoadingCategory(true);
      try {
        const { data } = await getCategories();
        setCategories(data);
        saveDataLocalStorage(CATEGORIES, data);
        setIsLoadingCategory(false);
      } catch (error) {
        console.log(error);
      }
    }

    getAllCategories();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        search,
        categories,
        isLoadingCategory,
        searchInput,
        setSearchInput,
        isLoading,
        products,
        page,
        rowsPerPage,
        changePage,
        total,
        changeLimit,
        setSearchParams,
        category,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsProvider;
