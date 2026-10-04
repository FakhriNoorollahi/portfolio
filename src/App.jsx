import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import MainLayout from "./layouts/MainLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResumePage from "./pages/ResumePage";
import SkillsMain from "./components/skills/SkillsMAin";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/about" replace />} />
          <Route path="/about" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/skills" element={<SkillsMain />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
