import { Button } from "react-bootstrap";
import styles from "./ErrorPage.module.css";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
const { stylesToMainLayOut, styleToPage } = styles;
import { motion } from "framer-motion";
export default function ErrorPage() {
  const error = useRouteError();
  let errorStatus: number;
  let errorStatusText: string;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else {
    errorStatus = 404;
    errorStatusText = "Page Not Found";
  }

  return (
    <motion.div
      className={stylesToMainLayOut}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div>
        <NavBar />
        <div
          className={`d-flex justify-content-center align-items-center flex-column my-5 ${styleToPage}`}>
          <h1>{errorStatus}</h1>
          <h3>{errorStatusText}</h3>
          <Button variant="danger">
            <Link to={"/"} replace={true} className="text-decoration-none text-white">
              Back to home page
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}
