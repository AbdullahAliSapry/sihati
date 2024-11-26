import { Link } from "react-router-dom";
import styles from "./Specialists.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/Store";
import { useEffect } from "react";
import { getAllData } from "../../../store/api/SpecialtieApi";

const { parentStyle, title, linkSpeStyle, imgStyle } = styles;

export default function Specialists() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.Specialists);

  useEffect(() => {
    dispatch(getAllData());
  }, []);

  return (
    <div className={parentStyle}>
      <div className={title}>التخصصات</div>
      <div className={imgStyle}>
        <img src="../../../../src/assets/img2.png" alt="" />
      </div>
      <div className={linkSpeStyle}>
        {data?.data.departments.map(( item , index) => (
          <Link to={`/specialized-doctors/${item}`} key={index}>
            {" "}
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
