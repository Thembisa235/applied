import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { ApplicationPage } from "./pages/ApplicationPage";
import { NewApplicationPage } from "./pages/NewApplicationPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ApplicationsPage />} />
        <Route path="new" element={<NewApplicationPage />} />
        <Route path="applications/:id" element={<ApplicationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}