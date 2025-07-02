import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ICompanyData {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  taxNumber: string;
}

const initialState: ICompanyData = {
  name: "",
  address: "",
  city: "",
  postalCode: "",
  taxNumber: "",
};

const companySlice = createSlice({
  name: "companyData",
  initialState,
  reducers: {
    addCompanyName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    addCompanyAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    addCompanyCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    addCompanyPostalCode(state, action: PayloadAction<string>) {
      state.postalCode = action.payload;
    },
    addCompanyTaxNumber(state, action: PayloadAction<string>) {
      state.taxNumber = action.payload;
    },
    resetCompanyData() {
      return initialState;
    },
  },
});

export const {
  addCompanyName,
  addCompanyAddress,
  addCompanyCity,
  addCompanyPostalCode,
  addCompanyTaxNumber,
  resetCompanyData,
} = companySlice.actions;

export default companySlice.reducer;

export const getCompanyData = (state: { companyData: ICompanyData }) =>
  state.companyData;
