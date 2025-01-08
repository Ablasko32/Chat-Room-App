import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import Room from "./pages/Room";
import AppLayout from "./features/ui/AppLayout";
import "./utils/encryption.js";
import "./services/roomsApi.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/room/:room/:name" element={<Room />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
