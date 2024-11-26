import { useNavigate, useParams } from "react-router-dom";
import Styles from "./PrescriptionDoctor.module.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import PrescriptionDoctorSchema from "../../schemas/DoctorSchema";
import Swal from "sweetalert2";
import { MakeAppointMentApi } from "../../store/api/DoctorApi";

const {
  prescriptionContainer,
  header,
  headerRight,
  patientInfo,
  diagnosisInfo,
  medicationInfo,
  footer,
  contactInfo,
  buttons,
} = Styles;

function PrescriptionDoctor() {
  const { idAppointment } = useParams();
  const { userConfirmationDoctor } = useSelector(
    (state: RootState) => state.Auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // Use useFormik for form handling
  const formik = useFormik({
    initialValues: {
      patientName: "",
      patientAge: "",
      patientAddress: "",
      diagnosisDetails: "",
      medicationDetails: "",
    },
    validationSchema: PrescriptionDoctorSchema,
    onSubmit: (values) => {
      //   id: string,
      // prescription: string,
      // name: string,
      // address: string,
      // diagnosis: string
      Swal.fire({
        title: "ارسال الروشته ",
        text: `هل تريد ارسال الروشته؟`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#5CA385",
        cancelButtonColor: "#d33",
        confirmButtonText: "تاكيد",
        cancelButtonText: "إلغاء",
      }).then((result) => {
        if (result.isConfirmed) {
          if (!idAppointment) return;
          dispatch(
            MakeAppointMentApi(
              idAppointment,
              values.medicationDetails,
              values.patientName,
              values.patientAddress,
              values.medicationDetails
            )
          );
          Swal.fire({
            title: "تم ارسال الروشته",
            icon: "success",
          });
          navigate(`/appointment/doctors/${idAppointment}`);
        }
      });
    },
  });

  return (
    <div className={prescriptionContainer}>
      <div className={header}>
        <div className={headerRight}>
          <h1>{userConfirmationDoctor?.data.user.name}</h1>
          <p>kkk</p>
          <p>مدرس الأنف والأذن والحنجرة كلية الطب - جامعة سوهاج</p>
          <p>الكشف وإجراء العمليات الجراحية باستخدام المناظير</p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={patientInfo}>
          <div>
            <label htmlFor="patientName">الاسم:</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              placeholder="أدخل اسمك"
              value={formik.values.patientName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div>
            <label htmlFor="patientAge">السن:</label>
            <input
              type="text"
              id="patientAge"
              name="patientAge"
              placeholder="أدخل السن"
              value={formik.values.patientAge}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div>
            <label htmlFor="patientAddress">العنوان:</label>
            <input
              type="text"
              id="patientAddress"
              name="patientAddress"
              placeholder="أدخل العنوان"
              value={formik.values.patientAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className={diagnosisInfo}>
          <label htmlFor="diagnosisDetails">التشخيص:</label>
          <textarea
            id="diagnosisDetails"
            name="diagnosisDetails"
            value={formik.values.diagnosisDetails}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}></textarea>
        </div>
        <div className={medicationInfo}>
          <label htmlFor="medicationDetails">العلاج:</label>
          <textarea
            id="medicationDetails"
            name="medicationDetails"
            value={formik.values.medicationDetails}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}></textarea>
        </div>
        <div className={footer}>
          <div>{userConfirmationDoctor?.data.user.phoneNumber}</div>
          <div>
            سوهاج الصوامعه شرق برج ال البيت الدور السادس عياده الدكتور{" "}
            {userConfirmationDoctor?.data.user.name}
          </div>
          <div className={contactInfo}>
            <div>
              <img
                src="../../../src/images/icon2.png"
                alt="Phone Icon"
                width="16"
              />
              <span>{userConfirmationDoctor?.data.user.phoneNumber}</span>
            </div>
          </div>
        </div>
        <div className={buttons}>
          <button id="edit-button" type="submit">
            ارسال الروشته
          </button>
        </div>
      </form>
    </div>
  );
}

export default PrescriptionDoctor;
