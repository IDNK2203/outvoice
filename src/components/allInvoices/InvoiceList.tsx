"use client";
import { useInvctxGetState } from "@/context/invoice";
import InvoiceItem from "./InvoiceItem";

export default function InvoiceList() {
  const invoices = useInvctxGetState().invoices;

  return (
    <section>
      {invoices?.map((invoice) => (
        <InvoiceItem invoice={invoice} key={invoice.id} />
      ))}
    </section>
  );
}
