import * as Yup from "yup";

//   patientName: "",
//   patientAge: "",
//   patientAddress: "",
//   diagnosisDetails: "",
//   medicationDetails: "",

const PrescriptionDoctorSchema = Yup.object().shape({
  patientName: Yup.string().required("برجاء ادخال الاسم"),
  patientAge: Yup.number().required("عمر المريض مطلوب"),
  patientAddress: Yup.string().required("عنوان المريض مطلوب"),
  diagnosisDetails: Yup.string().required("التشخيص مطلوب"),
  medicationDetails: Yup.string().required("الأدوية مطلوبة"),
});

export default PrescriptionDoctorSchema;
