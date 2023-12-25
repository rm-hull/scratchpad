import { type JSX } from "react";
import { Route, Routes } from "react-router-dom";
import Scratch from "./pages/Scratch";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Scratch />} />
    </Routes>
  );
}
