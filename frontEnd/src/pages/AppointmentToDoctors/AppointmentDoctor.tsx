import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./AppointmentDoctor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import {
  DeleteAppointMentApi,
  ExceptAppointMent,
  getAllAppointmentsToDoctor,
} from "../../store/api/DoctorApi";
import Swal from "sweetalert2";

const {
  buttonContainer,
  btnCheck,
  Btnsuccess,
  BtneError,
  styleMakeFinsh,
  StyleLink,
} = styles;

interface doctorObject {
  name: string;
  phone: string;
  img: string;
  Specialist: string;
}

export default function AppointmentDoctor() {
  const dispatch = useDispatch<AppDispatch>();
  const { doctorId } = useParams();

  const { examinationAllData } = useSelector(
    (state: RootState) => state.Doctor
  );
  useEffect(() => {
    if (!doctorId) return;
    dispatch(getAllAppointmentsToDoctor(doctorId));
  }, []);

  const handleExcept = (appointMentId: string, namePtient: string) => {
    Swal.fire({
      title: "تاكيد الحجز",
      text: `هل تريد تاكيد حجز ${namePtient}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5CA385",
      cancelButtonColor: "#d33",
      confirmButtonText: "تاكيد",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!appointMentId) return;
        dispatch(ExceptAppointMent(appointMentId));
        Swal.fire({
          title: "تم التاكيد",
          icon: "success",
        });
      }
    });
  };

  const handleReject = (appointMentId: string, namePtient: string) => {
    Swal.fire({
      title: "رفض الحجز",
      text: `هل تريد رفض حجز ${namePtient}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5CA385",
      cancelButtonColor: "#d33",
      confirmButtonText: "تاكيد",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!appointMentId) return;
        dispatch(DeleteAppointMentApi(appointMentId));
        Swal.fire({
          title: "تم الرفض",
          icon: "success",
        });
      }
    });
  };

  const navigate = useNavigate();
  const handleFinished = (appointMentId: string, namePtient: string) => {
    Swal.fire({
      title: " كتابه روشته",
      text: ` تريد  كتابه روشته لل ${namePtient}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5CA385",
      cancelButtonColor: "#d33",
      confirmButtonText: "تاكيد",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!appointMentId) return;
        //dispatch(DeleteAppointMentApi(appointMentId));
        navigate(`/doctors/Prescription/${appointMentId}`);
      }
    });
  };
  return (
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
              <td style={{ color: "white" }} className="ri">
                السجل المرضي للمريض
              </td>
            </tr>
          </thead>
          <tbody>
            {examinationAllData?.data.appointments.map((item) =>
              item.status !== "rejected" ? (
                <tr
                  key={item._id}
                  style={{ fontSize: "20px", fontWeight: 600 }}>
                  <td style={{ color: "rgb(88, 85, 85)" }}>
                    {item.patient.name}
                  </td>
                  <td style={{ color: "rgb(88, 85, 85)" }}>
                    {new Date(item.date).toDateString()}
                  </td>
                  <td style={{ color: "rgb(88, 85, 85)" }}>{item.status}</td>
                  <td>
                    <div className={buttonContainer}>
                      {item.status === "not finished" ? (
                        <>
                          <button
                            className={styleMakeFinsh}
                            onClick={() => {
                              handleFinished(item._id, item.patient.name);
                            }}>
                            finish
                          </button>
                          <button
                            className={`${btnCheck} ${BtneError}`}
                            onClick={() => {
                              handleReject(item._id, item.patient.name);
                            }}>
                            <i className="bi bi-x"></i>
                          </button>
                        </>
                      ) : item.status == "finished" ? (
                        ""
                      ) : (
                        <>
                          <button
                            className={`${btnCheck} ${BtneError}`}
                            onClick={() => {
                              handleReject(item._id, item.patient.name);
                            }}>
                            <i className="bi bi-x"></i>
                          </button>
                          <button
                            className={`${btnCheck} ${Btnsuccess}`}
                            onClick={() => {
                              handleExcept(item._id, item.patient.name);
                            }}>
                            <i className="bi bi-check"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                  <td style={{ color: "rgb(88, 85, 85)" }}>
                    <Link className={StyleLink} to={`/sick-record/${item.patient._id}`}>
                      رؤيه السجل المرضي{" "}
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
  );
}
