import { Box, Stack, Typography } from "@mui/material";
import AppButtonIcon from "../../../ui/AppButtonIcon";
import AppCard from "../../../ui/AppCard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PRODUCT_ITEM = [
  { id: 1, label: "title" },
  { id: 2, label: "description" },
  { id: 3, label: "category" },
  { id: 4, label: "price" },
  { id: 5, label: "rating" },
  { id: 6, label: "brand" },
];

function ProductDetailSSR({ initialData }) {
  const product = initialData.product;

  return (
    <Box spacing={5}>
      <AppButtonIcon handler={() => window.history.back()}>
        <ArrowForwardIcon sx={{ color: "primary.main" }} />
      </AppButtonIcon>
      <AppCard title="Products Detail" cardSx={{ backgroundColor: "#FFEBD1" }}>
        {PRODUCT_ITEM.map((p) => (
          <Stack
            key={p.id}
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={1}
          >
            <Typography variant="h6">{p.label} :</Typography>
            <Typography variant="body1">{product[p.label] ?? "-"}</Typography>
          </Stack>
        ))}
      </AppCard>
    </Box>
  );
}

export default ProductDetailSSR;
