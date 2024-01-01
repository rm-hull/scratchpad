import { type JSX } from "react";
import { Route, Routes } from "react-router-dom";
import Scratch from "./pages/Scratch";
import Import from "./pages/Import";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Scratch />} />
      <Route path="/import/:id/:language/:data" element={<Import />} />
    </Routes>
  );
}
