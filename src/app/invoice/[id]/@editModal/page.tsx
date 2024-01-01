"use client";
import Form, { omittedFormSchema } from "@/components/invoiceForm/Form";
import {
  IInvoice,
  IItem,
  useInvctxGetById,
  useInvctxGetDispatch,
} from "@/context/invoice";
import {
  useEditModalDispatch,
  useEditModalState,
} from "@/context/modals/editModal";
import { useParams } from "next/navigation";
import { DateTime } from "luxon";
import { actionTypes } from "@/context/reducers/invoiceReducer";
import fixDateFormat from "@/utils/dateFix";
import clsx from "clsx";

export default function Page() {
  const invoiceDispatch = useInvctxGetDispatch();
  const { id } = useParams() as { id: string };
  const invoice = useInvctxGetById(id);
  const toggleEditModal = useEditModalDispatch();
  const editModalToggle = useEditModalState();

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

      // console.log(values.createdAt, paymentDue, createdAt);
      // console.log(
      //   DateTime.fromISO(values.createdAt)
      //     .plus({ days: values?.paymentTerms as number })
      //     .toISODate(),
      //   DateTime.fromISO(values.createdAt)
      // );

      const transformedFormValues = {
        ...transformedValues.data,
        id: invoice.id,
        status: status,
        paymentDue: paymentDue,
        createdAt: createdAt,
        items: items,
        total: total,
      };

      // console.log(transformedFormValues);

      invoiceDispatch({
        type: actionTypes.EDIT,
        payload: transformedFormValues,
      });
    }
  };

  return (
    <section
      id='EditModal'
      className={clsx(
        "flex z-20 absolute h-full w-full md:max-w-3xl left-0 lg:left-24 top-0 justify-start overflow-hidden bg-black/90  transition-transform delay-300	 duration-300 ease-in-out",
        !editModalToggle ? "-translate-x-[1440px]" : "translate-x-[0px]"
      )}
      onClick={toggleEditModalWrapper}
    >
      <div
        className={clsx(
          "w-full h-full py-8 px-4 md:p-8 bg-[--primary_bg] overflow-hidden "
        )}
      >
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
