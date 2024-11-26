/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../../utils/Api";
import { toast } from "react-toastify";
import {
  getAllSpecialties,
  getSpecialistsToDepartment,
} from "../Slices/SpecialtiesSlice";

// doctos
export const getAllData = () => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      const { data } = await Api.get("/doctors/departmentsAndLocations");
      dispatch(getAllSpecialties(data));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};

export const getAllDoctorsToSpecialist = (SpecialistName: string) => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      const { data } = await Api.get(`/doctors/?department=${SpecialistName}`);

      console.log(data);
      dispatch(getSpecialistsToDepartment(data));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};
