import React, { useEffect } from "react";
import Styles from "../prescriptiondoctor/PrescriptionDoctor.module.css"
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
function PrescriptionDoctorSeeckRicord() {
  const { SeckRecordData } = useSelector((state: RootState) => state.Doctor);
  const { id } = useParams();
  const RecordDataToElement = SeckRecordData?.data.appointments.filter(
    (e) => e._id == id
  );
  console.log(id);

  console.log(RecordDataToElement);

  const handlePrint = () => {
    window.print();
  };
  return (
    <div className={prescriptionContainer}>
      <div className={header}>
        <div className={headerRight}>
          <h1>{RecordDataToElement?.[0].doctor.name}</h1>
          <p>{RecordDataToElement?.[0].doctor.email}</p>
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
            value={RecordDataToElement?.[0].examination?.patientName}
          />
        </div>
        <div>
          <label htmlFor="patient-age">السن:</label>
          <input
            type="text"
            id="patient-age"
            disabled
            placeholder="أدخل السن"
            value={RecordDataToElement?.[0].examination?.patientAge}
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
              RecordDataToElement?.[0].examination?.patientAddress
                ? RecordDataToElement?.[0].examination?.patientAddress
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
              RecordDataToElement &&
              RecordDataToElement[0] &&
              RecordDataToElement[0].examination
                ? new Date(
                    RecordDataToElement[0].examination?.date
                  ).toDateString()
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
            RecordDataToElement?.[0].examination?.diagnosis
              ? RecordDataToElement?.[0].examination?.diagnosis
              : "لاتوجد استشاره بعد"
          }`}
          disabled></textarea>
      </div>
      <div className={medicationInfo}>
        <label htmlFor="medication-details">العلاج:</label>
        <textarea
          id="medication-details"
          value={`${
            RecordDataToElement?.[0].examination?.prescription
              ? RecordDataToElement?.[0].examination?.prescription
              : "لاتوجد استشاره بعد"
          }`}
          disabled>
          ℞
        </textarea>
      </div>
      <div className={footer}>
        <div>{RecordDataToElement?.[0].doctor.name}</div>
        <div> الصوامعه شرق برج ال البيت </div>
        <div className={contactInfo}>
          <div>
            <img
              src="../../../src/images/icon2.png"
              alt="Phone Icon"
              width="16"
            />
            <span>{RecordDataToElement?.[0].doctor.phoneNumber}</span>
          </div>
        </div>
      </div>
      <div className={buttons}>
        <button id="print-button" onClick={handlePrint}>
          طباعة
        </button>
      </div>
    </div>
  );
}

export default PrescriptionDoctorSeeckRicord;
