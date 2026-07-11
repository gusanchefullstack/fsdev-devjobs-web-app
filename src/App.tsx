import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { JobDetailPage } from "./pages/JobDetailPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
    </Routes>
  );
}
