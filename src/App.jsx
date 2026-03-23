import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/admin" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
