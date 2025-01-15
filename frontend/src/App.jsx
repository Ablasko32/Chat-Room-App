import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import Room from "./pages/Room";
import AppLayout from "./features/ui/AppLayout";
import "./utils/encryption.js";
import "./services/roomsApi.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./features/ui/ProtectedRoute.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/room/:room/:name"
              element={
                <ProtectedRoute>
                  <Room />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AppLayout>
      </BrowserRouter>
      {/* Notifications toaster */}
      <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--bg-lifted)",
            color: "var(--primary-color)",
            fontSize: "1.4rem",
          },
          success: {
            iconTheme: {
              primary: "var(--primary-color)",
              secondary: "var(--background-color)",
            },
          },
          error: {
            iconTheme: {
              primary: "var(--red-error)",
              secondary: "var(--background-color)",
            },
            style: {
              color: "var(--red-error)",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
