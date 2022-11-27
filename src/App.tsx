import { Navigate, Route, Routes } from "react-router-dom";
import Scratch from "./pages/Scratch";

export default function App() {
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
