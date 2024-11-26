import styles from "./LoginPage.module.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import LoginSchema from "../../schemas/LoginSchema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { LoginApi, LoginApiDoctor } from "../../store/api/AuthApi";
import { IUser } from "../../utils/Interfces";
const {
  parentConData,
  iconsStyle,
  seprateStyle,
  conImg,
  smTitle,
  parentSec,
  styleTitle,
  formStyle,
  buttonParent,
  checkBoxStyle,
} = styles;

interface newLogin extends Omit<IUser, "name" | "passwordConfirm"> {
  isdoctor: boolean;
}
export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, userConfirmationDoctor } = useSelector(
    (state: RootState) => state.Auth
  );
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    isdoctor: false,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: (values: newLogin) => {
      if (values.isdoctor) {
        dispatch(LoginApiDoctor(values.email, values.password));
        if (userConfirmationDoctor) {
          navigate("/");
        }
      } else {
        dispatch(LoginApi({email: values.email, password: values.password}));
      }
      if (user) {
        navigate("/");
      }
    },
  });

  return (
    <motion.div
      className={parentSec}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className={parentConData}>
        <div>
          <span className={styleTitle}>مرحبا بعودتك !</span>
          <span className={smTitle}>ادخل بياناتك لتسجيل الدخول</span>
          <div className={iconsStyle}>
            <div>
              <FcGoogle />
            </div>

            <div>
              <FaFacebookSquare />
            </div>

            <div>
              <RiTwitterXFill />
            </div>
          </div>
          <div className={seprateStyle}>
            <span>او</span>
          </div>
          <div className={formStyle}>
            <form noValidate onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email">البريد الالكتروني</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="text-danger text-capitalize">
                {formik.errors.email}
              </div>
              <div>
                <label htmlFor="password">كلمة المرور</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="text-danger text-capitalize">
                {formik.touched.password && formik.errors.password}
              </div>
              <div className={buttonParent}>
                <div className={checkBoxStyle}>
                  <label htmlFor="isdoctor">هل انت دكتور</label>
                  <input
                    type="checkbox"
                    id="isdoctor"
                    checked={formik.values.isdoctor}
                    onChange={formik.handleChange}
                  />
                </div>
                <Link to={"/forget-password"}>نسيت كلمة السر؟</Link>
                <button type="submit">تسجيل الدخول</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={conImg}>
        <img src="../../../src/assets/Medicine-bro.png" alt="" />
      </div>
    </motion.div>
  );
}
