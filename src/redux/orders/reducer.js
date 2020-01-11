import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  LOAD_ORDERS,
  SUBMIT_ORDER,
  LOAD_CUSTOMERS,
  RESET_ORDER,
  LOAD_SELECTED_ORDER,
  UPDATE_ORDER,
  LOAD_CUSTOMER_ORDER,
  COUNT_ORDERS,
  SELECT_DATE_RANGE,
  LOAD_SALES,
  SUBMIT_CUSTOMER,
  LOAD_SHIPPING_METHODS,
  UPDATE_CUSTOMER,
  UPDATE_ORDER_NUM
} from './actions';

import uniqid from 'uniqid';

const initialState = {
  submitted: false,
  customerDBLoaded: false,
  ordersDBLoaded: false,
  cart: [],
  orders: [],
  customerOrder: [],
  customerDB: ['LOADING'],
  customer: [],
  salesReps: [],
  price: [],
  subTotal: [],
  jobInfo: [],
  sessionOrders: 0,
  sessionCustomers: 0,
  orderNum: 0,
  selectedDateRange: 'day',
  shippingMethods: []
};

export default function (state = initialState, action) {
  const { type, data, price, customer, jobInfo, orderType, subTotal, date } = action;
  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [
          ...state.cart,
          { ...data, id: uniqid(), price: price, orderType: orderType }
        ],
        price: [...state.price, price],
        subTotal: [...state.subTotal, subTotal],
        submitted: true,
        customer: customer,
        jobInfo: jobInfo
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(order => order.id !== data.id)
      };
    case LOAD_ORDERS:
      return {
        ...state,
        orders: data,
        ordersDBLoaded: true
      };
    case COUNT_ORDERS:
      return {
        ...state,
        orderNum: data + 100
      };
    case LOAD_CUSTOMER_ORDER:
      return {
        ...state,
        customerOrder: state.orders.filter(
          order => order.companyprofile === data
        )
      };
    case LOAD_SELECTED_ORDER:
      return {
        ...state,
        orders: data
      };
    case LOAD_SALES:
      return {
        ...state,
        salesReps: data
      };
    case LOAD_CUSTOMERS:
      return {
        ...state,
        customerDB: data,
        customerDBLoaded: true
      };
    case SUBMIT_ORDER:
      return {
        ...state,
        cart: [],
        submitted: false,
        subTotal: [],
        sessionOrders: state.sessionOrders + 1
      };
    case SUBMIT_CUSTOMER:
      return {
        ...state,
        sessionCustomers: state.sessionCustomers + 1
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        customerDB: state.customerDB.map((item, index) => {
          if (item.id !== data.id) {
            // This isn't the item we care about - keep it as-is
            return item
          }

          // Otherwise, this is the one we want - return an updated value
          return {
            ...data
          }
        })
      };
    case UPDATE_ORDER:
      return {
        ...state,
        cart: [],
        subTotal: [],
        sessionOrders: state.sessionOrders + 1
      };
    case RESET_ORDER:
      return {
        ...state,
        cart: [],
        submitted: false,
        subTotal: []
      };
    case SELECT_DATE_RANGE:
      return {
        ...state,
        selectedDateRange: date
      };
    case LOAD_SHIPPING_METHODS:
      return {
        ...state,
        shippingMethods: data
      };
      case UPDATE_ORDER_NUM:
        return {
          ...state,
          orderNum: state.orderNum + 1
        };
    default:
      return {
        ...state,

      };
  }
}
