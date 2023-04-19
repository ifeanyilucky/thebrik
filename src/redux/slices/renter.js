import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { PATH_DASHBOARD } from '../../routes/paths';
import * as api from '../../utils/axios';

const initialState = {
  user: null,
  users: [],

  bookings: [],
  payments: [],
  error: false,
  isLoading: false
};

const slice = createSlice({
  initialState,
  name: 'member',
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    makePaymentSuccess(state, action) {
      state.isLoading = false;
      state.payments = [...state.payments, action.payload];
    },
    getPaymentSuccess(state, action) {
      state.isLoading = false;
      state.payments = action.payload;
    },
    getBookingsSuccess(state, action) {
      state.isLoading = false;
      state.bookings = action.payload;
    },
    createBookingSuccess(state, action) {
      state.isLoading = false;
      state.bookings = [...state.bookings, action.payload];
    }
  }
});

export default slice.reducer;

export const getBookings = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const { data } = await api.fetchBooking();
    dispatch(slice.actions.getBookingsSuccess(data.bookings));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const createBooking = (values) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const { data } = await api.createBooking(values);
    dispatch(slice.actions.createBookingSuccess(data.booking));
    toast.success('Viewing has been successfully scheduled');
  } catch (error) {
    dispatch(slice.actions.hasError(error.response.data.msg));
    toast.error(error.response.data.msg, { duration: 6000 });
    console.log(error);
  }
};

export const makePayment = (values) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const { data } = await api.makePayment(values);
    dispatch(slice.actions.makePaymentSuccess(data.payment));
    toast.success('Your payment was successful!', { duration: 6000 });
    window.location.replace(PATH_DASHBOARD.paymentHistory);
  } catch (error) {
    dispatch(slice.actions.hasError(error.response.data.msg));
  }
};

export const getPayments = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const { data } = await api.fetchPayment();
    dispatch(slice.actions.getPaymentSuccess(data.payment));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
