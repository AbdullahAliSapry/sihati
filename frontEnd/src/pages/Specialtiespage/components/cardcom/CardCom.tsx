import { Link } from "react-router-dom";
import styles from "./CardCom.module.css";
import Rating from "../Rating/Rating";

const { parentStyle, imgStyle, nameStyle, styleButton, ratingStyle } = styles;
interface IDoctor {
  department: string;
  email: string;
  name: string;
  photo: string;
  role: string;
  scheduleEnd: number;
  scheduleStart: number;
  _id: string;
}
export default function CardCom({ Doctor }: { Doctor: IDoctor }) {
  return (
    <div className={parentStyle}>
      <div className={imgStyle}>
        <img src={`${Doctor.photo}`} alt="" />
      </div>

      <div className={nameStyle}>
        <span>{Doctor.name} </span>
        <span> {Doctor.department}</span>
      </div>
      <div className={styleButton}>
        <Link to={`/details-doctors/${Doctor._id}`}>
          <span>تفاصيل</span>
          <i className="bi bi-plus-lg"></i>
        </Link>
      </div>
      <div className={ratingStyle}>
        <Rating />
      </div>
    </div>
  );
}
