import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/loginpage/LoginPage";
import RegisterPage from "../pages/registerpage/RegisterPage";
import RegisterPageDoctors from "../pages/registerPageTodoctors/RegisterPageDoctors";
import { AnimatePresence } from "framer-motion";
import ErrorPage from "../pages/error/ErrorPage";
import SpecialtiesPage from "../pages/Specialtiespage/SpecialtiesPage";
import DetailsToDoctors from "../pages/detailstodoctors/DetailsToDoctors";
import Appointment from "../pages/Appointment/Appointment";
import About from "../pages/about/About";
import Contact from "../pages/contactus/Contact";
import Profile from "../pages/profile-page/Profile";
import ForgetPassword from "../pages/forget-password/ForgetPassword";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import Prescription from "../components/prescription/Prescription";
import AppointmentDoctor from "../pages/AppointmentToDoctors/AppointmentDoctor";
import SickRecord from "../pages/sickrecord/SickRecord";
import PrescriptionDoctor from "../pages/prescriptiondoctor/PrescriptionDoctor";
import PrescriptionDoctorSeeckRicord from "../pages/Prescriptiondoctorsseek/PrescriptionDoctorSeeckRicord";

export default function AppRouter() {
  const { user, userConfirmationDoctor } = useSelector(
    (state: RootState) => state.Auth
  );
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/login/:IsDoctor?",
          element:
            !user && !userConfirmationDoctor ? (
              <LoginPage />
            ) : (
              <Navigate to={"/"} />
            ),
        },
        {
          path: "/register",
          element:
            !user && !userConfirmationDoctor ? (
              <RegisterPage />
            ) : (
              <Navigate to={"/"} />
            ),
        },
        {
          path: "/register-doctors",
          element:
            !user && !userConfirmationDoctor ? (
              <RegisterPageDoctors />
            ) : (
              <Navigate to={"/"} />
            ),
        },
        {
          path: "/specialized-doctors/:nameSpecialized",
          element: <SpecialtiesPage />,
        },
        {
          path: "/details-doctors/:id",
          element: <DetailsToDoctors />,
        },
        {
          path: "/appointments/users/:userId",
          element: <Appointment />,
        },
        {
          path: "appointment/doctors/:doctorId",
          element: <AppointmentDoctor />,
        },
        {
          path: "/about-us",
          element: <About />,
        },
        {
          path: "/contact-us",
          element: <Contact />,
        },
        {
          path: "/user-profile/:id",
          element: user ? <Profile /> : <Navigate to={"/"} />,
        },
        {
          path: "/forget-password",
          element:
            !user || !userConfirmationDoctor ? (
              <ForgetPassword />
            ) : (
              <Navigate to={"/"} />
            ),
        },
        {
          path: "/users/Prescription/:idUser/:id",
          element:
            user || userConfirmationDoctor ? (
              <Prescription />
            ) : (
              <Navigate to={"/"} />
            ),
        },
        {
          path: "/doctors/Prescription/:idAppointment",
          element: userConfirmationDoctor ? (
            <PrescriptionDoctor />
          ) : (
            <Navigate to={"/"} />
          ),
        },
        {
          path: "/doctors/Prescription-seek/:id",
          element: userConfirmationDoctor ? (
            <PrescriptionDoctorSeeckRicord  />
          ) : (
            <Navigate to={"/"} />
          ),
        },
        {
          path: "/sick-record/:idAppointment",
          element: userConfirmationDoctor ? (
            <SickRecord />
          ) : (
            <Navigate to={"/"} />
          ),
        },
      ],
    },
  ]);
  return (
    <AnimatePresence>
      <RouterProvider router={router}></RouterProvider>
    </AnimatePresence>
  );
}

//AbdullahaliDoc@gmail.com
