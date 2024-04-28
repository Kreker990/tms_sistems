import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./auth/ProtectedRoute";

import LoginPage from "./pages/LoginPage/LoginPage";
import CreateTrainerPackagePage from "./pages/CreateTrainerPackagePage/CreateTrainerPackagePage";
import TrainerPackageListPage from "./pages/TrainerPackageListPage/TrainerPackageListPage";
import TrainerPackageDetailPage from "./pages/TrainerPackageDetailPage/TrainerPackageDetailPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/signin" element={<LoginPage />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute redirectPath="/signin">
                <CreateTrainerPackagePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/package/:id"
            element={
              <ProtectedRoute redirectPath="/signin">
                <TrainerPackageDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute redirectPath="/signin">
                <TrainerPackageListPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
