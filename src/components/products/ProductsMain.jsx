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
import { useNavigate, useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") || 1);
  const rowsPerPage = Number(searchParams.get("limit") || 10);
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
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
    const loadProducts = async () => {
      setIsLoading(true);

      const response = await getProducts({
        search,
        limit: rowsPerPage,
        skip: (page - 1) * rowsPerPage,
      });

      setProducts(response.data.products);
      setTotal(response.data.total);
      setIsLoading(false);
    };

    loadProducts();
  }, [search, page, rowsPerPage]);

  return (
    <Stack spacing={3}>
      <TextField
        label="Search"
        value={searchInput}
        onChange={(event) => {
          setSearchInput(event.target.value);
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
                      {(page - 1) * rowsPerPage + index + 1}
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
                    page={page - 1}
                    rowsPerPage={rowsPerPage}
                    onPageChange={(event, newPage) => {
                      setSearchParams((prev) => {
                        const next = new URLSearchParams(prev);

                        next.set("page", String(newPage + 1));

                        return next;
                      });
                    }}
                    onRowsPerPageChange={(event) => {
                      const newLimit = Number(event.target.value);

                      setSearchParams((prev) => {
                        const next = new URLSearchParams(prev);

                        next.set("limit", String(newLimit));
                        next.set("page", "1");

                        return next;
                      });
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
