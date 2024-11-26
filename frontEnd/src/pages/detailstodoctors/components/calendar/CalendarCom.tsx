/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./Calendar.module.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";
import AppointmentsTime from "../Appointments-time/AppointmentsTime";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/Store";
import {
  AddAppointmentApi,
  getAppointmentsSaved,
} from "../../../../store/api/UserApi";
import { useParams } from "react-router-dom";
const { button1, parentToApp } = styles;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarCom() {
  const [value, setValue] = useState<Value>(new Date());
  const [availableTime, setavlibleTime] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { dataAppointments } = useSelector((state: RootState) => state.User);
  const { user } = useSelector((state: RootState) => state.Auth);

  const { id } = useParams();
  function compareDates(dateString1: string, dateString2: string) {
    // Convert both date strings to Date objects
    // Convert both date strings to Date objects
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    // Get the time value (in milliseconds) of both dates
    const time1 = date1.getTime();
    const time2 = date2.getTime();

    // Check if the time values are equal
    return time1 === time2;
  }

  const handlesubmit = () => {
    if (!user) {
      toast.error("من فضلك سجل الدخول اولا");
      return;
    }
    if (!value) {
      toast.error("من فضلك اختار تاريخ مناسب لك");
      return;
    }
    if (!availableTime) {
      toast.error("من فضلك اختار وقت محدد");
      return;
    }

    const newValue = new Date(value.toString()); // Example value
    // Parse availableTime string
    const parts = availableTime.split(":");
    let hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1].split(" ")[0]);
    const ampm = parts[1].split(" ")[1];

    // Adjust hours for PM
    if (ampm.toLowerCase() === "pm" && hours !== 12) {
      hours += 12;
    }

    // Set time in value
    newValue.setHours(hours);
    newValue.setMinutes(minutes);
    newValue.setHours(newValue.getHours());
    // Format the result as a date string
    const resultDateString =
      newValue.toDateString() + " " + newValue.toLocaleTimeString();
    if (
      dataAppointments?.data.appointments &&
      dataAppointments?.data.appointments.length > 0
    ) {
      if (
        dataAppointments?.data.appointments[0].toString() &&
        compareDates(
          dataAppointments?.data.appointments[0].toString(),
          resultDateString
        )
      ) {
        toast.error("هذا الميعاد محجوز مسبقا");
        return;
      }
    }

    Swal.fire({
      title: "تاكيد الحجز",
      text: "هل تريد تاكيد الحجز؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5CA385",
      cancelButtonColor: "#d33",
      confirmButtonText: "تاكيد",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!id) return;
        dispatch(AddAppointmentApi({ doctorId: id, date: resultDateString }));
        Swal.fire({
          title: "تم التاكيد",
          text: "من فضلك لا تتاخر علي ميعاد الخاص بك",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    if (!id) return;
    dispatch(getAppointmentsSaved(id));
  }, []);

  return (
    <div>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handlesubmit();
        }}>
        <div className={parentToApp}>
          <Calendar
            onChange={setValue}
            showDoubleView={false}
            view="month"
            value={value}
          />
          <div>
            <AppointmentsTime setAvilableTime={setavlibleTime} />
          </div>
        </div>
        <div>
          <button type="submit" className={button1}>
            حجز ميعاد
          </button>
        </div>
      </form>
    </div>
  );
}
