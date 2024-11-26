import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Appointment.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { getAllAppointmentsToUser } from "../../store/api/UserApi";

const { BtnStyle } = styles;

export default function Appointment(){
  const [show, setShow] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams();
  const { appointmentsUser } = useSelector((state: RootState) => state.User);
  useEffect(() => {
    if (!userId) return;
    dispatch(getAllAppointmentsToUser(userId));
  }, []);

  return (
    <div>
      {" "}
      <div className="col-md-10">
        <table className="table table-hover">
          <thead className="bg">
            <tr style={{ fontSize: "20px", fontWeight: 600 }}>
              <td style={{ color: "white" }} className="le">
                الاسم
              </td>
              <td style={{ color: "white" }}> التاريخ</td>
              <td style={{ color: "white" }}>رقم الهاتف</td>
            </tr>
          </thead>
          <tbody>
            {appointmentsUser?.data.appointments.map((item, index) => (
              <tr key={index} style={{ fontSize: "20px", fontWeight: 600 }}>
                <td style={{ color: "rgb(88, 85, 85)" }}>{item.doctor.name}</td>
                <td style={{ color: "rgb(88, 85, 85)" }}>
                  {new Date(item.date).toDateString()}
                </td>
                <td style={{ color: "rgb(88, 85, 85)" }}>
                  {" "}
                  {item.doctor.phoneNumber
                    ? item.doctor.phoneNumber
                    : "رقم الهاتف غير موجود"}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
