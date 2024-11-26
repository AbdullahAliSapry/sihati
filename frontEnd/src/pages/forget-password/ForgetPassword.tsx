import styles from "./ForgetPassword.module.css";

import { motion } from "framer-motion";
import { useFormik } from "formik";
import {ResetPasswordSchema} from "../../schemas/LoginSchema";
const {
  parentConData,
  smTitle,
  parentSec,
  formStyle,
  buttonParent,
} = styles;
export default function ForgetPassword() {
  const initialValues = {
    Email: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: ResetPasswordSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
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
          <span className={smTitle}>ادخل بياناتك لتعديل كلمه المرور</span>
          <div className={formStyle}>
            <form noValidate onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email">البريد الالكتروني</label>
                <input
                  type="email"
                  id="email"
                  name="Email"
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="text-danger text-capitalize">
                {formik.errors.Email}
              </div>

              <div>
                <label htmlFor="password">كلمة المرور الجديده</label>
                <input
                  type="password"
                  id="password"
                  name="NewPassword"
                  value={formik.values.NewPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="text-danger text-capitalize">
                {formik.touched.NewPassword && formik.errors.NewPassword}
              </div>
              <div>
                <label htmlFor="password"> تأكيد كلمة المرور الجديده</label>
                <input
                  type="password"
                  id="password"
                  name="ConfirmNewPassword"
                  value={formik.values.ConfirmNewPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="text-danger text-capitalize">
                {formik.touched.ConfirmNewPassword &&
                  formik.errors.ConfirmNewPassword}
              </div>
              <div className={buttonParent}>
                <button type="submit"> تغير كلمه السر؟</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
