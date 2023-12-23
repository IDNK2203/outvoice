"use client";
import Form, { omittedFormSchema } from "@/components/invoiceForm/Form";
import {
  IInvoice,
  IItem,
  useInvctxGetById,
  useInvctxGetDispatch,
} from "@/context/invoice";
import { useEditModalDispatch } from "@/context/modals/editModal";
import { useParams } from "next/navigation";
import { DateTime } from "luxon";
import { actionTypes } from "@/context/reducers/invoiceReducer";

export default function Page() {
  const invoiceDispatch = useInvctxGetDispatch();
  const { id } = useParams() as { id: string };
  const invoice = useInvctxGetById(id);
  const toggleEditModal = useEditModalDispatch();

  // console.log(invoice);
  if (!invoice) {
    return null;
  }

  const toggleEditModalWrapper = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if ((event.target as HTMLElement)?.id === "EditModal") {
      toggleEditModal();
    }
  };

  const handleEditForm = (values: IInvoice) => {
    const transformedValues = omittedFormSchema.safeParse(values);
    if (transformedValues.success) {
      const status = invoice.status !== "paid" ? "pending" : "paid";

      const paymentDue =
        DateTime.fromISO(values.createdAt)
          .plus({ days: values?.paymentTerms as number })
          .toISODate() || Date.now().toLocaleString();

      const createdAt =
        DateTime.fromISO(values.createdAt).toISODate() ||
        Date.now().toLocaleString();

      const items = transformedValues?.data?.items.map((el: any) => ({
        ...el,
        total: el.price * el.quantity,
      }));
      const t = transformedValues?.data?.items.reduce(
        (accumulator: IItem, currentItem: IItem) => {
          const total =
            (accumulator.total || 0) + currentItem.quantity * currentItem.price;
          return {
            ...currentItem,
            total,
          };
        },
        { name: "", quantity: 0, price: 0, total: 0 }
      ).total as number;
      const total = Number(t.toFixed(2));

      const transformedFormValues = {
        ...transformedValues.data,
        id: invoice.id,
        status: status,
        paymentDue: paymentDue,
        createdAt: createdAt,
        items: items,
        total: total,
      };

      console.log(transformedFormValues);

      invoiceDispatch({
        type: actionTypes.EDIT,
        payload: transformedFormValues,
      });
    }
  };

  return (
    <section
      id='EditModal'
      className='flex z-10 absolute h-full w-full left-24 top-0 justify-start bg-black/50'
      onClick={toggleEditModalWrapper}
    >
      <div className='min-w-[720px] w-1/2 h-full p-8 bg-slate-900 overflow-y-scroll'>
        <Form
          draftFormHandler={() => ""}
          invoice={invoice}
          formType={"edit"}
          sumbitFormHandler={handleEditForm}
          toggleModal={toggleEditModal}
        />
      </div>
    </section>
  );
}
