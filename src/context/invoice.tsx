"use client";
import { createContext, useReducer, Dispatch, useContext } from "react";
import invoiceReducer, { invoiceActions } from "./reducers/invoiceReducer";
import Invoices from "../../public/assets/data/invoice.json";
// create content

export type Status = "paid" | "pending" | "draft";
export interface IAddress {
  street: string;
  city: string;
  postCode: string;
  country: string;
}
export interface IItem {
  name: string;
  quantity: number;
  price: number;
  total?: number;
}

export interface IInvoice {
  id: string;
  createdAt: string;
  status: string;
  paymentDue?: string;
  description?: string;
  paymentTerms?: number | string;
  clientName?: string;
  clientEmail?: string;
  senderAddress?: IAddress;
  clientAddress?: IAddress;
  items?: IItem[];
  total: number;
}

export interface IInvoiceContext {
  state: { invoices: IInvoice[] };
  dispatch: Dispatch<invoiceActions>;
}

export const initialState = {
  invoices: Invoices,
};
const invoiceContext = createContext<IInvoiceContext>({
  state: initialState,
  dispatch: () => {},
});

// create provider
interface propsI {
  children: React.ReactNode;
}

export default function InvoiceProvider({ children }: propsI) {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);

  return (
    <invoiceContext.Provider value={{ state, dispatch }}>
      {children}
    </invoiceContext.Provider>
  );
}
// create context utility hook
export const useInvctxFilterByStatus = (status: string[]) => {
  const status_ = status.find((el) => el === "all")
    ? ["paid", "pending", "draft"]
    : status;

  const invoices = useContext(invoiceContext).state.invoices;
  return invoices.filter((el) => status_.includes(el.status));
};
export const useInvctxGetById = (id: string) =>
  useContext(invoiceContext).state.invoices.find((el) => id === el.id);
export const useInvctxGetState = () => useContext(invoiceContext).state;
export const useInvctxGetDispatch = () => useContext(invoiceContext).dispatch;
