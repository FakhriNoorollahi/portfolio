import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { registerUser } from "../../services/authServices";

const fields = [
  {
    id: "username",
    placeholder: "Username",
    type: "text",
    icon: <PersonOutlineOutlinedIcon />,
    backgroundColor: "background.paper",
  },
  {
    id: "email",
    placeholder: "Email Address",
    type: "email",
    icon: <EmailOutlined />,
    backgroundColor: "form.mutedBackground",
  },
  {
    id: "password",
    placeholder: "Password",
    type: "password",
    icon: <LockOutlined />,
    backgroundColor: "form.mutedBackground",
  },
];

const RegisterMain = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const { username, password } = formData;
    try {
      const res = await registerUser({ username, password });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      component="form"
      aria-label="Registration form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ width: "100%" }}
    >
      <Stack spacing={2.5}>
        {fields.map((field) => {
          const isPassword = field.id === "password";

          return (
            <OutlinedInput
              key={field.id}
              id={field.id}
              name={field.id}
              type={isPassword && showPassword ? "text" : field.type}
              placeholder={field.placeholder}
              fullWidth
              value={formData[field.id]}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    aria-hidden="true"
                    sx={{
                      display: "flex",
                      color: "#c8cbd3",
                      "& .MuiSvgIcon-root": {
                        fontSize: 30,
                      },
                    }}
                  >
                    {field.icon}
                  </Box>
                </InputAdornment>
              }
              endAdornment={
                isPassword ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      edge="end"
                      onClick={() => setShowPassword((visible) => !visible)}
                      sx={{
                        color: "#c8cbd3",
                        "& .MuiSvgIcon-root": {
                          fontSize: 30,
                        },
                      }}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                ) : undefined
              }
              sx={{
                backgroundColor: field.backgroundColor,
                "& .MuiOutlinedInput-input": {
                  minWidth: 0,
                },
              }}
            />
          );
        })}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          REGISTER
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterMain;
