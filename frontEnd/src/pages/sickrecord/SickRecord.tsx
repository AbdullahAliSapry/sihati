import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { Link, useParams } from "react-router-dom";
import { getSickRecordApi } from "../../store/api/DoctorApi";
import styles from "../AppointmentToDoctors/AppointmentDoctor.module.css";

const {
  buttonContainer,
  btnCheck,
  Btnsuccess,
  BtneError,
  styleMakeFinsh,
  StyleLink,
} = styles;
export default function SickRecord() {
  const dispatch = useDispatch<AppDispatch>();
  const { idAppointment } = useParams();
  const { SeckRecordData } = useSelector((state: RootState) => state.Doctor);
  useEffect(() => {
    if (!idAppointment) return;
    dispatch(getSickRecordApi(idAppointment));
  }, []);
  console.log(SeckRecordData);

  return (
    <>
      <div className="my-5">
        <div className="col-md-10">
          <table className="table table-hover">
            <thead className="bg">
              <tr style={{ fontSize: "20px", fontWeight: 600 }}>
                <td style={{ color: "white" }} className="le">
                  الاسم
                </td>
                <td style={{ color: "white" }}> التاريخ</td>
                <td style={{ color: "white" }}>موقف الحاله</td>
                <td style={{ color: "white" }}>الحاله</td>
              </tr>
            </thead>
            <tbody>
              {SeckRecordData?.data.appointments.map((item) =>
                item.status !== "rejected" ? (
                  <tr
                    key={item._id}
                    style={{ fontSize: "20px", fontWeight: 600 }}>
                    <td style={{ color: "rgb(88, 85, 85)" }}>
                      {item.patient.name}
                    </td>
                    <td style={{ color: "rgb(88, 85, 85)" }}>
                      {item.examination &&
                        new Date(
                          item.examination.date.toString()
                        ).toDateString()}
                    </td>
                    <td style={{ color: "rgb(88, 85, 85)" }}>{item.status}</td>
                    <td style={{ color: "rgb(88, 85, 85)" }}>
                      <Link
                        className={StyleLink}
                        to={`/doctors/Prescription-seek/${item._id}`}>
                        رؤيه الروشته
                      </Link>
                    </td>
                  </tr>
                ) : (
                  ""
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
