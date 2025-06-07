import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./Components/Auth/AuthForm";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import ProtechedRoute from "./Components/Auth/ProtechedRoute";
// import Navbar from "./Components/Navbar";
import Layout from "./Components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtechedRoute>
              {/* <Navbar /> */}
              <Layout>
                <Dashboard />
              </Layout>
            </ProtechedRoute>
          }
        />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
