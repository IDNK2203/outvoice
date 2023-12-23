"use client";
import Form, { omittedFormSchema } from "@/components/invoiceForm/Form";
import { IInvoice, IItem, useInvctxGetDispatch } from "@/context/invoice";
import { DateTime } from "luxon";
import { generateRandomId } from "@/utils/InvoiceForm";
import { actionTypes } from "@/context/reducers/invoiceReducer";
import { useCreateModalDispatch } from "@/context/modals/createModal";

export default function Page() {
  const invoiceDispatch = useInvctxGetDispatch();
  const toggleCreateModal = useCreateModalDispatch();

  const defaultInvoice = {
    id: "",
    createdAt: "",
    paymentDue: "",
    description: "",
    paymentTerms: "",
    clientName: "",
    clientEmail: "",
    status: "",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: [{ name: "", quantity: 0, price: 0, total: 0 }],
    total: 0,
  };

  const toggleCreateModalWrapper = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if ((event.target as HTMLElement)?.id === "CreateModal") {
      toggleCreateModal();
    }
  };

  const handleCreateForm = (values: IInvoice) => {
    const transformedValues = omittedFormSchema.safeParse(values);

    if (transformedValues.success) {
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
        id: generateRandomId(),
        status: "pending",
        paymentDue: paymentDue,
        createdAt: createdAt,
        items: items,
        total: total,
      };
      invoiceDispatch({
        type: actionTypes.CREATE,
        payload: transformedFormValues,
      });
    }
  };
  const handleCreateFormDraft = (values: IInvoice) => {
    const createdAt = DateTime.fromISO(
      values.createdAt || new Date(Date.now()).toISOString()
    ).toISODate() as string;

    const transformedFormValues = {
      ...values,
      id: generateRandomId(),
      status: "draft",
      createdAt: createdAt,
    };
    invoiceDispatch({
      type: actionTypes.CREATE,
      payload: transformedFormValues,
    });
  };

  return (
    <section
      id='CreateModal'
      className='flex z-10 absolute h-full w-full left-24 top-0 justify-start bg-black/50'
      onClick={toggleCreateModalWrapper}
    >
      <div className='min-w-[720px] w-1/2 h-full p-8 bg-slate-900 overflow-y-scroll'>
        <Form
          draftFormHandler={handleCreateFormDraft}
          invoice={defaultInvoice}
          formType={"create"}
          sumbitFormHandler={handleCreateForm}
          toggleModal={toggleCreateModal}
        />
      </div>
    </section>
  );
}
