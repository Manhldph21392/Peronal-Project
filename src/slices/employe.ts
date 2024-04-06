import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IEmployeeInfomation {
    name: string,
    email: string,
    phone: string,
    birthday: string,
    address1: string,
    gender: string ,
    id: string,
    motherName: string,
    dateofBirth: string,
    placeofBirth: string,
    ktpNo: string,
    taxId: string,
    address2: string,
    mobileNo: string,
    telNo: string,
    maritalStatus: string,
    bankCardNo: string,
    bankAccount: string,
    bankName: string,
    familyCardNumber: string,
    safetyInsurance: string,
    healthInsurance: string,
    backgroundEducation: string,
}
interface IContractInfomation {
    position: string,
    department: string,
    salary: string,
    benefits: [],
}
interface IEmploymentDetails {
    startDate: string,
    endDate: string,
    id: string,
}
interface ISalaryWages {
    salary: string,
    benefits: [],
}
interface IOther {
    [key: string]: any,
}

interface IInitialState {
    employeeInfomation: IEmployeeInfomation,
    contractInfomation: IContractInfomation,
    employmentDetails: IEmploymentDetails,
    salaryWages: ISalaryWages,
    other: IOther,
}

export const initialState: IInitialState = {
    employeeInfomation: {
        name: "",
        email: "",
        phone: "",
        birthday: "",
        address1: "",
        gender: "",
        id: "",
        motherName: "",
        dateofBirth: "",
        placeofBirth: "",
        ktpNo: "",
        taxId: "",
        address2: "",
        mobileNo: "",
        telNo: "",
        maritalStatus: "",
        bankCardNo: "",
        bankAccount: "",
        bankName: "",
        familyCardNumber: "",
        safetyInsurance: "",
        healthInsurance: "",
        backgroundEducation: "",
        
    },
    contractInfomation: {
        position: "",
        department: "",
        salary: "",
        benefits: [],
    },
    employmentDetails: {
        startDate: "",
        endDate: "",
        id: "",
    },
    salaryWages: {
        salary: "",
        benefits: [],
    },
    other: {},
}
export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        updateEmployeeInfomation: (state, action: PayloadAction<IEmployeeInfomation>) => {
            state.employeeInfomation = action.payload
        },
        updateContractInfomation: (state, action: PayloadAction<IContractInfomation>) => {
            state.contractInfomation = action.payload
        },
        updateEmploymentDetails: (state, action: PayloadAction<IEmploymentDetails>) => {
            state.employmentDetails = action.payload
        },
        updateSalaryWages: (state, action: PayloadAction<ISalaryWages>) => {
            state.salaryWages = action.payload
        },
        updateOther: (state, action: PayloadAction<IOther>) => {
            state.other = action.payload
        }
    }
})
export const { updateEmployeeInfomation, updateContractInfomation, updateEmploymentDetails, updateSalaryWages, updateOther } = employeeSlice.actions
export default employeeSlice.reducer