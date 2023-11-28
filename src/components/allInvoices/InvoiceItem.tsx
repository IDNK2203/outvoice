import { IInvoice } from "@/context/invoice";

export default function InvoiceItem({ invoice }: { invoice: IInvoice }) {
  return (
    <div>
      <p>{invoice.clientName}</p>
    </div>
  );
}
