import axios from 'axios';
import { config } from '../config';

const API = axios.create({ baseURL: config.api });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('accessToken')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  }
  return req;
});

//  AUTH
export const signin = (values) => API.post('/auth/login', values);
export const forgotPassword = (values) => API.post('/auth/forgot-password', values);
export const resetPassword = (values, token) => API.put(`/auth/reset-password/${token}`, values);
export const signup = (values) => API.post('/auth/register', values);
export const account = () => API.get(`/auth/account`);
export const updateProfile = (values) => API.patch(`/auth/account/edit`, { ...values });
export const changePassword = (values) => API.patch('/auth/account/update-password', values);

// HOSTEL
export const fetchHostels = (page) => API.get(`/properties?page=${page}`);
export const fetchHostelsBySearch = (values) => {
  const { area, title, minPrice, maxPrice, bedroom, page } = values;
  console.log(values);
  return API.get(
    `/properties?page=${page}${title && `&title=${title}`}${area && `&location=${area}`}${
      minPrice && `&numericFilters=price>=${minPrice}`
    }${maxPrice && `&numericFilters=price<=${maxPrice}`}${
      bedroom && `&numericFilters=bedrooms=${bedroom}`
    }${
      minPrice && maxPrice && `&numericFilters=price>=${minPrice},price<=${maxPrice}` // Fix the error in this line
    }`
  );
};
export const fetchHostel = (id) => API.get(`/properties/view/${id}`);
export const editHostel = (values, id) => API.patch(`/properties/edit/${id}`, values);

// AGENTS
export const createListing = () => API.post('/properties'); // unused for now
export const deleteListing = (id) => API.delete(`/properties/delete/${id}`);
export const updateListing = (values, id) => API.post(`/properties/edit/${id}`, values);
export const fetchHostListing = () => API.get('/properties/agent');
export const fetchAgentInspections = () => API.get('/bookings/agent');

// MEMBER
export const createBooking = (values) => API.post('/bookings', values);
export const fetchBooking = () => API.get('/bookings');
export const makePayment = (values) => API.post('/payment', values);
export const makeManualPayment = (values) => API.post('/payment/manual', values);
export const fetchPayment = () => API.get('/payment');
export const fetchReferredUsers = () => API.get('/referral');
export const referralBonusPayment = (values) => API.post('/referral/bonus-payment', values);

// PAYMENTS
export const getBanks = () => API.get('/static/banks');
export const addBeneficiary = (values) => API.post('/payment/beneficiary', values);
export const getBeneficiary = () => API.get('/payment/beneficiary/get');
export const updateBeneficiary = (values, id) =>
  API.patch(`/payment/beneficiary/update/${id}`, values);

export const agentRemittance = () => API.get('/payment/agent-remittance');

export const validateBankAccount = (accountNumber, bankCode) =>
  API.get(`/static/validate-account?accountNumber=${accountNumber}&bankCode=${bankCode}`);

// STATIC
export const specialRequest = (values) => API.post('/static/special-request', values);
export const roommateRequest = (values) => API.post('/static/roommate-request', values);

export default API;
