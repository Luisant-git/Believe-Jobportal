import Aos from "aos";
import { useEffect, Suspense, lazy } from "react";
import SrollTop from "./components/common/ScrollTop";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "aos/dist/aos.css";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
 
if (typeof window !== "undefined") {
  import("bootstrap");
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import { getAuthData } from "./utils/auth";
// import Addjob from "./pages/employee-dashboard/db-addjob";
import Register2 from "./pages/employee-register/components/Register2";
import Register1 from "./pages/employee-register/components/Register1";
import ResumeBuilder from "./pages/resume-builder";
import ActiveCompanies from "./pages/profile/active-company";
import MasterPrograms from "./pages/master-program";
import HiringServicePage from "./pages/hiring-service";
import FaqPage from "./pages/faq";
import Blogs from "./pages/blog";
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
import CreatePassword from "./pages/CreatePassword";
const EMaddPack = lazy(() =>
  import("./pages/employee-dashboard/em-addpackages")
);
 
const DBaddPack = lazy(() =>
  import("./pages/dashboard/dashboard/db-addpackage")
);
const AuthSuccess = lazy(() => import("./pages/auth/callback"));
const Myprofile = lazy(() => import("./pages/profile"));
const MyApplication = lazy(() => import("./pages/myapplication"));
const CompanyList = lazy(() =>
  import("./pages/dashboard/dashboard/db-company")
);
const JobSeekerList = lazy(() =>
  import("./pages/dashboard/dashboard/db-job-seeker")
);
const PaymentList = lazy(() =>
  import("./pages/dashboard/dashboard/db-payment")
);

const PosterPage = lazy (() => import("./pages/dashboard/dashboard/db-poster"));
const BannerPage = lazy (() => import("./pages/dashboard/dashboard/db-banner"));
const AdminSuperAdminManagementPage = lazy(() =>
  import("./pages/dashboard/dashboard/db-role-managment")
);
const Employee = lazy(() => import("./pages/employee"));
const EmployeeRgister = lazy(() => import("./pages/employee-register"));
 
const Home = lazy(() => import("./pages"));
const BlogListV1 = lazy(() => import("./pages/blogs/blog-list-v1"));
const NotFoundPage = lazy(() => import("./pages/not-found"));
const About = lazy(() => import("./pages/others/about"));
const BecomeExpert = lazy(() => import("./pages/others/become-expert"));
const HelpCenter = lazy(() => import("./pages/others/help-center"));
const LogIn = lazy(() => import("./pages/others/login"));
const SignUp = lazy(() => import("./pages/others/signup"));
const Terms = lazy(() => import("./pages/others/terms"));
const Invoice = lazy(() => import("./pages/others/invoice"));
const Contact = lazy(() => import("./pages/others/contact"));
const Destinations = lazy(() => import("./pages/others/destinations"));
const DBDashboard = lazy(() =>
  import("./pages/dashboard/dashboard/db-dashboard")
);
const EMDashboard = lazy(() =>
  import("./pages/employee-dashboard/db-dashboard")
);
const SubList = lazy(() =>
  import("./pages/employee-dashboard/em-sub")
);
const EmApplicationList = lazy(() =>
  import("./pages/employee-dashboard/db-applications")
);
const EmCategoryList = lazy(() =>
  import("./pages/employee-dashboard/db-category")
);
const EmJobList = lazy(() => import("./pages/employee-dashboard/db-jobs"));
 
const HotelListPage1 = lazy(() => import("./pages/hotel/hotel-list-v2"));
const HotelSingleV1Dynamic = lazy(() =>
  import("./pages/hotel/hotel-single-v2")
);
const BookingPage = lazy(() => import("./pages/hotel/booking-page"));
const Loading = lazy(() => import("./Loading"));
const AdminLogin = lazy(() => import("./pages/others/login/AdminLogin"));
const ApplicationList = lazy(() =>
  import("./pages/dashboard/dashboard/db-applications")
);
const JobList = lazy(() => import("./pages/dashboard/dashboard/db-job"));
const CategoryList = lazy(() =>
  import("./pages/dashboard/dashboard/db-category")
);
const InterviewList = lazy(() =>
  import("./pages/dashboard/dashboard/db-interview")
);
 
function App() {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);
 
  const decodedData = getAuthData();
 
  const isAdmin =
    decodedData?.role === "admin" || decodedData?.role === "employer";

  const isSuperAdmin = decodedData?.role === "super_admin";
 
  return (
    <main>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense
            fallback={
              <div>
                <Loading />
              </div>
            }
          >
            <Routes>
              <Route path="/">
                <Route index element={<><Home /><SrollTop /></>} />
                <Route path="blog" element={<BlogListV1 />} />
                <Route path="404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="about" element={<About />} />
                <Route path="become-expert" element={<BecomeExpert />} />
                <Route path="help-center" element={<HelpCenter />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<LogIn />} />
                <Route path="terms" element={<Terms />} />
                <Route path="invoice" element={<Invoice />} />
                <Route path="contact" element={<Contact />} />
                <Route path="destinations" element={<Destinations />} />
                <Route
                  path="adminlogin/BelieveHRDConsultancy"
                  element={<AdminLogin />}
                />
                <Route path="auth/callback" element={<AuthSuccess />} />
                <Route path="auth/success" element={<AuthSuccess />} />
                <Route path="application/:id" element={<BookingPage />} />
                <Route path="profile" element={<Myprofile />} />
                <Route path="myapplications" element={<MyApplication />} />
                <Route path="employee/login" element={<Employee />} />
                <Route path="employee/register" element={<EmployeeRgister />} />
                <Route path="employee/register1" element={<Register1 />} />
                <Route path="employee/register2" element={<Register2/>} />
 
                {Employee && (
                  <>
                    <Route path="em-dashboard" element={<EMDashboard />} />
                    <Route
                      path="em-ApplicationList"
                      element={<EmApplicationList />}
                    />
                    <Route path="em-joblist" element={<EmJobList />} />
                    <Route path="em-Categorylist" element={<EmCategoryList />} />
                    {/* <Route path="/em-job/addjob" element={<Addjob/>} /> */}
                    <Route path="em-job/addjob" element={<EMaddPack />} />
                    <Route path="em-job/editjob/:id" element={<EMaddPack />} />
                    <Route path="em-subscription" element={<SubList />} />
                  </>
                )}

                {(isAdmin || isSuperAdmin) && (
                  <>
                    
                    <Route path="dashboard">
                      <Route path="db-dashboard" element={<DBDashboard />} />
                      <Route path="db-booking" element={<ApplicationList />} />
                      <Route path="db-joblist" element={<JobList />} />
                      <Route path="db-payment" element={<PaymentList />} />
                      <Route path="db-poster" element={<PosterPage />} />
                      <Route path="db-banner" element={<BannerPage />} />
                      {isSuperAdmin && (
                        <Route path="db-role-managment" element={<AdminSuperAdminManagementPage />} />
                      )}
                      <Route path="db-categorylist" element={<CategoryList />} />
                      {isSuperAdmin && (
                        <Route
                          path="db-interview"
                          element={<InterviewList />}
                        />
                      )}
                      <Route path="db-job/addjob" element={<DBaddPack />} />
                      <Route path="db-job/editjob/:id" element={<DBaddPack />} />
                      <Route path="db-companies" element={<CompanyList />} />
                      <Route path="db-job-seeker" element={<JobSeekerList />} />
                    </Route>
                  </>
                )}
                <Route path="jobs" element={<HotelListPage1 />} />
                <Route path="jobs/:id" element={<HotelSingleV1Dynamic />} />
                <Route path="resume-builder" element={<ResumeBuilder />} />
                <Route path="companies" element={<ActiveCompanies />} />
                <Route path="master-program" element={<MasterPrograms />} />
                <Route path="hiring-service" element={<HiringServicePage />} />
                <Route path="faq" element={<FaqPage/>} />
                <Route path="blogs" element={<Blogs/>} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="create-password" element={<CreatePassword />} />
              </Route>
            </Routes>
            <ScrollTopBehaviour />
          </Suspense>
        </BrowserRouter>
      </Provider>
    </main>
  );
}
 
export default App;