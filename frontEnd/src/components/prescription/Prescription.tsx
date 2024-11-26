import React, { useEffect } from "react";
import Styles from "./Prescription.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { getUserById } from "../../store/api/UserApi";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Prescription() {
  const isDoctor = false;

  const handleEdit = () => {
    const inputs = document.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >(
      `.${patientInfo} input, .${diagnosisInfo} textarea, .${medicationInfo} textarea`
    );
    inputs.forEach((input) => {
      input.disabled = !input.disabled;
    });
  };

  const handlePrint = () => {
    window.print();
  };
  const dispatch = useDispatch<AppDispatch>();
  const { id, idUser } = useParams();
  const { data } = useSelector((state: RootState) => state.User);
  useEffect(() => {
    if (!idUser) return;
    dispatch(getUserById(idUser));
  }, []);

  if (!id) return;
  const dataToUser = data?.appointments.filter(
    (appointment) => appointment._id == id
  );

  return (
    <div className={prescriptionContainer}>
      <div className={header}>
        <div className={headerRight}>
          <h1>{dataToUser?.[0].doctor.name}</h1>
          <p>{dataToUser?.[0].doctor.email}</p>
          <p>مدرس الأنف والأذن والحنجرة كلية الطب - جامعة سوهاج</p>
          <p>الكشف وإجراء العمليات الجراحية باستخدام المناظير</p>
        </div>
      </div>
      <div className={patientInfo}>
        <div>
          <label htmlFor="patient-name">الاسم:</label>
          <input
            type="text"
            id="patient-name"
            disabled
            placeholder="أدخل اسمك"
            value={dataToUser?.[0].patient.name}
          />
        </div>
        <div>
          <label htmlFor="patient-age">السن:</label>
          <input
            type="text"
            id="patient-age"
            disabled
            placeholder="أدخل السن"
            value={dataToUser?.[0].examination?.patientAge}
          />
        </div>
        <div>
          <label htmlFor="patient-address">العنوان:</label>
          <input
            type="text"
            id="patient-address"
            disabled
            placeholder="أدخل العنوان"
            value={
              dataToUser?.[0].examination?.patientAddress
                ? dataToUser?.[0].examination?.patientAddress
                : ""
            }
          />
        </div>
        <div>
          <label htmlFor="prescription-date">التاريخ:</label>
          <input
            type="text"
            id="prescription-date"
            disabled
            value={
              dataToUser && dataToUser[0] && dataToUser[0].examination
                ? new Date(dataToUser[0].examination?.date).toDateString()
                : ""
            }
          />
        </div>
      </div>
      <div className={diagnosisInfo}>
        <label htmlFor="diagnosis-details">التشخيص:</label>
        <textarea
          id="diagnosis-details"
          value={`${
            dataToUser?.[0].examination?.diagnosis
              ? dataToUser?.[0].examination?.diagnosis
              : "لاتوجد استشاره بعد"
          }`}
          disabled></textarea>
      </div>
      <div className={medicationInfo}>
        <label htmlFor="medication-details">العلاج:</label>
        <textarea
          id="medication-details"
          value={`${
            dataToUser?.[0].examination?.prescription
              ? dataToUser?.[0].examination?.prescription
              : "لاتوجد استشاره بعد"
          }`}
          disabled>
          ℞
        </textarea>
      </div>
      <div className={footer}>
        <div>{dataToUser?.[0].doctor.name}</div>
        <div> الصوامعه شرق برج ال البيت </div>
        <div className={contactInfo}>
          <div>
            <img
              src="../../../src/images/icon2.png"
              alt="Phone Icon"
              width="16"
            />
            <span>{dataToUser?.[0].doctor.phoneNumber}</span>
          </div>
        </div>
      </div>
      <div className={buttons}>
        <button id="print-button" onClick={handlePrint}>
          طباعة
        </button>

        {isDoctor && (
          <button id="edit-button" onClick={handleEdit}>
            تعديل
          </button>
        )}
      </div>
    </div>
  );
}

export default Prescription;
