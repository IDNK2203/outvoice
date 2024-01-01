"use client";
import Cbutton from "@/components/Cbutton";
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
      <div className='w-full max-w-xl mx-4 bg-[--secondary_bg_700] p-8 sm:p-10 rounded-lg'>
        <h3 className='font-bold text-3xl mb-4 text-[--primary_fg]'>
          {" "}
          Confirm Deletion
        </h3>
        <p className='my-4 text-[--secondary_fg]'>
          Are you sure you want to delete invoice {id}? This action cannot be
          undone.
        </p>
        <div className='flex justify-end '>
          <Cbutton
            funcHandler={toggleDeleteModal}
            type='secondary'
            classes='mx-4 border-none'
          >
            Cancel
          </Cbutton>
          <Cbutton funcHandler={handleDeleteInvioce} type='error'>
            delete
          </Cbutton>
        </div>
      </div>
    </section>
  );
}
