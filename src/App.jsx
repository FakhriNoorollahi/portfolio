import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import MainLayout from "./layouts/MainLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResumePage from "./pages/ResumePage";
import ConcatPage from "./pages/ConcatPage";
import SkillsPage from "./pages/SkillsPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProductsPage from "./pages/ProductsPage";
import ProductsLayout from "./layouts/ProductsLayout";
import ProductDetail from "./components/products/ProductDetail";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<ProtectedRoute type="protected" />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="resume" element={<ResumePage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="contact" element={<ConcatPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute type="public" />}>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute type="protected" />}>
          <Route path="/products" element={<ProductsLayout />}>
            <Route index element={<ProductsPage />} />
            <Route path=":id" element={<ProductDetail />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
