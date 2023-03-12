import { createSlice } from '@reduxjs/toolkit';
import { reject } from 'lodash';
import { createBrowserHistory } from 'history';
import * as api from '../../utils/axios';
import { PATH_AGENT } from '../../routes/paths';

export const browserHistory = createBrowserHistory();
const initialState = {
  isLoading: false,
  error: false,
  hostels: {
    data: [],
    currentPage: null,
    numberOfPages: null,
    totalHostels: null
  },
  hostel: null,
  sortBy: null,
  filters: {
    area: [],
    category: 'All',
    priceRange: '',
    areaSearch: ''
  }
};

const slice = createSlice({
  name: 'hostel',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getHostelsSuccess(state, action) {
      state.isLoading = false;
      state.hostels.data = action.payload.hostels;
      state.hostels.currentPage = action.payload.currentPage;
      state.hostels.numberOfPages = action.payload.numberOfPages;
      state.hostels.totalHostels = action.payload.totalHostels;
    },
    getHostelSuccess(state, action) {
      state.isLoading = false;
      state.hostel = action.payload;
    },
    createHostelSuccess(state, action) {
      state.isLoading = false;
      state.hostels = state.hostels.push(action.payload);
    },
    filterHostelsSuccess(state, action) {
      state.isLoading = false;
      state.hostels.data = action.payload.hostels;
      state.hostels.currentPage = action.payload.currentPage;
      state.hostels.numberOfPages = action.payload.numberOfPages;
      state.hostels.totalHostels = action.payload;
      state.filters.area = action.payload.area;
      state.filters.category = action.payload.category;
      state.filters.priceRange = action.payload.priceRange;
    },
    deleteHostelSuccess(state, action) {
      state.isLoading = false;
      state.hostels = reject(state.hostels, { id: action.payload });
    }
  }
});

export default slice.reducer;

export const {
  createHostelSuccess,
  deleteHostelSuccess,
  filterHostelsSuccess,
  getHostelSuccess,
  getHostelsSuccess
} = slice.actions;

// export const getHostels = (page) => async (dispatch) => {
//   dispatch(slice.actions.startLoading());
//   try {
//     const { data } = await api.fetchHostels(page);
//     dispatch(slice.actions.getHostelsSuccess(data));
//   } catch (error) {
//     console.log(error);
//   }
// };

// ------------------------------------------------------------
export const getHostel = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const { data } = await api.fetchHostel(id);
    dispatch(slice.actions.getHostelSuccess(data.hostel));
  } catch (error) {
    console.log(error);
    dispatch(slice.actions.hasError(error.response.data.msg));
  }
};

// ------------------------------------------------------------
export const getHostels = (values) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const { data } = await api.fetchHostelsBySearch(values);
    dispatch(slice.actions.filterHostelsSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(slice.actions.hasError(error));
    console.log(error);
  }
};

// ------------------------------------------------------------
export const addHostel = (values) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const { data } = await api.createListing(values);
    dispatch(slice.actions.createHostelSuccess(data.hostel));
    browserHistory.push(PATH_AGENT.root);
  } catch (error) {
    console.log(error);
    dispatch(slice.actions.hasError(error.response.data.msg));
  }
};

// ------------------------------------------------------------
// UPDATE HOSTEL WHEN PAYMENT IS MADE
export const updateHostel = (values, id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const { data } = await api.editHostel(values, id);
    dispatch(slice.actions.createHostelSuccess(data.hostel));
  } catch (error) {
    console.log(error);
    dispatch(slice.actions.hasError(error.response.data.msg));
  }
};
