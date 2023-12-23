"use client";
import { useInvctxGetDispatch } from "@/context/invoice";
import { useDeleteModalDispatch } from "@/context/modals/deleteModal";
import { actionTypes } from "@/context/reducers/invoiceReducer";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const dispatch = useInvctxGetDispatch();
  const toggleDeleteModal = useDeleteModalDispatch();

  const handleDeleteInvioce = () => {
    dispatch({ type: actionTypes.DELETE, payload: { id: id } });
    router.back();
  };

  const toggleDeleteModalWrapper = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if ((event.target as HTMLElement)?.id === "deleteModal") {
      toggleDeleteModal();
    }
  };
  return (
    <section
      id='deleteModal'
      className='flex z-10 absolute bg-black/50 h-full w-full left-0 top-0 items-center justify-center'
      onClick={toggleDeleteModalWrapper}
    >
      <div className='w-96 bg-slate-900 p-10 rounded-lg'>
        <h3 className='font-bold text-3xl mb-4'> Confirm Deletion</h3>
        <p className='my-4'>
          Are you sure you want to delete invoice {id}? This action cannot be
          undone.
        </p>
        <div className='flex justify-end '>
          <button className='btn mx-4' onClick={toggleDeleteModal}>
            Cancel
          </button>
          <button className='btn bg-red-700' onClick={handleDeleteInvioce}>
            delete
          </button>
        </div>
      </div>
    </section>
  );
}
