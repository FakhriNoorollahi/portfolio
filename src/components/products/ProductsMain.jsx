import {
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/products";
import AppButtonIcon from "../../ui/AppButtonIcon";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const tableHeaders = [
  {
    id: 1,
    label: "title",
  },
  {
    id: 2,
    label: "category",
  },
  {
    id: 3,
    label: "price",
  },
  {
    id: 4,
    label: "minimumOrderQuantity",
  },
  {
    id: 5,
    label: "description",
  },
];

function ProductsMain() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      const response = await getProducts({
        search: debouncedSearch,
        limit: rowsPerPage,
        skip: page * rowsPerPage,
      });

      setProducts(response.data.products);
      setTotal(response.data.total);
      setIsLoading(false);
    };

    loadProducts();
  }, [debouncedSearch, page, rowsPerPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Stack spacing={3}>
      <TextField
        label="Search"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(0);
        }}
        sx={{
          marginBottom: "20px",
          backgroundColor: "#fff",
          border: "none",
          width: "50%",
        }}
      />
      {isLoading ? (
        <CircularProgress aria-label="Loading…" />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>index</TableCell>
                {tableHeaders.map((p) => (
                  <TableCell key={p.id}>{p.label}</TableCell>
                ))}
                <TableCell>details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length ? (
                products.map((p, index) => (
                  <TableRow
                    key={p.title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {p.title}
                    </TableCell>
                    <TableCell align="right">{p.category}</TableCell>
                    <TableCell align="right">{p.price}</TableCell>
                    <TableCell align="right">
                      {p.minimumOrderQuantity}
                    </TableCell>
                    <TableCell align="right">{p.description}</TableCell>
                    <TableCell>
                      <AppButtonIcon
                        color="secondary"
                        handler={() => navigate(`/products/${p.id}`)}
                      >
                        <SettingsIcon sx={{ color: "primary.main" }} />
                      </AppButtonIcon>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <Typography>There is no Products</Typography>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={tableHeaders.length + 1}>
                  <TablePagination
                    component="div"
                    count={total}
                    page={page}
                    onPageChange={(event, newPage) => {
                      setPage(newPage);
                    }}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(event) => {
                      setRowsPerPage(parseInt(event.target.value, 10));
                      setPage(0);
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}

export default ProductsMain;
