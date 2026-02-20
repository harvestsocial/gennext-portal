import { Routes, Route } from "react-router-dom";
import Main from "@/layout/Main";
import Home from "@pages/Home";
import Events from "@pages/Events";
import ContactUs from "@pages/ContactUs";
import RegisterPage from "@pages/RegisterPage";
import ConfirmationPage from "@pages/ConfirmationPage";
import StaffLoginPage from "@pages/StaffLoginPage";
import StaffPortalPage from "@pages/StaffPortalPage";
import StaffAnalyticsPage from "@pages/StaffAnalyticsPage";
// import OnlineConference from "@pages/OnlineConference";
// import EducationalConference from "@pages/EducationalConference";
import AboutUs from "@pages/AboutUs";
// import Services from "@pages/Services";
// import ServicesDetails from "@pages/ServicesDetails";
// import EventsGrid from "@pages/EventsGrid";
// import EventsDetails from "@pages/EventsDetails";
// import Blog from "@pages/Blog";
// import BlogStandard from "@pages/BlogStandard";
// import BlogDetails from "@pages/BlogDetails";
import Speaker from "@pages/Speaker";
// import SpeakerDetails from "@pages/SpeakerDetails";
// import Pricing from "@pages/Pricing";
import Faq from "@pages/Faq";
// import ErrorPages from "@pages/ErrorPages";
// import ComingSoon from "@pages/ComingSoon";


function App() {
  return (
    <Routes>
      <Route path="/staff/login" element={<StaffLoginPage />} />
      <Route path="/staff/portal" element={<StaffPortalPage />} />
      <Route path="/staff/analytics" element={<StaffAnalyticsPage />} />
      <Route path="/staff/analytics/tv" element={<StaffAnalyticsPage tvMode />} />
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />

        <Route path="/events" element={<Events />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/speaker" element={<Speaker />} />
        <Route path="/faq" element={<Faq />} />

        {/* <Route path="/" element={<HomeOne />} /> */}
        {/* <Route path="/online-conference" element={<OnlineConference />} />
        <Route
          path="/educational-conference"
          element={<EducationalConference />}
        /> */}
        {/* <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services-details/:id" element={<ServicesDetails />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events-grid" element={<EventsGrid />} />
        <Route path="/events-details/:id" element={<EventsDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-standard" element={<BlogStandard />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/speaker" element={<Speaker />} />
        <Route path="/speaker-details/:id" element={<SpeakerDetails />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/*" element={<ErrorPages />}></Route> */}
      </Route>
      {/* <Route path="/coming-soon" element={<ComingSoon />} /> */}
    </Routes>
  );
}

export default App;
