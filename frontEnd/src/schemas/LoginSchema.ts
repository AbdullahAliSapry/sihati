import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("برجاء ادخال الايميل").email("الايميل غير صحيح"),
  password: Yup.string()
    .required("برجاء ادخال الباسورد")
    .min(6, "الباسورد لا يجب ان يقل عم 6 حروف"),
  isdoctor: Yup.boolean(),
});

export default LoginSchema;

export const ResetPasswordSchema = Yup.object().shape({
  Email: Yup.string()
    .required(" برجاء ادخال الايميل ")
    .email("الايميل غير صحصح  "),
  NewPassword: Yup.string()
    .required("برجاء ادخال كلمه السر  ")
    .min(6, " الباسورد لايجب ان تقل علي 6 احرف "),

  ConfirmPassword: Yup.string()
    .required("برجاء تأكيد الباسورد")
    .oneOf([Yup.ref("NewPassword")], " الباسورد لا تطابق"),
});
