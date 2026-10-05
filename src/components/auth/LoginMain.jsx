import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    height: 54,
    paddingLeft: 1.5,
    paddingRight: 1.5,
  },
  "& .MuiOutlinedInput-input": {
    padding: "10px 0",
  },
  "& .MuiInputAdornment-root": {
    marginRight: 1.125,
  },
};

export const LoginMain = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Stack spacing={2.5}>
      <TextField
        fullWidth
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email Address"
        sx={fieldSx}
        slotProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlined sx={{ color: "text.disabled", fontSize: 30 }} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        sx={{
          ...fieldSx,
          "& .MuiOutlinedInput-root": {
            height: 54,
            px: 1.5,
            backgroundColor: "form.light",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "secondary.main",
            },
          },
        }}
        slotProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlined sx={{ color: "text.disabled", fontSize: 30 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Show password"
                edge="end"
                size="small"
                sx={{ color: "text.disabled" }}
              >
                <VisibilityOutlined sx={{ fontSize: 25 }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        REGISTER
      </Button>
    </Stack>
  );
};

export default LoginMain;
