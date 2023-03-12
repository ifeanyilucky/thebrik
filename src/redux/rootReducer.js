import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hostelReducer from './slices/hostels';
import userReducer from './slices/renter';
import hostReducer from './slices/host';

const rootReducer = combineReducers({
  hostel: hostelReducer,
  user: userReducer,
  host: hostReducer
});

export default rootReducer;
