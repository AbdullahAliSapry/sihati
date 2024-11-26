/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../../utils/Api";
import {
  getAllAppointments,
  getAllAppointmentsUser,
  getUser,
} from "../Slices/UserSlice";
import { toast } from "react-toastify";
import { RootState } from "../Store";

export const getUserById = (id: string) => {
  return async (
    dispatch: Dispatch<PayloadAction<boolean>>,
    getState: () => RootState
  ) => {
    try {
      const { data } = await Api.get(`/users/myData`, {
        headers: {
          Authorization: `Bearer ` + getState().Auth.user?.token,
        },
      });

      dispatch(getUser(data));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};

export const AddAppointmentApi = (obg: { date: string; doctorId: string }) => {
  return async (
    dispatch: Dispatch<PayloadAction<boolean>>,
    getState: () => RootState
  ) => {
    try {
      const { data } = await Api.post(
        `/users/requestAppointment`,
        { date: obg.date, doctor: obg.doctorId },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ` + getState().Auth.user?.token,
          },
        }
      );

      console.log(data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};

//{{URL}}/api/v1/doctors/6664920a6a382e11818e5ee6/availableAppointments
export const getAppointmentsSaved = (doctorId: string) => {
  return async (
    dispatch: Dispatch<PayloadAction<boolean>>,
    getState: () => RootState
  ) => {
    try {
      const { data } = await Api.get(
        `/doctors/${doctorId}/availableAppointments`,
        {
          headers: {
            Authorization: `Bearer ` + getState().Auth.user?.token,
          },
        }
      );
      dispatch(getAllAppointments(data));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};

export const getAllAppointmentsToUser = (id: string) => {
  return async (
    dispatch: Dispatch<PayloadAction<boolean>>,
    getState: () => RootState
  ) => {
    try {
      const { data } = await Api.get(`/users/myAppointments`, {
        headers: {
          Authorization: `Bearer ` + getState().Auth.user?.token,
        },
      });

      dispatch(getAllAppointmentsUser(data));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};
