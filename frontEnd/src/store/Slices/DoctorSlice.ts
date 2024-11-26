import { createSlice } from "@reduxjs/toolkit";
import {
  ApiResponseToAllAppointmentsUser,
  Appointment,
} from "../../utils/Interfces";

// department: "القلب";
// email: "doctoraaaaa@gmail.com";
// location: "سوهاج";
// name: "doctor";
// phoneNumber: "default.png";
// photo: "default.png";
// role: "doctor";
// scheduleEnd: 1020;
// scheduleInterval: 30;
// scheduleStart: 720;
// __v: 0;
// _id: "66634861f93c3c596cc6986d";
export interface IDoctor {
  department: string;
  email: string;
  location: string;
  name: string;
  phoneNumber: string;
  photo: string;
  role: string;
  scheduleEnd: number;
  scheduleInterval: number;
  scheduleStart: number;
  __v: number;
  _id: string;
  summary?: string;
  clinic?: string;
}

interface IData {
  status: string;
  data: {
    doctor: IDoctor;
  };
}

// data from
interface Examination {
  diagnosis: string;
  prescription: string;
  patientAge: string;
  patientName: string;
  patientAddress: string;
  date: string;
}

interface Data {
  appointments: Appointment[];
}

// getSickRecord;
interface ISickRecord {
  status: string;
  data: Data;
}

interface IinitialState {
  data: IData | null;
  examinationAllData: ApiResponseToAllAppointmentsUser | null;
  SeckRecordData: ISickRecord | null;
}

const initialState: IinitialState = {
  data: null,
  examinationAllData: null,
  SeckRecordData: null,
};

const DoctorSlice = createSlice({
  name: "Specialties",
  initialState,
  reducers: {
    getDoctor: (state, action) => {
      state.data = action.payload;
    },
    getAppointMentsToDoctors: (state, action) => {
      state.examinationAllData = action.payload;
    },
    MakeAppointMentExcepted: (state, action) => {
      if (!state.examinationAllData?.data.appointments) return;
      state.examinationAllData.data.appointments =
        state.examinationAllData?.data.appointments.map((appointment) => {
          if (appointment._id === action.payload._id) {
            return action.payload;
          }
          return appointment;
        });
    },
    rejectAppointMent: (state, action) => {
      if (!state.examinationAllData?.data.appointments) return;
      state.examinationAllData.data.appointments =
        state.examinationAllData?.data.appointments.filter((appointment) => {
          if (appointment._id === action.payload._id) {
            return false;
          }
          return true;
        });
    },
    makeAppointmentFinished: (state, action) => {
      if (!state.examinationAllData?.data.appointments) return;
      console.log(action.payload);
    },
    UpdateDoctor: (state, action) => {
      if (!state.data?.data.doctor) return;
      state.data.data.doctor = action.payload;
    },
    UpdateDoctorImageSlice: (state, action) => {
      if (!state.data?.data.doctor) return;
      state.data.data.doctor.photo = action.payload;
    },
    getSeekRecord: (state, action) => {
      state.SeckRecordData = action.payload;
    },
  },
});

export const {
  getDoctor,
  getAppointMentsToDoctors,
  MakeAppointMentExcepted,
  rejectAppointMent,
  makeAppointmentFinished,
  UpdateDoctor,
  UpdateDoctorImageSlice,
  getSeekRecord,
} = DoctorSlice.actions;
export default DoctorSlice.reducer;
