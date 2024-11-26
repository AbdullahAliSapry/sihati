import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import RegisterSchemaToUser from "../../schemas/RegisterSchema";
import RegisterGoogle from "./RegisterGoogle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { AddNewUser } from "../../store/api/AuthApi";
import { IUser } from "../../utils/Interfces";
import Swal from "sweetalert2";
const {
  parentConData,
  seprateStyle,
  conImg,
  smTitle,
  parentSec,
  styleTitle,
  formStyle,
  buttonParent,
  footerLoginStyle,
} = styles;
export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { isRegistered } = useSelector((state: RootState) => state.Auth);
  const navigate = useNavigate();
  const initialValues: IUser = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: RegisterSchemaToUser,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values: IUser) => {
      dispatch(AddNewUser(values));
      console.log(isRegistered);
      
      if (isRegistered) {
        Swal.fire({
          title: "من فضلك سجل الدخول",
          text: "هل تريد تسحيل الدخول!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "تسجيل الدخول",
          cancelButtonText: "إلغاء",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
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
          <span className={styleTitle}>مرحبا بك !</span>
          <span className={smTitle}>ادخل بياناتك لانشاء حساب</span>
          <div>
            <RegisterGoogle />
          </div>
          <div className={seprateStyle}>
            <span>او</span>
          </div>
          <div className={formStyle}>
            <form noValidate onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="username"> اسم المستخدم</label>
                <input
                  type="text"
                  id="username"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="text-danger">{formik.errors.name}</div>
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
              <div className="text-danger">
                {formik.touched.email && formik.errors.email}
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
              <div className="text-danger">
                {formik.touched.password && formik.errors.password}
              </div>
              <div>
                <label htmlFor="password">تأكيد كلمة المرور</label>
                <input
                  type="password"
                  id="password"
                  name="passwordConfirm"
                  value={formik.values.passwordConfirm}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="text-danger">
                  {formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm}
                </div>
              </div>
              <div className={buttonParent}>
                <button type="submit"> انشاء حساب جديد</button>
              </div>
              <div className={footerLoginStyle}>
                <div>
                  <span>لديك حساب بالفعل؟</span>
                  <Link to={"/login"}> تسجيل الدخول</Link>
                </div>

                <div>
                  <span>طبيب؟</span>
                  <Link to={"/register-doctors"}>سجل معنا</Link>
                </div>
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
