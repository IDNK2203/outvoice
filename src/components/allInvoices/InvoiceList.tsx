"use client";
import { IInvoice } from "@/context/invoice";
import InvoiceItem from "./InvoiceItem";
import emptyIllustration from "../../../public/assets/illustration-empty.svg";
import Image from "next/image";

export default function InvoiceList({ invoices }: { invoices: IInvoice[] }) {
  return (
    <section>
      {invoices?.map((invoice) => (
        <InvoiceItem invoice={invoice} key={invoice.id} />
      ))}
      {invoices.length < 1 && (
        <div className=' w-full relative h-full flex justify-center items-center'>
          <Image src={emptyIllustration} alt='empty illustration' />
        </div>
      )}
    </section>
  );
}
