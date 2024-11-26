/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Api } from "../../utils/Api";
import {
  MakeAppointMentExcepted,
  getAppointMentsToDoctors,
  getDoctor,
  rejectAppointMent,
  UpdateDoctor,
  UpdateDoctorImageSlice,
  getSeekRecord,
} from "../Slices/DoctorSlice";
import { RootState } from "../Store";

export const getDoctorById = (id: string) => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      const { data } = await Api.get(`/doctors/${id}`);

      dispatch(getDoctor(data));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};

//{{URL}}/api/v1/doctors/myAppointments

export const getAllAppointmentsToDoctor = () => {
  return async (
    dispatch: Dispatch<PayloadAction<boolean>>,
    getState: () => RootState
  ) => {
    try {
      const { data } = await Api.get(`/doctors/myAppointments`, {
        headers: {
          Authorization:
            `Bearer ` + getState().Auth.userConfirmationDoctor?.token,
        },
      });

      dispatch(getAppointMentsToDoctors(data));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};

export const ExceptAppointMent = (id: string) => {
  return async (
    dispatch: Dispatch<PayloadAction<boolean>>,
    getState: () => RootState
  ) => {
    console.log(id);

    try {
      const { data } = await Api.post(
        `/doctors/acceptAppointment`,
        { appointment: id },
        {
          headers: {
            Authorization:
              `Bearer ` + getState().Auth.userConfirmationDoctor?.token,
            "content-type": "application/json",
          },
        }
      );

      console.log(data);
      dispatch(MakeAppointMentExcepted(data.data.appointment));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};

export const DeleteAppointMentApi = (id: string) => {
  return async (
    dispatch: Dispatch<PayloadAction<boolean>>,
    getState: () => RootState
  ) => {
    console.log(id);

    try {
      const { data } = await Api.post(
        `/doctors/rejectAppointment`,
        { appointment: id },
        {
          headers: {
            Authorization:
              `Bearer ` + getState().Auth.userConfirmationDoctor?.token,
            "content-type": "application/json",
          },
        }
      );

      console.log(data);
      dispatch(rejectAppointMent(data.data.appointment));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};

export const MakeAppointMentApi = (
  id: string,
  prescription: string,
  name: string,
  address: string,
  diagnosis: string
) => {
  return async (
    dispatch: Dispatch<PayloadAction<boolean>>,
    getState: () => RootState
  ) => {
    try {
      const { data } = await Api.post(
        `/doctors/finishAppointment`,
        {
          appointment: id,
          prescription: prescription,
          patientName: name,
          patientAge: 20,
          diagnosis: diagnosis,
          patientAddress: address,
          date: new Date(Date.now()).toDateString(),
        },
        {
          headers: {
            Authorization:
              `Bearer ` + getState().Auth.userConfirmationDoctor?.token,
            "content-type": "application/json",
          },
        }
      );

      console.log(data);
      //dispatch(makeAppointment(data.data.appointment));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};

export const UpdateDataDoctor = (newData: any) => {
  return async (
    dispatch: Dispatch<PayloadAction<boolean>>,
    getState: () => RootState
  ) => {
    try {
      const { data } = await Api.patch(`/doctors/updateMe`, newData, {
        headers: {
          Authorization:
            `Bearer ` + getState().Auth.userConfirmationDoctor?.token,
          "content-type": "application/json",
        },
      });

      console.log(data);
      dispatch(UpdateDoctor(data.data.doctor));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};

export const UpdateDoctorImage = (Image: FormData) => {
  return async (
    dispatch: Dispatch<PayloadAction<boolean>>,
    getState: () => RootState
  ) => {
    try {
      const { data } = await Api.patch(`/doctors/updateMe`, Image, {
        headers: {
          Authorization:
            `Bearer ` + getState().Auth.userConfirmationDoctor?.token,
          "content-type": "multipart/form-data",
        },
      });
      dispatch(UpdateDoctorImageSlice(data.data.doctor.photo));
      toast.success("Image updated successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};

export const getSickRecordApi = (idPatient: string) => {
  return async (
    dispatch: Dispatch<PayloadAction<boolean>>,
    getState: () => RootState
  ) => {
    try {
      const { data } = await Api.get(
        `/doctors/${idPatient}/showMedicalHistory`,
        {
          headers: {
            Authorization:
              `Bearer ` + getState().Auth.userConfirmationDoctor?.token,
          },
        }
      );

      dispatch(getSeekRecord(data));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};
