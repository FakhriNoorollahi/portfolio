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
  Typography,
} from "@mui/material";
import AppButtonIcon from "../../ui/AppButtonIcon";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";

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

function ProductsTableView({
  products,
  isLoading,
  page,
  rowsPerPage,
  total,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDetails,
}) {
  return (
    <Stack spacing={3}>
      {isLoading ? (
        <CircularProgress aria-label="Loading…" />
      ) : products.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>index</TableCell>

                {tableHeaders.map((item) => (
                  <TableCell key={item.id}>{item.label}</TableCell>
                ))}

                <TableCell>edit</TableCell>
                <TableCell>details</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">
                    {(page - 1) * rowsPerPage + index + 1}
                  </TableCell>

                  <TableCell>{product.title}</TableCell>
                  <TableCell align="right">{product.category}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">
                    {product.minimumOrderQuantity}
                  </TableCell>
                  <TableCell align="right">{product.description}</TableCell>

                  <TableCell>
                    <AppButtonIcon
                      color="secondary"
                      handler={() => onEdit(product.id)}
                    >
                      <EditIcon sx={{ color: "primary.main" }} />
                    </AppButtonIcon>
                  </TableCell>

                  <TableCell>
                    <AppButtonIcon
                      color="secondary"
                      handler={() => onDetails(product.id)}
                    >
                      <SettingsIcon sx={{ color: "primary.main" }} />
                    </AppButtonIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={tableHeaders.length + 3}>
                  <TablePagination
                    component="div"
                    count={total}
                    page={page - 1}
                    rowsPerPage={rowsPerPage}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <Typography>There is no Products</Typography>
      )}
    </Stack>
  );
}

export default ProductsTableView;
