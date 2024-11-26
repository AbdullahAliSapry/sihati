import { useEffect } from "react";
import styles from "./Profile.module.css";

import ModalToEdit from "../../components/ModalEdit/ModalToEdit";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { getUserById } from "../../store/api/UserApi";

const {
  card,
  consultationStyle,
  parentStyle,
  dataParent,
  title,
  detailsUser,
  ButtonStyle,
  parentToAllData,
  styleAppointments,
} = styles;

export default function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.User);
  useEffect(() => {
    if (!id) return;
    dispatch(getUserById(id));
  }, []);
  return (
    <div>
      <div className={`${parentStyle}`}>
        <div className={`${card} text-center`}>
          <span className={title}> صورة الملف الشخصي</span>
          <hr />
          <div>
            <img src="../../../src/images/default.png" alt="" />
          </div>
          <Link
            className={styleAppointments}
            to={`/appointments/users/${data?.user._id}`}>
            الحجوزات
          </Link>
          <div className={detailsUser}>
            <div>
              <span> {data?.user.name}</span>
              {/* <ModalToEdit
                typeToInput={"text"}
                lapel="ادخل الاسم الجديد "
                nameEdit="name"
                oldValue={`${data?.user.name}`}
              /> */}
            </div>
            <div>
              <span>{data?.user.email}</span>
              {/* <ModalToEdit
                typeToInput={"email"}
                lapel=" ادخل الايميل الجديد"
                nameEdit="email"
                oldValue={`${data?.user.email}`}
              /> */}
            </div>
          </div>
        </div>
        <div className={`${consultationStyle} text-center`}>
          <p
            style={{
              fontSize: "33px",
              fontWeight: 600,
              color: "rgb(41, 130, 118)",
            }}>
            الاستشارات الطبية
          </p>
          <hr />
          <div className={parentToAllData}>
            {data?.appointments.map((item, index) => {
              console.log(item);
              return (
                <div className={dataParent} key={index}>
                  <span>{item.doctor.name}</span>
                  <div>
                    {item.status === "finished" ? (
                      <Link
                        className={ButtonStyle}
                        to={`/users/Prescription/${id}/${item._id}`}>
                        عرض الاستشاره
                      </Link>
                    ) : item.status === "rejected" ? (
                      <button className={ButtonStyle}>تم الرفض  </button>
                    ) : (
                      <button className={ButtonStyle}>لا توجد استشاره </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
