// DoctorProfile.tsx
import { Link } from "react-router-dom";
import { IDoctor } from "../../../../store/Slices/DoctorSlice";
import styles from "./DoctorProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/Store";
import EditDoctor from "./EditDoctor";
import { ChangeEvent } from "react";
import { useFormik } from "formik";
import { UpdateDoctorImage } from "../../../../store/api/DoctorApi";
import { toast } from "react-toastify";

export default function DoctorProfile({ Doctor }: { Doctor: IDoctor }) {
  const { userConfirmationDoctor } = useSelector(
    (state: RootState) => state.Auth
  );

  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      image: null,
    },
    onSubmit: (values) => {
      if (!values.image) {
        toast.error("يجب اختيار صوره");
        return;
      }
      const data = new FormData();
      data.append("photo", values.image);
      dispatch(UpdateDoctorImage(data));
    },
  });

  return (
    <div className={`${styles.profileSection}`}>
      <div className={styles.imgDiv}>
        <img
          src={`${
            formik.values.image
              ? URL.createObjectURL(formik.values.image)
              : `${Doctor.photo}`
          }`}
          alt=""
        />
        {userConfirmationDoctor?.data.user._id === Doctor._id && (
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="Image">
              {" "}
              <i className="bi bi-pencil-square"></i>
            </label>
            <input
              type="file"
              id="Image"
              hidden
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                  formik.setFieldValue("image", e.target.files[0]);
                }
              }}
            />
            <button type="submit"> تأكيد الصوره </button>
          </form>
        )}
        <div></div>
        {userConfirmationDoctor?.data.user._id === Doctor._id ? (
          <EditDoctor data={Doctor} />
        ) : (
          ""
        )}
      </div>
      <div className={styles.parentSec}>
        <div className={styles.detailsDiv}>
          <h3>
            اسم الطبيب:<span>{Doctor.name}</span>{" "}
          </h3>
          {userConfirmationDoctor?.data.user._id === Doctor._id ? (
            <Link
              to={`/appointment/doctors/${Doctor._id}`}
              className={styles.EditButton}>
              الذهاب للحجوزات
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className={styles.Specialists}>
          <h3>
            التخصص: <span> {Doctor.department}</span>
          </h3>
        </div>
        <div className={styles.Email}>
          {userConfirmationDoctor?.data.user._id === Doctor._id && (
            <h3>
              الإيميل: <span>{userConfirmationDoctor?.data.user.email}</span>
            </h3>
          )}
        </div>
        <div className={styles.Phone}>
          <h3>
            رقم الهاتف:<span>{Doctor.phoneNumber} </span>
          </h3>
        </div>
        <div className={styles.Phone}>
          <h3>
            العنوان:<span> {Doctor.location}</span>
          </h3>
        </div>
        {/* <div className={styles.Phone}>
          <h3>
            وقت العمل:<span> من ساعه الخامسه الي الساعه الثامنه</span>
          </h3>
        </div> */}
        <div className={styles.Phone}>
          <h3>
            مكان العياده بالتفصيل:
            <span>{Doctor.clinic ? Doctor.clinic : "لم يتم وضع مكان "}</span>
          </h3>
        </div>
      </div>
      <div className={styles.About}>
        <h3>
          عن الطبيب:
          <p>
            {" "}
            {Doctor.summary ? Doctor.summary : "لايوجد اي داتا حول هذا الدكتور"}
          </p>
        </h3>
      </div>
    </div>
  );
}
