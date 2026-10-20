import { useProducts } from "../../context/products/useProducts";
import usePagination from "../../hooks/usePagination";
import ProductsTableView from "../../common/components/ProductsTableView";

function ProductsTable() {
  const {
    searchInput,
    isLoading,
    products,
    page,
    rowsPerPage,
    changePage,
    changeLimit,
    selectedCategory,
    search,
  } = useProducts();

  const { skip, limit } = usePagination();
  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = products.filter(
      (item) => item.category === selectedCategory,
    );
  }

  if (searchInput) {
    filteredProducts = filteredProducts.filter((item) =>
      item.description.toLowerCase().includes(search.trim().toLowerCase()),
    );
  }

  const visibleProducts = filteredProducts.slice(skip, skip + limit);

  const total = filteredProducts.length;

  return (
    <ProductsTableView
      products={visibleProducts}
      isLoading={isLoading}
      page={page}
      rowsPerPage={rowsPerPage}
      total={total}
      onPageChange={(event, newPage) => {
        changePage(newPage + 1);
      }}
      onRowsPerPageChange={(event) => {
        changeLimit(Number(event.target.value));
      }}
    />
  );

  // return (
  //   <Stack spacing={3}>
  //     {isLoading ? (
  //       <CircularProgress aria-label="Loading…" />
  //     ) : visibleProducts.length > 0 ? (
  //       <TableContainer component={Paper}>
  //         <Table sx={{ minWidth: 650 }} aria-label="simple table">
  //           <TableHead>
  //             <TableRow>
  //               <TableCell>index</TableCell>
  //               {tableHeaders.map((p) => (
  //                 <TableCell key={p.id}>{p.label}</TableCell>
  //               ))}
  //               <TableCell>edit</TableCell>
  //               <TableCell>details</TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {visibleProducts.map((p, index) => (
  //               <TableRow
  //                 key={p.title}
  //                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  //               >
  //                 <TableCell component="th" scope="row">
  //                   {(page - 1) * rowsPerPage + index + 1}
  //                 </TableCell>
  //                 <TableCell component="th" scope="row">
  //                   {p.title}
  //                 </TableCell>
  //                 <TableCell align="right">{p.category}</TableCell>
  //                 <TableCell align="right">{p.price}</TableCell>
  //                 <TableCell align="right">{p.minimumOrderQuantity}</TableCell>
  //                 <TableCell align="right">{p.description}</TableCell>
  //                 <TableCell>
  //                   <AppButtonIcon
  //                     color="secondary"
  //                     handler={() => navigate(`/products/edit/${p.id}`)}
  //                   >
  //                     <EditIcon sx={{ color: "primary.main" }} />
  //                   </AppButtonIcon>
  //                 </TableCell>
  //                 <TableCell>
  //                   <AppButtonIcon
  //                     color="secondary"
  //                     handler={() => navigate(`/products/${p.id}`)}
  //                   >
  //                     <SettingsIcon sx={{ color: "primary.main" }} />
  //                   </AppButtonIcon>
  //                 </TableCell>
  //               </TableRow>
  //             ))}
  //           </TableBody>
  //           <TableFooter>
  //             <TableRow>
  //               <TableCell colSpan={tableHeaders.length + 1}>
  //                 <TablePagination
  //                   component="div"
  //                   count={total}
  //                   page={page - 1}
  //                   rowsPerPage={rowsPerPage}
  //                   onPageChange={(event, newPage) => {
  //                     changePage(newPage + 1);
  //                   }}
  //                   onRowsPerPageChange={(event) => {
  //                     changeLimit(Number(event.target.value));
  //                   }}
  //                 />
  //               </TableCell>
  //             </TableRow>
  //           </TableFooter>
  //         </Table>
  //       </TableContainer>
  //     ) : (
  //       <Typography variant="p">There is no Products</Typography>
  //     )}
  //   </Stack>
  // );
}

export default ProductsTable;
