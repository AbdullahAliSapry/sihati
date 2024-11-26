import * as Yup from "yup";

const RegisterSchemaToUser = Yup.object().shape({
  name: Yup.string()
    .required("من فضلك ادخل اسم المستخدم")
    .min(4, "اسم المستخدم يجب الا يقل عن 6 احرف")
    .max(60),
  email: Yup.string()
    .required("من فضلك ادخل الايميل")
    .email("الايميل غير صحيح"),
  password: Yup.string().required(" برجاء ادخال الباسورد "),
  passwordConfirm: Yup.string()
    .required("برجاء تأكيد الباسورد")
    .min(6)
    .max(100)
    .oneOf([Yup.ref("password")], "الباسورد لا يتاطابق"),
});

export default RegisterSchemaToUser;

export const RegisterSchemaToDoctor = Yup.object().shape({
  name: Yup.string()
    .required("من فضلك ادخل اسم المستخدم")
    .min(4, "اسم المستخدم يجب الا يقل عن 6 احرف")
    .max(60),
  email: Yup.string()
    .required("من فضلك ادخل الايميل")
    .email("الايميل غير صحيح"),
  password: Yup.string().required("برجاء ادخال كلمة المرور"),
  passwordConfirm: Yup.string()
    .required("برجاء تأكيد الباسورد")
    .min(6)
    .max(100)
    .oneOf([Yup.ref("password")], "الباسورد لا يتاطابق"),
  specialization: Yup.string().required("من فضلك ادخل التخصص"),
  phoneNumber: Yup.string().required("من فضلك ادخل رقم الهاتف"),
  region: Yup.string().required("من فضلك ادخل المحافظه"),
  center: Yup.string().required("من فضلك ادخل المركز"),
  photo: Yup.mixed()
    .required("صوره البطاقه مطلوبه")
    .test("fileType", "ادخل صوره بطاقه صحيحه", (value) => {
      if (!value || !(value instanceof File)) return false;
      return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
    })
    .test("fileSize", "حجم الصوره كبير", (value) => {
      if (!value || !(value instanceof File)) return false;
      return value.size <= 5000000; // 5 MB limit
    }),
});
