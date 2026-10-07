import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
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
import { loginUser } from "../../services/authServices";
import { getToken, setToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await loginUser({ username, password });

      const token = res.data.token;
      setToken(token);

      if (token) {
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Stack spacing={2.5}>
      <TextField
        fullWidth
        type="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Username"
        sx={fieldSx}
        slotProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineOutlinedIcon
                sx={{ color: "text.disabled", fontSize: 30 }}
              />
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

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        REGISTER
      </Button>
    </Stack>
  );
};

export default LoginMain;
