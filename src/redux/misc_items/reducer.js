import {
  SELECT_DATE_RANGE,
  LOAD_SHIPPING_METHODS,
  LOAD_PAYMENT_TERMS,
  LOAD_PAYMENT_TYPES,
  LOAD_MISC_ITEMS,
  UPDATE_MISC_ITEMS,
  DELETE_MISC_ITEM,
  ADD_MISC_ITEM,
  MISC_ITEM_ADDED,
  MISC_ITEM_DELETED,
  MISC_ITEM_UPDATED,
  LOAD_CATEGORIES,
  LOAD_PRINTER_OPTIONS,
  ADD_PRINTER_OPTION,
  SAVE_PRINTER_OPTION,
  PRINTER_OPTION_ADDED,
  PRINTER_OPTION_UPDATED,
} from './actions';

const initialState = {
  misc_items: [],
  selectedDateRange: 'day',
  shippingMethods: [],
  paymentTypes: [],
  paymentTerms: [],
  loadedPaymentTypes: false,
  loadedPaymentTerms: false,
  loadedShippingMethods: false,
  loadedMiscItems: false,
  categories: [],
  loadedCategories: false,
  printer_options: [],
  loadedPrinterOptions: false,
};

export default function (state = initialState, action) {
  const { type, data, date, entity } = action;
  switch (type) {
    case LOAD_MISC_ITEMS:
      return {
        ...state,
        misc_items: data,
        loadedMiscItems: true,
      };
    case LOAD_PAYMENT_TERMS:
      return {
        ...state,
        paymentTerms: data,
        loadedPaymentTerms: true,
      };
    case LOAD_PRINTER_OPTIONS:
      return {
        ...state,
        printer_options: data,
        loadedPrinterOptions: true,
      };
    case LOAD_PAYMENT_TYPES:
      return {
        ...state,
        paymentTypes: data,
        loadedPaymentTypes: true,
      };
    case SELECT_DATE_RANGE:
      return {
        ...state,
        selectedDateRange: date,
      };
    case ADD_MISC_ITEM:
      return {
        ...state,
      };
    case UPDATE_MISC_ITEMS:
      return {
        ...state,
      };
    case DELETE_MISC_ITEM:
      return {
        ...state,
      };
    case LOAD_SHIPPING_METHODS:
      return {
        ...state,
        shippingMethods: data,
        loadedShippingMethods: true,
      };
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: data,
        loadedCategories: true,
      };
    case MISC_ITEM_UPDATED:
      return {
        ...state,
        misc_items: state.misc_items.map((i) => {
          return i.id === data.id ? data : i;
        }),
      };
    case MISC_ITEM_ADDED:
      return {
        ...state,
        misc_items: [...state.misc_items, data],
      };
    case MISC_ITEM_DELETED:
      return {
        ...state,
        misc_items: state.misc_items.filter((item) => item.id !== data.id),
      };

    case PRINTER_OPTION_ADDED:
      return {
        ...state,
        printer_options: [...state.printer_options, data],
      };
    case PRINTER_OPTION_UPDATED:
      return {
        ...state,
        printer_options: state.printer_options.map((i) => {
          return i.id === data.id ? data : i;
        }),
      };
    default:
      return {
        ...state,
      };
  }
}
