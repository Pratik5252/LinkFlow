import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./Components/Auth/AuthForm";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProtechedRoute from "./Components/Auth/ProtechedRoute";
import Layout from "./Components/Layout/Layout";
import VisualData from "./Components/Data/VisualData";
import { ThemeProvider } from "./contexts/theme-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="/"
            element={
              <ProtechedRoute>
                <Layout />
              </ProtechedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="visit/:urlId" element={<VisualData />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
