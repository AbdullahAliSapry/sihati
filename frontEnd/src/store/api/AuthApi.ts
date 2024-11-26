/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../../utils/Api";
import { IUser, IUserConfirmation } from "../../utils/Interfces";
import { toast } from "react-toastify";
import {
  Login,
  LoginDoctor,
  Register,
  RegisterDoctor,
  logout,
} from "../Slices/AuthSlice";
// doctos
export const AddNewUser = (NewUser: IUser) => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      const { data } = await Api.post("/users/signup", NewUser);
      toast.success("User signed in successfully");
      console.log(data);
      dispatch(Register(true));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};

export const LoginApi = (User: Omit<IUser, "name" | "passwordConfirm">) => {
  return async (dispatch: Dispatch<PayloadAction<IUserConfirmation>>) => {
    try {
      const { data } = await Api.post("/users/login", User);
      toast.success("تم تسجيل الدخول بنجاح");
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(Login(data));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};

export function logoutUser() {
  return (dispatch: Dispatch) => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    } else {
      localStorage.removeItem("userConfirmationDoctor");
    }

    dispatch(logout());
  };
}

// Auth To Doctors
// doctors

export const AddNewDoctor = (NewDoctor: FormData) => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      const { data } = await Api.post("/doctors/signup", NewDoctor, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Doctor signed in successfully Please login");
      dispatch(RegisterDoctor(true));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};

export const LoginApiDoctor = (email: string, password: string) => {
  return async (dispatch: Dispatch<PayloadAction<IUserConfirmation>>) => {
    try {
      const { data } = await Api.post("/doctors/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("userConfirmationDoctor", JSON.stringify(data));
      dispatch(LoginDoctor(data));
      toast.success("تم تسجيل الدخول بنجاح");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};
