import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./Components/Auth/AuthForm";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import ProtechedRoute from "./Components/Auth/ProtechedRoute";
// import Navbar from "./Components/Navbar";
import Layout from "./Components/Layout";
import VisualData from "./Components/VisualData";

const App = () => {
  return (
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
  );
};

export default App;
