import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../services/products";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import AppCard from "../../ui/AppCard";
import AppButtonIcon from "../../ui/AppButtonIcon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PRODUCT_ITEM = [
  { id: 1, label: "title" },
  { id: 2, label: "description" },
  { id: 3, label: "category" },
  { id: 4, label: "price" },
  { id: 5, label: "rating" },
  { id: 6, label: "brand" },
];

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProductDetail() {
      try {
        const { data } = await getProductById(id);
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    loadProductDetail();
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <CircularProgress aria-label="Loading…" />
      ) : (
        <Box spacing={5}>
          <AppButtonIcon handler={() => navigate(-1)}>
            <ArrowForwardIcon sx={{ color: "primary.main" }} />
          </AppButtonIcon>
          <AppCard
            title="Products Detail"
            cardSx={{ backgroundColor: "#FFEBD1" }}
          >
            {PRODUCT_ITEM.map((p) => (
              <Stack
                key={p.id}
                direction="row"
                sx={{ display: "flex", alignItems: "center" }}
                spacing={1}
              >
                <Typography variant="h6">{p.label} :</Typography>
                <Typography variant="body1">{product[p.label]}</Typography>
              </Stack>
            ))}
          </AppCard>
        </Box>
      )}
    </div>
  );
}

export default ProductDetail;
