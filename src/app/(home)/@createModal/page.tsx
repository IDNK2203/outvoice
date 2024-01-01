"use client";
import Form, { omittedFormSchema } from "@/components/invoiceForm/Form";
import { IInvoice, IItem, useInvctxGetDispatch } from "@/context/invoice";
import { DateTime } from "luxon";
import { generateRandomId } from "@/utils/InvoiceForm";
import { actionTypes } from "@/context/reducers/invoiceReducer";
import {
  useCreateModalDispatch,
  useCreateModalState,
} from "@/context/modals/createModal";
import fixDateFormat from "@/utils/dateFix";
import clsx from "clsx";

export default function Page() {
  const invoiceDispatch = useInvctxGetDispatch();
  const toggleCreateModal = useCreateModalDispatch();
  const createModalToggle = useCreateModalState();

  const defaultInvoice = {
    id: "",
    createdAt: new Date(Date.now()).toLocaleDateString(),
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
      const fixedCreatedAtDate = fixDateFormat(values.createdAt);

      const createdAt = DateTime.fromISO(
        fixedCreatedAtDate
      ).toISODate() as string;

      const paymentDue = DateTime.fromISO(fixedCreatedAtDate)
        .plus({ days: values?.paymentTerms as number })
        .toISODate() as string;

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
    const fixedCreatedAtDate = fixDateFormat(values.createdAt);

    const createdAt = DateTime.fromISO(
      fixedCreatedAtDate
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
      className={clsx(
        "flex z-20 absolute h-full w-full md:max-w-3xl left-0 lg:left-24 top-0 justify-start overflow-hidden bg-black/90 transition-transform delay-300	 duration-300 ease-in-out",
        !createModalToggle ? "-translate-x-[1440px]" : "translate-x-[0px]"
      )}
      onClick={toggleCreateModalWrapper}
    >
      <div
        className={clsx(
          "w-full h-full py-8 px-4 md:p-8 bg-[--primary_bg] overflow-hidden "
        )}
      >
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
