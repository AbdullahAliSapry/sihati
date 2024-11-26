import { createSlice } from "@reduxjs/toolkit";


interface IDoctorsToSpecialties{
  status: string;
  results: number;
  data: {
    doctors: {
      department:string;
      email:string;
      name:string;
      photo:string;
      role:string;
      scheduleEnd:number;
      scheduleStart:number;
      _id:string;
    }[]; 
  };

}
interface IintilState {
  data: {
    message: string;
    data: {
      departments: string[];
      locations: string[];
    };
  } | null;
  SpecialistsToDepartment:IDoctorsToSpecialties | null;
}


const initialState: IintilState = {
  data: null,
  SpecialistsToDepartment:null,
};

const SpecialtiesSlice = createSlice({
  name: "Specialties",
  initialState,
  reducers: {
    getAllSpecialties: (state, action) => {
      state.data = action.payload;
    },
    getSpecialistsToDepartment: (state, action) => {
      state.SpecialistsToDepartment = action.payload;
    },
  },
});

export const { getAllSpecialties, getSpecialistsToDepartment } =
  SpecialtiesSlice.actions;
export default SpecialtiesSlice.reducer;
