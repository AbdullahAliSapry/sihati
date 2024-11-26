import { motion } from "framer-motion";
import styles from "./DetailsToDoctors.module.css";
import DoctorProfile from "./components/profile/DoctorProfile";
import Calendar from "./components/calendar/CalendarCom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { useEffect } from "react";
import { getDoctorById } from "../../store/api/DoctorApi";

const { parentSection, parentToTimes } = styles;
export default function DetailsToDoctors() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.Doctor);
  useEffect(() => {
    if (!id) return;
    dispatch(getDoctorById(id));
  }, []);

    console.log(data);
    
  return (
    <motion.div
      className={parentSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div
        style={{
          alignSelf: "center",
        }}
        className={parentToTimes}>
        <Calendar />
      </div>
      <div>{data && <DoctorProfile Doctor={data && data?.data.doctor} />}</div>
    </motion.div>
  );
}
