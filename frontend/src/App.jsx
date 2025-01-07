import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/mainPage";
import Room from "../pages/Room";
import AppLayout from "../features/ui/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/room/:name" element={<Room />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
