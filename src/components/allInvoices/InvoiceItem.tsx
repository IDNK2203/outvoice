import { IInvoice } from "@/context/invoice";
import Link from "next/link";

export default function InvoiceItem({ invoice }: { invoice: IInvoice }) {
  return (
    <li className=' list-none border-2 border-black p-4 my-2'>
      <Link className='flex justify-between' href={`/invoice/${invoice.id}`}>
        <div className='flex'>
          <p>{invoice.id}</p>
          <p className='mx-4'>{invoice.createdAt}</p>
        </div>
        <div className=''>
          <p>{invoice.clientName}</p>
        </div>
        <div className='flex basis-56 justify-between'>
          <p className=''>{invoice.total}</p>
          <p className='basis-32 text-left	'>
            <span>.</span> {invoice.status} <span>icon</span>
          </p>
        </div>
      </Link>
    </li>
  );
}
