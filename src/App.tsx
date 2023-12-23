import { Navigate, Route, Routes } from "react-router-dom";
import Scratch from "./pages/Scratch";
import { type JSX } from "react";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path="/about"
        element={
          <div>
            <h3>About page</h3>
          </div>
        }
      />
      <Route path="/" element={<Navigate to="/0x00" replace />} />
      <Route path="/:id" element={<Scratch />} />
    </Routes>
  );
}
