import { createTheme } from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";
import shape from "./shape";

const theme = createTheme({
  palette,
  typography,
  shape,
});

export default theme;
