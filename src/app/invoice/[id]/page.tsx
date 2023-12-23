"use client";

import { useInvctxGetById, useInvctxGetDispatch } from "@/context/invoice";
import { useDeleteModalDispatch } from "@/context/modals/deleteModal";
import { useEditModalDispatch } from "@/context/modals/editModal";
import { actionTypes } from "@/context/reducers/invoiceReducer";
import Link from "next/link";

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
      <main className='flex-1 flex h-full flex-col items-center overflow-y-scroll p-24 py-16'>
        <div className='w-[760px]'>
          <h2 className='text-3xl'>No Invoice Found</h2>
        </div>
      </main>
    );
  }

  return (
    <main className='flex-1 flex h-full flex-col items-center overflow-y-scroll p-24 py-16 '>
      <div className='w-[760px]'>
        <section className='my-2 mb-8'>
          <Link href={"/"}>
            {" "}
            <span> Icon</span> go back
          </Link>
        </section>
        <section className='flex justify-between items-center border-2 border-black p-8 my-2 mb-4'>
          <div className='flex'>
            <p>status</p>
            <p className='mx-4'>{invoice?.status}</p>
          </div>
          <div className='flex justify-between'>
            <button className='btn mx-4' onClick={toggleEditModal}>
              Edit
            </button>
            <button className='btn bg-red-700' onClick={toggleDeleteModal}>
              delete
            </button>
            {invoice?.status === "pending" && (
              <button
                onClick={handlePaymentStatusChange}
                className='btn mx-4 btn-success'
              >
                Mark as Paid
              </button>
            )}
          </div>
        </section>
        <section className='flex flex-col justify-between border-2 border-black p-8 my-2 mb-4'>
          <div className='flex justify-between items-start'>
            <div className='flex flex-col'>
              <p>{invoice?.id} </p>
              <p>{invoice?.description} </p>
            </div>
            <div className='flex flex-col'>
              <p>{invoice?.senderAddress?.street} </p>
              <p>{invoice?.senderAddress?.city} </p>
              <p>{invoice?.senderAddress?.postCode} </p>
              <p>{invoice?.senderAddress?.country} </p>
            </div>
          </div>
          <div className='flex justify-between  py-4 items-start'>
            <div className='flex-1 '>
              <div className='flex flex-col'>
                <p>Invoice Date </p>
                <p>{invoice?.createdAt} </p>
              </div>
              <div className='flex flex-col'>
                <p>Payment Due </p>
                <p>{invoice?.paymentDue} </p>
              </div>
            </div>
            <div className='flex-1'>
              <div className='flex flex-col'>
                <p>Bill To </p>
                <p>{invoice?.clientName} </p>
              </div>
              <div className='flex flex-col'>
                <p>{invoice?.clientAddress?.street} </p>
                <p>{invoice?.clientAddress?.city} </p>
                <p>{invoice?.clientAddress?.postCode} </p>
                <p>{invoice?.clientAddress?.country} </p>
              </div>
            </div>
            <div className='flex-1 flex flex-col'>
              <p>Sent To </p>
              <p>{invoice?.clientEmail} </p>
            </div>
          </div>
          <div className='rounded-md border-2 border-black my-2 mt-6 flex flex-col justify-center items-center'>
            {invoice?.items?.length !== 0 && invoice?.items ? (
              <>
                <div className='w-full py-4 overflow-x-auto'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>QTY.</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {invoice?.items.map((el, i) => (
                        <tr key={i}>
                          <th>{el.name}</th>
                          <th>{el.quantity}</th>
                          <th>{el.price}</th>
                          <th>{el.total}</th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className='flex justify-between p-4 w-full border-2 border-black rounded-ee-md'>
                  <p>Amount Due</p>
                  <p>{invoice?.total}</p>
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
    </main>
  );
}
