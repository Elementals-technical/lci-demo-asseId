// src/routes/index.tsx
import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MainLayout } from "../pages/MainLayout/MainLayout";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* <Route path="/" element={<MainLayout />} />
          <Route path="*" element={<Navigate to="/" />} /> */}

          <Route element={<MainLayout />}>
            <Route path="/" element={<div>Rout 1</div>} />
            <Route path="*" element={<div>Rout 2</div>} />
          </Route>
          <Route path="/iframe" element={<div>Rout 3</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
