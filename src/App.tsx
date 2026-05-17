import { Routes, Route } from "react-router-dom";
import Main from "@/layout/Main";
import Events from "@pages/Events";
import ContactUs from "@pages/ContactUs";
import RegisterPage from "@pages/RegisterPage";
import ConfirmationPage from "@pages/ConfirmationPage";
import StaffLoginPage from "@pages/StaffLoginPage";
import StaffPortalPage from "@pages/StaffPortalPage";
import StaffAnalyticsPage from "@pages/StaffAnalyticsPage";
import AboutUs from "@pages/AboutUs";
import Faq from "@pages/Faq";


function App() {
  return (
    <Routes>
      <Route path="/staff/login" element={<StaffLoginPage />} />
      <Route path="/staff/portal" element={<StaffPortalPage />} />
      <Route path="/staff/analytics" element={<StaffAnalyticsPage />} />
      <Route path="/staff/analytics/tv" element={<StaffAnalyticsPage tvMode />} />
      <Route element={<Main />}>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/faq" element={<Faq />} />
      </Route>
    </Routes>
  );
}

export default App;
