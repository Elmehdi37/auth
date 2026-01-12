import { Routes, Route } from "react-router";
import LoginForm from "../components/LoginForm";

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" />
    </Routes>
  );
}
