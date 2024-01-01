"use client";

import Cbutton from "@/components/Cbutton";
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
    <main className='flex-1 flex h-full flex-col items-center py-8 pb-16 md:p-24 sm:py-16 bg-[--primary_bg] overflow-y-scroll'>
      <div className='w-full max-w-3xl px-4'>
        <div className='my-8 flex justify-between'>
          <div className='text-[--primary_fg]'>
            <h2 className='text-xl md:text-4xl font-medium'>Invoices</h2>
            <p>
              {" "}
              <span className='md:hidden'>
                {filteredInvoices.length} Invoices
              </span>{" "}
              <span className='hidden md:inline'>
                There are {filteredInvoices.length} total invoices.
              </span>
            </p>
          </div>
          <div className='flex flex-wrap items-center'>
            <StatusDropdown />
            <div className='ml-2 md:ml-6'>
              <Cbutton
                funcHandler={toggleCreateModal}
                type='primary'
                classes='justify-between items-center px-2 sm:pl-2 md:w-[150px]'
              >
                <span className='h-8 w-8 relative rounded-full bg-white'>
                  <svg
                    className='absolute left-1/2 top-1/2 -translate-x-[5px] -translate-y-[5px]  '
                    width='12'
                    height='12'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z'
                      fill='#7C5DFA'
                      fillRule='nonzero'
                    />
                  </svg>
                </span>
                <span className='hidden sm:max-md:inline'> New</span>
                <span className='hidden md:inline'>New Invoices</span>
              </Cbutton>
            </div>
          </div>
        </div>
        <div>
          <InvoiceList invoices={filteredInvoices} />
        </div>
      </div>
    </main>
  );
}
