import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Builder from "./pages/Builder";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/build/:template" element={<Builder />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}