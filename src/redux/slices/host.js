import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import * as api from '../../utils/axios';

const initialState = {
  listings: [],
  isLoading: false,
  error: false,
  bankAccount: [],
  inspections: [],
  remittance: {
    payments: [],
    earningThisMonth: null,
    totalEarning: null
  }
};

const slice = createSlice({
  initialState,
  name: 'host',
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getListingsSuccess(state, action) {
      state.isLoading = false;
      state.listings = action.payload;
    },
    removeListingSuccess(state, action) {
      state.isLoading = false;
      const removedListing = state.listings.filter((listing) => listing._id !== action.payload._id);
      state.listings = removedListing;
    },
    updateListingSuccess(state, action) {
      state.isLoading = false;
      const updatedListing = state.listings.map((listing) => {
        if (listing._id === action.payload._id) {
          return { ...listing, ...action.payload };
        }
        return listing;
      });
      state.listings = updatedListing;
    },
    getBankSuccess(state, action) {
      state.isLoading = false;
      state.bankAccount = action.payload;
    },
    addBankSuccess(state, action) {
      state.isLoading = false;
      state.bankAccount = [...state.bankAccount, action.payload];
    },
    updateBankSuccess(state, action) {
      state.isLoading = false;
      const updateBankAccount = state.bankAccount.map((bank) => {
        if (bank._id === action.payload._id) {
          return { ...bank, ...action.payload };
        }
        return bank;
      });
      state.bankAccount = updateBankAccount;
    },
    getInspectionsSuccess(state, action) {
      state.isLoading = false;
      state.inspections = action.payload;
    },
    remittanceSuccess(state, action) {
      state.isLoading = false;
      state.remittance = action.payload;
    }
  }
});

export default slice.reducer;

export const { getListingsSuccess, getBankSuccess, addBankSuccess } = slice.actions;

// -------------------------------------------------------
export function getListing() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await api.fetchHostListing();
      dispatch(slice.actions.getListingsSuccess(data.hostels));
    } catch (error) {
      dispatch(slice.actions.hasError(error.response.data.msg));
    }
  };
}
// -------------------------------------------------------
export function updateListing(values, id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await api.updateListing(values, id);
      dispatch(slice.actions.updateListingSuccess(data.hostel));
      toast.success('Listing updated successfully!');
    } catch (error) {
      dispatch(slice.actions.hasError(error.response.data.msg));
    }
  };
}
// -------------------------------------------------------
export function removeListing(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await api.deleteListing(id);
      dispatch(slice.actions.removeListingSuccess(data.hostel));
      toast.success('Listing removed!');
    } catch (error) {
      dispatch(slice.actions.hasError(error.response.data.msg));
    }
  };
}

// -------------------------------------------------------------------
export function getBanks() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await api.getBeneficiary();
      dispatch(slice.actions.getBankSuccess(data.beneficiary));
    } catch (error) {
      dispatch(slice.actions.hasError(error.response.data.msg));
    }
  };
}
export function addBank(values) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await api.addBeneficiary(values);
      dispatch(slice.actions.addBankSuccess(data.beneficiary));
      toast.success('Bank account details added successfully!');
    } catch (error) {
      dispatch(slice.actions.hasError(error.response.data.msg));
      toast.error('Something went wrong, check your internet!');
    }
  };
}

export const updateBankAccount = (values) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const { data } = await api.updateBeneficiary(values);
    dispatch(slice.actions.updateBankSuccess(data.beneficiary));
    toast.success('Bank account details changed successfully!');
  } catch (error) {
    dispatch(slice.actions.hasError(error.response.data.msg));
    toast.error('Something went wrong, check your internet!');
  }
};
// -------------------------------------------------------------------

export const getInspections = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const { data } = await api.fetchAgentInspections();
    dispatch(slice.actions.getInspectionsSuccess(data.bookings));
  } catch (error) {
    console.log(error);
  }
};

export const getRemittance = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const { data } = await api.agentRemittance();
    console.log(data);
    dispatch(slice.actions.remittanceSuccess(data));
  } catch (error) {
    console.log(error);
  }
};
