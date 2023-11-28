"use client";
import { createContext, useReducer, Dispatch, useContext } from "react";
import invoiceReducer, { invoiceActions } from "./reducers/invoiceReducer";
import Invoices from "../../public/assets/invoice.json";
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
  total: number;
}

export interface IInvoice {
  id: string;
  createdAt: string;
  status: string;
  paymentDue?: string;
  description?: string;
  paymentTerms?: number;
  clientName?: string;
  clientEmail?: string;
  senderAddress?: IAddress;
  clientAddress?: IAddress;
  items?: IItem[];
  total?: number;
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
// filter by Status
// get Invoice by ID
export const useInvctxFilterByStatus = (...status: string[]) => {
  const invoices = useContext(invoiceContext).state.invoices;
  return invoices.filter((el) => status.includes(el.status));
};

export const useInvctxGetById = (id: string) =>
  useContext(invoiceContext).state.invoices.filter((el) => id === el.id);
export const useInvctxGetState = () => useContext(invoiceContext).state;
export const useInvctxGetDispatch = () => useContext(invoiceContext).dispatch;