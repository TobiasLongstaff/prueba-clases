import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../pages/App";
import { Login } from "../pages/Login";

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/login" element={<Login />} /> */}
        <Route exact path="/" element={<App />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
