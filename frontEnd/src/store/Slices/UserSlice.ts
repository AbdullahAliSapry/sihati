import { createSlice } from "@reduxjs/toolkit";
import { ApiResponseToAllAppointmentsUser } from "../../utils/Interfces";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  __v: number;
  confirmed: boolean;
}

interface Examination {
  diagnosis: string;
  prescription: string;
  patientAge: string;
  patientName: string;
  date: string;
  patientAddress: string;
}

interface Person {
  _id: string;
  name: string;
  email: string;
  status: string;
}
// email: "abdullah@gmail.com";
// name: "Abdullah";
// phoneNumber: "01270843652";
// photo: "https://res.cloudinary.com/dtk7ufofp/image/upload/v1717974296/oqsmr4xbaynfhaocpmc1.png";
// _id:
interface IDoctor {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  phoneNumber: string;
}

interface Appointment {
  examination?: Examination;
  _id: string;
  patient: Person;
  doctor: IDoctor;
  date: string;
  status: string;
  __v: number;
}

interface Data {
  user: User;
  appointments: Appointment[];
}

interface ScheduleData {
  status: string;
  data: {
    scheduleStart: string;
    scheduleEnd: string;
    scheduleInterval: number;
    appointments: string[];
  };
}

interface ApiResponse {
  status: string;
  data: Data | null;
  message: string | null;
  dataAppointments: ScheduleData | null;
  appointmentsUser: ApiResponseToAllAppointmentsUser | null;
}

const initialState: ApiResponse = {
  status: "",
  data: null,
  message: "",
  dataAppointments: null,
  appointmentsUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.data = action.payload.data;
      state.status = action.payload.status;
    },
    AddAppointment: (state, action) => {
      state.message = action.payload;
    },
    getAllAppointments: (state, action) => {
      state.dataAppointments = action.payload;
    },
    getAllAppointmentsUser: (state, action) => {
      state.appointmentsUser = action.payload;
    },
  },
});

export const {
  getUser,
  getAllAppointments,
  AddAppointment,
  getAllAppointmentsUser,
} = userSlice.actions;

export default userSlice.reducer;
