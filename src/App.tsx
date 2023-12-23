import { type JSX } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Scratch from "./pages/Scratch";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Navigate to="/0x00" replace />} />
      <Route path="/:id" element={<Scratch />} />
    </Routes>
  );
}
