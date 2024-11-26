import { useDispatch, useSelector } from "react-redux";
import styles from "../NavBar.module.css";
import { AppDispatch, RootState } from "../../../store/Store";

const { navbarLeft, doctorImage, doctorName } = styles;
export default function PersonalData() {
  const { user, userConfirmationDoctor } = useSelector(
    (state: RootState) => state.Auth
  );
  const { data } = useSelector((state: RootState) => state.Doctor);

  
  return (
    <>
      {user ? (
        <>
          <div className={navbarLeft}>
            <img
              src="../../../../src/images/default.png"
              alt="Doctor Image"
              className={doctorImage}
            />
            <span className={doctorName}>{user.data.user.name}</span>
          </div>
        </>
      ) : userConfirmationDoctor ? (
        <div className={navbarLeft}>
          <img
            src={`${userConfirmationDoctor.data.user.photo}`}
            alt="Doctor Image"
            className={doctorImage}
          />
          <span className={doctorName}>
            Dr/ {userConfirmationDoctor.data.user.name}
          </span>
        </div>
      ) : (
        <>
          <div className="d-flex align-items-center gap-2">
            <h2 className="fs-4 m-0">1005-346-272</h2>
            <i className="bi bi-telephone-fill"></i>
          </div>
        </>
      )}
    </>
  );
}
