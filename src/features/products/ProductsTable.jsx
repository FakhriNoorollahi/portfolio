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

import AppButtonIcon from "../../ui/AppButtonIcon";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/products/useProducts";
import usePagination from "../../hooks/usePagination";
import AppButton from "../../ui/AppButton";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";

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

function ProductsTable() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const {
    searchInput,
    setSearchInput,
    isLoading,
    products,
    page,
    rowsPerPage,
    changePage,
    changeLimit,
    category,
    search,
  } = useProducts();
  const { skip, limit } = usePagination();
  let filteredProducts = products;

  if (category) {
    filteredProducts = products.filter((item) => item.category === category);
  }

  if (searchInput) {
    filteredProducts = filteredProducts.filter((item) =>
      item.description.toLowerCase().includes(search.trim().toLowerCase()),
    );
  }

  const visibleProducts = filteredProducts.slice(skip, skip + limit);

  const total = filteredProducts.length;

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} sx={{ marginBottom: "20px" }}>
        <TextField
          label="Search"
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          sx={{
            backgroundColor: "#fff",
            border: "none",
            width: "50%",
          }}
        />
        <AppButton startIcon={<AddIcon />} handler={() => setOpen(true)}>
          Add Category
        </AppButton>
        {open && <AddCategoryModal setOpen={setOpen} />}
      </Stack>
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
              {visibleProducts.length ? (
                visibleProducts.map((p, index) => (
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
                      changePage(newPage + 1);
                    }}
                    onRowsPerPageChange={(event) => {
                      changeLimit(Number(event.target.value));
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

export default ProductsTable;
