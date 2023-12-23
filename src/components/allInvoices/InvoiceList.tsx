"use client";
import { IInvoice } from "@/context/invoice";
// import { useInvctxGetState } from "@/context/invoice";
import InvoiceItem from "./InvoiceItem";

export default function InvoiceList({ invoices }: { invoices: IInvoice[] }) {
  // const invoices = useInvctxGetState().invoices;

  return (
    <section>
      {invoices?.map((invoice) => (
        <InvoiceItem invoice={invoice} key={invoice.id} />
      ))}
    </section>
  );
}
