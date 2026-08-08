import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
        <Route path="/change-password" element={<h1>Change Password</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;