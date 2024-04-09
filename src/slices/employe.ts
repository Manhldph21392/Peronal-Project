import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface IEmployeeInfomation {
    name: string,
    home_address_1: string,
    gender: number,
    id: string,
    mother_name: string,
    dob: string,
    pob: string,
    ktp_no: string,
    taxId: number,
    home_address_2: string,
    mobile_no: number,
    tel_no: number,
    marriage_id: number,
    bank_account_no: number,
    card_number: number,
    bank_name: string,
    family_card_number: number,
    safety_insurance_no: string,
    health_insurance_no: string,
    education_background: string,
    emergency_name: string,
    emergency_relationship: string,
    emergency_contract: string,

}
interface IContractInfomation {
    contract_start_date: string,
    type: number,
    contract_date_from: string,
    contract_date_to: string,
    contract_from_extension: string,
    contract_to_extension: string,
    contract_date: string,
    contract_name: string,
}
interface IEmploymentDetails {
    department_id: number,
    position_id: number,
    hidden_on_payroll: string
}
interface ISalaryWages {
    salary: number,
    basic_audit: number,
    satefy_insurance: number,
    health_insurance: number,
    meal_allowance: number,
}
interface IOther {
    grade: number,
    remark: string,
    benefits: [],
}

interface IInitialState {
    employeeInfomation: IEmployeeInfomation,
    contractInfomation: IContractInfomation,
    employmentDetails: IEmploymentDetails,
    salaryWages: ISalaryWages,
    other: IOther,
}

export const initialState: IInitialState = {
    employeeInfomation: {} as IEmployeeInfomation,
    contractInfomation: {} as IContractInfomation,
    employmentDetails: {} as IEmploymentDetails,
    salaryWages: {} as ISalaryWages,
    other: {} as IOther,
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
        },
    }
})

export const { updateEmployeeInfomation, updateContractInfomation, updateEmploymentDetails, updateSalaryWages, updateOther } = employeeSlice.actions

export default employeeSlice.reducer