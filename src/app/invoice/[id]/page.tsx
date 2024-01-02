"use client";

import { useInvctxGetById, useInvctxGetDispatch } from "@/context/invoice";
import { useDeleteModalDispatch } from "@/context/modals/deleteModal";
import { useEditModalDispatch } from "@/context/modals/editModal";
import { actionTypes } from "@/context/reducers/invoiceReducer";
import Image from "next/image";
import Link from "next/link";
import chevronDown from "../../../../public/assets/icon-arrow-down.svg";
import Cbutton from "@/components/Cbutton";
import StatusBadge from "@/components/StatusBadge";
import { formatNumberWithCommas } from "@/utils/InvoiceForm";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const invoice = useInvctxGetById(id);
  const toggleDeleteModal = useDeleteModalDispatch();
  const toggleEditModal = useEditModalDispatch();
  const dispatch = useInvctxGetDispatch();
  const handlePaymentStatusChange = () => {
    dispatch({ type: actionTypes.TOOGLE_STATUS, payload: { id: id } });
  };

  if (!invoice) {
    return (
      <main className='flex-1 flex h-full flex-col items-center overflow-y-scroll md:p-24 py-16 bg-[--primary_bg]'>
        <div className='w-full max-w-3xl px-4'>
          <h2 className='text-3xl'>No Invoice Found</h2>
        </div>
      </main>
    );
  }

  return (
    <main className='flex-1 flex min-h-screen h-full flex-col items-center overflow-y-scroll pt-6 pb-24  md:p-24 md:py-16 bg-[--primary_bg] text-[--primary_fg]'>
      <div className='w-full max-w-3xl px-4 mb-28 md:my-2'>
        <section className='my-2 mb-8'>
          <Link href={"/"} className='flex items-center'>
            <div className=' w-8'>
              <Image
                className='rotate-90'
                src={chevronDown}
                alt='Arrow Indicator'
              />
            </div>
            <span>Go back</span>
          </Link>
        </section>
        <section className='flex justify-between items-center rounded-md p-8 my-2 mb-4 bg-[--secondary_bg_700]'>
          <div className='flex items-center justify-between w-full  md:w-auto'>
            <p className='mr-8'>Status</p>
            <StatusBadge status={invoice.status} />
          </div>
          <div className='md:flex justify-between hidden'>
            <Cbutton
              funcHandler={toggleEditModal}
              type='secondary'
              classes='mx-4 border-none'
            >
              Edit
            </Cbutton>
            <Cbutton funcHandler={toggleDeleteModal} type='error'>
              delete
            </Cbutton>
            {invoice?.status === "pending" && (
              <Cbutton
                funcHandler={handlePaymentStatusChange}
                classes='btn mx-4'
                type='primary'
              >
                Mark as Paid
              </Cbutton>
            )}
          </div>
        </section>
        <section className='flex flex-col justify-between rounded-md px-4 p-8 md:p-8 my-2 mb-4 bg-[--secondary_bg_700]'>
          <div className='flex flex-col  md:flex-row justify-between items-start'>
            <div className='flex flex-col'>
              <p>
                {" "}
                <span className='text-[#7e88c3] font-bold text-xl'>#</span>
                {invoice?.id}{" "}
              </p>
              <p className='text-[--secondary_fg] font-thin'>
                {invoice?.description}{" "}
              </p>
            </div>
            <div className='flex flex-col text-[--secondary_fg] font-thin mt-4 md:my-0'>
              <p>{invoice?.senderAddress?.street} </p>
              <p>{invoice?.senderAddress?.city} </p>
              <p>{invoice?.senderAddress?.postCode} </p>
              <p>{invoice?.senderAddress?.country} </p>
            </div>
          </div>
          <div className='flex justify-between py-4 items-start flex-wrap'>
            <div className='flex-1 basis-56'>
              <div className='flex flex-col my-4'>
                <p className='text-[--secondary_fg]  font-thin'>
                  Invoice Date{" "}
                </p>
                <p className='font-bold text-lg'>{invoice?.createdAt} </p>
              </div>
              <div className='flex flex-col my-4'>
                <p className='text-[--secondary_fg]  font-thin'>Payment Due </p>
                <p className='font-bold text-lg'>{invoice?.paymentDue} </p>
              </div>
            </div>
            <div className='flex-1 basis-56'>
              <div className='flex flex-col my-4'>
                <p className='text-[--secondary_fg]  font-thin'>Bill To </p>
                <p className='font-bold text-lg'>{invoice?.clientName} </p>
              </div>
              <div className='flex flex-col my-4 text-[--secondary_fg]  font-thin'>
                <p>{invoice?.clientAddress?.street} </p>
                <p>{invoice?.clientAddress?.city} </p>
                <p>{invoice?.clientAddress?.postCode} </p>
                <p>{invoice?.clientAddress?.country} </p>
              </div>
            </div>
            <div className='flex-1 basis-56 flex flex-col my-4'>
              <p className='text-[--secondary_fg]  font-thin'>Sent To </p>
              <p className='font-bold text-lg'>{invoice?.clientEmail} </p>
            </div>
          </div>
          <div className='rounded-md my-2 mt-6 flex flex-col justify-center items-center bg-[--secondary_bg_500] '>
            {invoice?.items?.length !== 0 && invoice?.items ? (
              <>
                <div className='w-full p-4 overflow-x-auto hidden md:block'>
                  <table className='table'>
                    <thead>
                      <tr className='text-[--secondary_fg] font-normal border-none my-2'>
                        <th className='font-normal'>Item Name</th>
                        <th className='font-normal'>QTY.</th>
                        <th className='font-normal'>Price</th>
                        <th className='font-normal text-right'>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {invoice?.items.map((el, i) => (
                        <tr className='border-none my-2 py-2' key={i}>
                          <th>{el.name}</th>
                          <th>{el.quantity}</th>
                          <th>£{formatNumberWithCommas(el.price)}</th>
                          <th className='text-right'>
                            £{formatNumberWithCommas(el.total || 0)}
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className='w-full p-4 overflow-x-auto md:hidden'>
                  <ul>
                    {invoice?.items.map((el, i) => (
                      <li
                        className='flex justify-between items-center my-2 font-bold'
                        key={i}
                      >
                        <div className='flex flex-col'>
                          <span>{el.name}</span>
                          <span>
                            {el.quantity}x£{formatNumberWithCommas(el.price)}
                          </span>
                        </div>
                        <div>
                          <span> £{formatNumberWithCommas(el.total || 0)}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='flex h-20 items-center justify-between p-8 w-full rounded-b-md bg-[--misc_bg] text-[--misc_fg]'>
                  <p className='md:hidden'>Grand Total</p>{" "}
                  <p className='hidden md:inline'>Amount Due</p>
                  {/* <p>Amount Due</p> */}
                  <p className='text-2xl font-bold'>
                    £{formatNumberWithCommas(invoice?.total)}
                  </p>
                </div>
              </>
            ) : (
              <p className='text-2xl'>
                No Item Added, Edit draft and add item.
              </p>
            )}
          </div>
        </section>
      </div>
      <section className='w-full fixed bottom-0 z-10 md:hidden p-4 bg-[--secondary_bg_700] mt-2'>
        <div className='flex justify-center '>
          <Cbutton
            funcHandler={toggleEditModal}
            type='secondary'
            classes='mx-4 border-none'
          >
            Edit
          </Cbutton>
          <Cbutton funcHandler={toggleDeleteModal} type='error'>
            delete
          </Cbutton>
          {invoice?.status === "pending" && (
            <Cbutton
              funcHandler={handlePaymentStatusChange}
              classes='btn mx-4'
              type='primary'
            >
              Mark as Paid
            </Cbutton>
          )}
        </div>
      </section>
    </main>
  );
}
