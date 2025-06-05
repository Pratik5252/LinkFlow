import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./Components/AuthForm";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
