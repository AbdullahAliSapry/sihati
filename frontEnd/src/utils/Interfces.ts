// "name": "user10",
//     "email": "user10@gmail.com",
//     "password": "12345678",
//     "passwordConfirm": "12345678"

export interface IUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm:string;
}   


export interface IUserConfirmation {
   status: string;
   token: string;
   data: {
     user: {
       _id: string;
       name: string;
       email: string;
       role: string;
       __v: number;
       active: boolean;
     };
   };
 }


export interface DoctorData {
  name: string;
  email: string;
  specialization: string;
  phoneNumber: string;
  region: string;
  center: string;
  photo: string;
  _id: string;
  summary?: string;

}

export interface IDoctorConfirmation{

} 


interface Examination {
  diagnosis: string;
  prescription: string;
  patientAge: string;
  patientName: string;
  patientAddress: string;
  date: string;
}

interface Patient {
  _id: string;
  name: string;
  email: string;
}

interface Doctor {
  _id: string;
  name: string;
  email: string;
  photo: string;
  phoneNumber:string;
}

export interface Appointment {
  examination?: Examination;
  _id: string;
  patient: Patient;
  doctor: Doctor;
  date: string;
  status: string;
}

export interface ApiResponseToAllAppointmentsUser {
  status: string;
  results: number;
  data: {
    appointments: Appointment[];
  };
}