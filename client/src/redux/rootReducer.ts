import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth'
import invoiceReducer from './slices/invoice'

const rootReducer = combineReducers({
  auth: authReducer,
  invoice: invoiceReducer
});

export default rootReducer;