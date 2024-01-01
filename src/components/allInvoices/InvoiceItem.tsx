import { IInvoice } from "@/context/invoice";
import Image from "next/image";
import Link from "next/link";
import chevronDown from "../../../public/assets/icon-arrow-down.svg";
import StatusBadge from "../StatusBadge";
import { formatNumberWithCommas } from "@/utils/InvoiceForm";

export default function InvoiceItem({ invoice }: { invoice: IInvoice }) {
  return (
    <li className='transition duration-500 p-6 list-none border-2 border-transparent hover:border-2 hover:border-accent my-3 bg-[--secondary_bg_500] text-[--primary_fg] rounded-md'>
      <Link
        className='flex flex-col md:flex-row items-center justify-between'
        href={`/invoice/${invoice.id}`}
      >
        <div className='flex font-bold items-baseline justify-between w-full md:w-auto py-2'>
          <div className='inline-flex items-center'>
            <span className='text-[#7e88c3] text-xl'>#</span>
            {invoice.id}
          </div>
          <div className='mx-4 text-[--secondary_fg] font-light'>
            <span className='md:hidden'>{invoice.clientName}</span>{" "}
            <span className='hidden md:inline'>{invoice.createdAt}</span>
          </div>
        </div>
        <div className='text-[--secondary_fg] font-light flex items-start w-full md:w-auto'>
          {/* <div>{invoice.clientName}</div> */}
          <span className='md:hidden'>{invoice.createdAt}</span>{" "}
          <span className='hidden md:inline'>{invoice.clientName}</span>
        </div>
        <div className='flex md:basis-64 items-center justify-between w-full md:w-auto'>
          <span className=' pr-4 font-bold text-xl'>
            £{formatNumberWithCommas(invoice.total)}
          </span>
          <div className='md:basis-32 text-left flex items-center justify-between'>
            <StatusBadge status={invoice.status} />
            <div className='hidden md:inline'>
              {" "}
              <Image
                className='-rotate-90'
                src={chevronDown}
                alt='Arrow Indicator'
              />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
