import { Route, Routes, Navigate } from "react-router-dom";
import MyCalendar from "./pages/MyCalendar";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreateEvent from "./pages/CreateEvent";
import Login from "./pages/Login";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/Home" element={<MyCalendar />} />
        <Route exact path="/CreateEvent" element={<CreateEvent />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/404" element={<ErrorPage />} />
        {/* Redirects */}
        <Route exact path="/" element={<Navigate to="/Home" replace />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
