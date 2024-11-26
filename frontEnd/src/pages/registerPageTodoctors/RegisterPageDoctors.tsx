import { Link, useNavigate } from "react-router-dom";
import styles from "./RegisterPageDoctors.module.css";
import { FcGoogle } from "react-icons/fc";

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
  optionStyle,
  footerRegister,
  parentToInputs,
  inputImageStyle,
} = styles;
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { RegisterSchemaToDoctor } from "../../schemas/RegisterSchema";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { getAllData } from "../../store/api/SpecialtieApi";
import { AddNewDoctor } from "../../store/api/AuthApi";

export default function RegisterPageDoctors() {
  const { data } = useSelector((state: RootState) => state.Specialists);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllData());
  }, []);

  const [textImage, setTextImage] = useState("لا توجد صوره");
  const options = [{ value: "سوهاج", label: "سوهاج" }];

  const initialValues = {
    name: "",
    email: "",
    region: "",
    password: "",
    center: "",
    passwordConfirm: "",
    specialization: "",
    phoneNumber: "",
    photo: null,
  };

  const navigate = useNavigate();
  // handle formik
  const formik = useFormik({
    initialValues,
    validationSchema: RegisterSchemaToDoctor,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log(values);
      const formdata = new FormData();
      formdata.append("name", values.name);
      formdata.append("email", values.email);
      //formdata.append("region", values.region);
      formdata.append("password", values.password);
      
      formdata.append("location", values.center);
      formdata.append("department", values.specialization);
      formdata.append("phoneNumber", values.phoneNumber);
      formdata.append("passwordConfirm", values.passwordConfirm);
      if (!values.photo) return;
      formdata.append("photo", values.photo);
      dispatch(AddNewDoctor(formdata));
      navigate("/login");

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
          <span className={styleTitle}>مرحبا يا طبيب!</span>
          <span className={smTitle}>ادخل بياناتك لانشاء حساب</span>
          <div className={iconsStyle}>
            <div>
              <FcGoogle />
            </div>
          </div>
          <div className={seprateStyle}>
            <span>او</span>
          </div>
          <div className={formStyle}>
            <form
              className={parentToInputs}
              noValidate
              onSubmit={formik.handleSubmit}>
              <div>
                <div>
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
                  <div className="text-danger text-capitalize">
                    {formik.errors.name}
                  </div>
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
                    {formik.touched.email && formik.errors.email}
                  </div>
                  <div>
                    <label htmlFor="region">المحافظه </label>
                    <select
                      name="region"
                      id="region"
                      value={formik.values.region}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}>
                      <option value="" disabled>
                        المحافظه
                      </option>
                      {options.map((option) => (
                        <option
                          className={optionStyle}
                          key={option.value}
                          value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="text-danger text-capitalize">
                      {formik.touched.region && formik.errors.region}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="center">المركز </label>
                    <select
                      id="center"
                      name="center"
                      value={formik.values.center}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}>
                      {data?.data.locations.map((value, index) => {
                        return (
                          <option value={`${value}`} key={index}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                    <div className="text-danger text-capitalize">
                      {formik.touched.center && formik.errors.center}
                    </div>
                  </div>
                  <div className={inputImageStyle}>
                    <div>
                      <label htmlFor="photo">صوره البطاقه </label>
                      <span>{textImage}</span>
                    </div>
                    <input
                      type="file"
                      name="photo"
                      id="photo"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        if (event.target.files) {
                          formik.setFieldValue("photo", event.target.files[0]);
                          setTextImage(event.target.files[0].name);
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                    <div className="text-danger text-capitalize">
                      {formik.touched.photo && formik.errors.photo}
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="Specialization">التخصص </label>
                    <select
                      id="Specialization"
                      value={formik.values.specialization}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="specialization">
                        {
                          data?.data.departments?.map((value,index)=>{
                              return (
                                <option value={`${value}`} key={index}>
                                  {value}
                                </option>
                              );
                          })
                        }
                    
                    </select>
                    <div className="text-danger text-capitalize">
                      {formik.touched.specialization &&
                        formik.errors.specialization}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone"> رقم الهاتف</label>
                    <input
                      type="text"
                      id="phone"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="phoneNumber"
                    />
                    <div className="text-danger text-capitalize">
                      {formik.touched.phoneNumber && formik.errors.phoneNumber}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password">كلمة المرور</label>
                    <input
                      type="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="password"
                    />
                    <div className="text-danger text-capitalize">
                      {formik.touched.password && formik.errors.password}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ConfirmPassword">تأكيد كلمة المرور </label>
                    <input
                      type="password"
                      id="ConfirmPassword"
                      value={formik.values.passwordConfirm}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="passwordConfirm"
                    />
                    <div className="text-danger text-capitalize">
                      {formik.touched.passwordConfirm &&
                        formik.errors.passwordConfirm}
                    </div>
                  </div>
                </div>
              </div>
              <div className={buttonParent}>
                <button type="submit"> انشاء حساب جديد</button>
              </div>
            </form>
            <div className={footerRegister}>
              <span>لديك حساب بالفعل؟</span>
              <Link to={"/login"}> تسجيل الدخول</Link>
            </div>
          </div>
        </div>
      </div>
      <div className={conImg}>
        <img src="../../../src/assets/Doctors-pana.png" alt="" />
      </div>
    </motion.div>
  );
}
