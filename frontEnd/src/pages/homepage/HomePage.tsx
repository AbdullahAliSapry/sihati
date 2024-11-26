import { Link } from "react-router-dom";
import style from "./HomePage.module.css";
const { styleImg, parentSection, title, buttonsParent, ButtonStyle } = style;
import { motion } from "framer-motion";
import Specialists from "./components/Specialists";
import GoogleMaps from "./components/googlemaps/GoogleMaps";
import ContactIcons from "./components/contactComponent/ContactIcons";
import AccordionCom from "./components/AccordionCom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import Swal from "sweetalert2";
import { logoutUser } from "../../store/api/AuthApi";

export default function HomePage() {
  const { user, userConfirmationDoctor } = useSelector(
    (state: RootState) => state.Auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleLogOut = () => {
    Swal.fire({
      title: " تسجبل الخروج",
      text: "هل انت متأكد من تسجيل الخروج",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "تسجيل الخروج",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutUser());
      }
    });
  };
  //http://localhost:5173/details-doctors/66652783b800ba3cdc3f53a2
  return (
    <motion.div
      className={parentSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div>
        <div>
          <div className={title}>
            <span>مرحبا بك في .........</span>
            <h2>رحلتك إلى صحة أفضل تبدأ هنا</h2>
          </div>
          {user || userConfirmationDoctor ? (
            <div className={buttonsParent}>
              <button>
                {user && (
                  <Link to={`/user-profile/${user.data.user._id}`}>
                    الملف الشخصي
                  </Link>
                )}
                {userConfirmationDoctor && (
                  <Link
                    to={`/details-doctors/${userConfirmationDoctor.data.user._id}`}>
                    الملف الشخصي
                  </Link>
                )}
              </button>
              <button onClick={handleLogOut} className={ButtonStyle}>
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <div className={buttonsParent}>
              <button>
                <Link to={"/login"}>تسجيل الدخول</Link>
              </button>
              <button>
                <Link to={"/register"}> انشاء حساب</Link>
              </button>
            </div>
          )}
        </div>
        <div>
          <img
            src="./../../../src/assets/Doctors-pana.png"
            className={styleImg}
            alt=""
          />
        </div>
      </div>
      <div className="pt-4">
        <Specialists />
      </div>
      <div className="w-100">
        <AccordionCom />
      </div>
      <div className="w-100">
        <GoogleMaps />
      </div>
      <div className="w-100">
        <ContactIcons />
      </div>
    </motion.div>
  );
}
