import { createSlice } from "@reduxjs/toolkit";
import { IUserConfirmation } from "../../utils/Interfces";

interface IUserConfirmationDoctor {
  status: string;
  token: string;
  data: {
    user: {
      confirmed: boolean;
      department: string;
      email: string;
      idCard: string;
      location: string;
      name: string;
      phoneNumber: string;
      photo: string;
      role: string;
      scheduleEnd: string;
      scheduleInterval: number;
      scheduleStart: string;
      __v: number;
      _id: string;
    };
  };
}

interface IAuthState {
  isRegistered: boolean;
  user: IUserConfirmation | null;
  isDoctor: boolean;
  userConfirmationDoctor: IUserConfirmationDoctor | null;
}

const storedData: string = localStorage.getItem("user")!;
const storedDataDoctor: string = localStorage.getItem(
  "userConfirmationDoctor"
)!;

const initialState: IAuthState = {
  isRegistered: false,
  user: storedData ? JSON.parse(storedData) : null,
  isDoctor: false,
  userConfirmationDoctor: storedDataDoctor
    ? JSON.parse(storedDataDoctor)
    : null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Register: (state, action) => {
      state.isRegistered = action.payload;
    },
    Login: (state, action) => {
      state.isRegistered = false;
      state.user = action.payload;
    },
    RegisterDoctor: (state, action) => {
      state.isDoctor = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.userConfirmationDoctor = null;
      state.isDoctor = true;
    },
    LoginDoctor: (state, action) => {
      state.userConfirmationDoctor = action.payload;
    },
  },
});

export const { Register, Login, logout, RegisterDoctor, LoginDoctor } =
  AuthSlice.actions;
export default AuthSlice.reducer;
