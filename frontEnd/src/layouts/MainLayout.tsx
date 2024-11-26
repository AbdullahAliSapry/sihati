import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainLayout() {
  return (
    <>
      <ToastContainer
        theme="colored"
        autoClose={1000}
        position="top-center"
        style={{
          zIndex: "10000",
        }}
      />
      <div className="parentHome">
        <NavBar />
        <Container>
          <Outlet />
        </Container>
        <Footer />
      </div>
    </>
  );
}
