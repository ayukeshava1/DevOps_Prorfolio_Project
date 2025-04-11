import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import BlogDetail from "../pages/BlogDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs/:id" element={<BlogDetail />} />
    </Routes>
  );
};

export default AppRoutes;
