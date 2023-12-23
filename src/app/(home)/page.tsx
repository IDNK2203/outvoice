"use client";

import InvoiceList from "@/components/allInvoices/InvoiceList";
import StatusDropdown from "@/components/allInvoices/statusDropdown";
import { useInvctxFilterByStatus } from "@/context/invoice";
import { useCreateModalDispatch } from "@/context/modals/createModal";

export default function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string; status?: string };
}) {
  const status = searchParams?.status?.split(",") || ["all"];
  const filteredInvoices = useInvctxFilterByStatus(status);
  const toggleCreateModal = useCreateModalDispatch();

  return (
    <main className='flex-1 flex h-full flex-col items-center overflow-y-scroll p-24 py-16'>
      <div className='w-[760px]'>
        <div className='my-8 flex justify-between'>
          <div>
            <h2>Invoices</h2>
            <p>There are 7 total invoices.</p>
          </div>
          <StatusDropdown />
          <div>
            <button className='btn' onClick={toggleCreateModal}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
              New Invoice
            </button>
          </div>
        </div>
        <div>
          <InvoiceList invoices={filteredInvoices} />
        </div>
      </div>
    </main>
  );
}
