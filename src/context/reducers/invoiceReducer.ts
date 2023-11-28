import { IInvoice } from "../invoice";

export default function invoiceReducer(
  state: { invoices: IInvoice[] },
  action: invoiceActions
) {
  switch (action.type) {
    case actionTypes.CREATE:
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
      };
    case actionTypes.DELETE:
      return {
        ...state,
        invoices: state.invoices.filter((el) => el.id !== action.payload.id),
      };
    case actionTypes.EDIT:
      return {
        ...state,
        invoices: state.invoices.map((el) =>
          el.id === action.payload.id ? { ...el, ...action.payload } : el
        ),
      };

    case actionTypes.TOOGLE_STATUS:
      return {
        ...state,
        invoices: state.invoices.map((el) =>
          el.id === action.payload.id ? { ...el, status: "paid" } : el
        ),
      };
    default:
      return state;
  }
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum actionTypes {
  CREATE = "CREATE",
  EDIT = "EDIT",
  DELETE = "DELETE",
  TOOGLE_STATUS = "TOOGLE_STATUS",
}

type invoicePayload = {
  [actionTypes.CREATE]: IInvoice;
  [actionTypes.EDIT]: IInvoice;
  [actionTypes.TOOGLE_STATUS]: { id: string };
  [actionTypes.DELETE]: { id: string };
};

export type invoiceActions =
  ActionMap<invoicePayload>[keyof ActionMap<invoicePayload>];
