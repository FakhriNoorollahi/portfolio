import { useEffect, useState } from "react";
import { useDesignerProductData } from "../hooks/useDesignerProductData";
import ProductsTableView from "../../../common/components/ProductsTableView";

function ProductsTableDesign() {
  const { products, isLoading, searchInput } = useDesignerProductData();

  console.log("Table products:", products.length);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setPage(0);
  }, [searchInput]);

  const visibleProducts = products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    // <div>{visibleProducts.length}</div>
    <ProductsTableView
      products={visibleProducts}
      isLoading={isLoading}
      page={page + 1}
      rowsPerPage={rowsPerPage}
      total={products.length}
      onPageChange={(event, newPage) => {
        setPage(newPage);
      }}
      onRowsPerPageChange={(event) => {
        setRowsPerPage(Number(event.target.value));
        setPage(0);
      }}
      onEdit={(id) => {
        window.location.assign(`/products/edit/${id}`);
      }}
      onDetails={(id) => {
        window.location.assign(`/products/${id}`);
      }}
    />
  );
}

export default ProductsTableDesign;
