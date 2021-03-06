import {
  LOAD_CUSTOMERS,
  LOAD_ALL_CUSTOMERS,
  UPDATE_CUSTOMER,
  SET_SELECTED_COMPANY,
  DB_NOT_LOADED,
  CUSTOMER_ADDED,
  CUSTOMER_UPDATED,
  CUSTOMER_DELETED
} from './actions';

const initialState = {
  customerDB: ['LOADING'],
  customer: [],
  customerDBLoaded: false,
  selectedCompanies: [],
  dbLoadComplete: false
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case CUSTOMER_ADDED:
      return {
        ...state,
        customerDB: [data, ...state.customerDB],
      };
    case CUSTOMER_UPDATED:
      return {
        ...state,
        orders: state.customerDB.map((i) =>
          i.id === data.id ? data : i
        ),
      };
    case CUSTOMER_DELETED:
      return {
        ...state,
        orders: state.customerDB.filter(item => item.id !== data.id),
      };
    case LOAD_CUSTOMERS:
      return {
        ...state,
        customerDB: data,
        customerDBLoaded: true
      };
    case LOAD_ALL_CUSTOMERS:
      return {
        ...state,
        customerDB: data,
        customerDBLoaded: true,
        dbLoadComplete: true
      };
    case SET_SELECTED_COMPANY:
      return {
        ...state,
        selectedCompanies: data
      };
    case DB_NOT_LOADED:
      return {
        ...state,
        dbLoadComplete: false
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        customerDB: state.customerDB.map((item, index) => {
          if (item.id !== data.id) {
            // This isn't the item we care about - keep it as-is
            return item;
          }

          // Otherwise, this is the one we want - return an updated value
          return {
            ...data
          };
        })
      };
    default:
      return {
        ...state,

      };
  }
}
