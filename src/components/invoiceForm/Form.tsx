// @ts-nocheck
"use client";
import { IInvoice } from "@/context/invoice";
import fixDateFormat from "@/utils/dateFix";
import { useState } from "react";
import {
  Formik,
  Form as FormikForm,
  FormikHelpers,
  FieldArray,
  Field,
} from "formik";
import { z } from "zod";
import { handleAddNewLineItem, transformZodErrors } from "@/utils/InvoiceForm";

const FruitEnum = z
  .enum(["1", "7", "14", "30"], { message: "Must be either 1, 7, 14 or 30" })
  .transform((val) => Number(val));

const addressSchema = z.object({
  street: z.string().min(1, { message: "Must be at least 1 character long" }),
  city: z.string().min(1, { message: "Must be at least 1 character long" }),
  postCode: z.string().min(1, { message: "Must be at least 1 character long" }),
  country: z.string().min(1, { message: "Must be at least 1 character long" }),
});
const lineItemsSchema = z.array(
  z.object({
    name: z.string().min(1, { message: "Must be at least 1 character long" }),
    quantity: z.coerce
      .number()
      .int()
      .min(1, { message: "Must be at least 1 item" }),
    price: z.coerce.number().min(1, { message: "Must be at least 1 $" }),
    total: z.coerce.number().optional(),
  })
);

const formDataSchema = z.object({
  id: z.string().min(1, { message: "Must be at least 1 character long" }),
  createdAt: z.coerce
    .date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
    })
    .max(new Date(), {
      message: "Invoice cannot be created for a future date",
    }),
  paymentDue: z.coerce.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  description: z
    .string()
    .min(1, { message: "Must be at least 1 character long" }),
  paymentTerms: FruitEnum,
  clientName: z
    .string()
    .min(1, { message: "Must be at least 1 character long" }),
  clientEmail: z
    .string()
    .min(1, { message: "Must be at least 1 character long" })
    .email({ message: "Invalid email address" }),
  status: z.enum(["paid", "pending", "draft"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: lineItemsSchema,
  total: z.number().min(1),
});
export const omittedFormSchema = formDataSchema.omit({
  id: true,
  paymentDue: true,
  total: true,
  status: true,
});
export default function Form({
  invoice,
  formType,
  sumbitFormHandler,
  draftFormHandler,
  toggleModal,
}: {
  invoice: IInvoice;
  formType: "create" | "edit";
  sumbitFormHandler: (values: IInvoice) => void;
  draftFormHandler: (values: IInvoice) => void;
  toggleModal: () => void;
}) {
  const [isDraft, setIsDraft] = useState<null | boolean>(null);

  function handleSaveDraft() {
    setIsDraft(true);
  }
  function handleSave() {
    setIsDraft(false);
  }

  function handleSubmit(
    values: IInvoice,
    { setSubmitting }: FormikHelpers<IInvoice>
  ) {
    console.log(isDraft, values);
    if (isDraft) {
      draftFormHandler(values);
      setSubmitting(false);
      toggleModal();
    } else {
      sumbitFormHandler(values);
      setSubmitting(false);
      toggleModal();
    }
  }

  function validateSchema(value: IInvoice) {
    let errorObj: any;
    if (isDraft) return errorObj;

    const processedFormSchema = omittedFormSchema.required();
    const validatedFields = processedFormSchema.safeParse(value);
    if (!validatedFields.success) {
      errorObj = transformZodErrors(validatedFields.error.issues);
    }
    return errorObj;
  }

  return (
    <Formik
      initialValues={{ ...invoice, paymentTerms: String(invoice.paymentTerms) }}
      validate={validateSchema}
      onSubmit={handleSubmit}
    >
      {(props) => {
        return (
          <FormikForm>
            <p className='text-4xl'>
              {" "}
              {formType === "create" ? "Create Invoice" : `Edit ${invoice.id}`}
            </p>
            <section className='my-4'>
              <p className='font-bold'>Bill From</p>
              <div className='my-6'>
                <div className='my-4'>
                  <label
                    htmlFor='senderAddress.street'
                    className='my-1 block text-xs font-medium text-gray-700'
                  >
                    Street Address
                  </label>

                  <input
                    type='text'
                    id='senderAddress.street'
                    name='senderAddress.street'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.senderAddress?.street}
                    placeholder='1 Newton Street, Off Isaac Road, Motion City Force'
                    className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                  />
                  {props.errors?.[`senderAddress.street`] &&
                  props.touched?.senderAddress?.street ? (
                    <p className='text-sm text-red-500'>
                      {props.errors?.[`senderAddress.street`]}
                    </p>
                  ) : null}
                </div>

                <div className='flex my-4'>
                  <div className='flex-1'>
                    <label
                      htmlFor='senderAddress.city'
                      className='my-1 block text-xs font-medium text-gray-700'
                    >
                      City
                    </label>

                    <input
                      type='text'
                      id='senderAddress.city'
                      name='senderAddress.city'
                      placeholder='Motion City'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.senderAddress?.city}
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                    />
                    {props.errors?.[`senderAddress.city`] &&
                    props.touched?.senderAddress?.city ? (
                      <p className='text-sm text-red-500'>
                        {props.errors?.[`senderAddress.city`]}
                      </p>
                    ) : null}
                  </div>
                  <div className='flex-1'>
                    <label
                      htmlFor='senderAddress.postCode'
                      className='my-1 block text-xs font-medium text-gray-700'
                    >
                      Postal City
                    </label>

                    <input
                      type='text'
                      id='senderAddress.postCode'
                      name='senderAddress.postCode'
                      placeholder='300200'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.senderAddress?.postCode}
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                    />
                    {props.errors?.[`senderAddress.postCode`] &&
                    props.touched?.senderAddress?.postCode ? (
                      <p className='text-sm text-red-500'>
                        {props.errors?.[`senderAddress.postCode`]}
                      </p>
                    ) : null}
                  </div>
                  <div className='flex-1'>
                    <label
                      htmlFor='senderAddress.country'
                      className='my-1 block text-xs font-medium text-gray-700'
                    >
                      Country
                    </label>

                    <input
                      type='text'
                      id='senderAddress.country'
                      name='senderAddress.country'
                      placeholder='Force'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.senderAddress?.country}
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                    />
                    {props.errors?.[`senderAddress.country`] &&
                    props.touched?.senderAddress?.country ? (
                      <p className='text-sm text-red-500'>
                        {props.errors?.[`senderAddress.country`]}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
            <section className='my-4'>
              <p className='font-bold'>Bill To</p>
              <div className='my-6'>
                <div className='my-4'>
                  <label
                    htmlFor='clientName'
                    className='my-1 block text-xs font-medium text-gray-700'
                  >
                    Client Name
                  </label>

                  <input
                    type='text'
                    id='clientName'
                    name='clientName'
                    placeholder='Mr Isaac Newton'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.clientName}
                    className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                  />
                  {props.errors?.[`clientName`] && props.touched?.clientName ? (
                    <p className='text-sm text-red-500'>
                      {props.errors?.[`clientName`]}
                    </p>
                  ) : null}
                </div>
                <div className='my-4'>
                  <label
                    htmlFor='clientEmail'
                    className='my-1 block text-xs font-medium text-gray-700'
                  >
                    Client Email
                  </label>

                  <input
                    type='email'
                    id='clientEmail'
                    name='clientEmail'
                    placeholder='Mr Isaac Newton'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.clientEmail}
                    className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                  />
                  {props.errors?.[`clientEmail`] &&
                  props.touched?.clientEmail ? (
                    <p className='text-sm text-red-500'>
                      {props.errors?.[`clientEmail`]}
                    </p>
                  ) : null}
                </div>
                <div className='my-4'>
                  <label
                    htmlFor='clientAddress.street'
                    className='my-1 block text-xs font-medium text-gray-700'
                  >
                    Street Address
                  </label>

                  <input
                    type='text'
                    id='clientAddress.street'
                    name='clientAddress.street'
                    placeholder='1 Newton Street, Off Isaac Road, Motion City Force'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.clientAddress?.street}
                    className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                  />
                  {props.errors?.[`clientAddress.country`] &&
                  props.touched?.clientAddress?.country ? (
                    <p className='text-sm text-red-500'>
                      {props.errors?.[`clientAddress.country`]}
                    </p>
                  ) : null}
                </div>
                <div className='flex my-4'>
                  <div className='flex-1'>
                    <label
                      htmlFor='clientAddress.city'
                      className='my-1 block text-xs font-medium text-gray-700'
                    >
                      City
                    </label>

                    <input
                      type='text'
                      id='clientAddress.city'
                      name='clientAddress.city'
                      placeholder='Motion City'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.clientAddress?.city}
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                    />
                    {props.errors?.[`clientAddress.city`] &&
                    props.touched?.clientAddress?.city ? (
                      <p className='text-sm text-red-500'>
                        {props.errors?.[`clientAddress.city`]}
                      </p>
                    ) : null}
                  </div>
                  <div className='flex-1'>
                    <label
                      htmlFor='clientAddress.postCode'
                      className='my-1 block text-xs font-medium text-gray-700'
                    >
                      Postal City
                    </label>

                    <input
                      type='text'
                      id='clientAddress.postCode'
                      name='clientAddress.postCode'
                      placeholder='300200'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.clientAddress?.postCode}
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                    />
                    {props.errors?.[`clientAddress.postCode`] &&
                    props.touched?.clientAddress?.postCode ? (
                      <p className='text-sm text-red-500'>
                        {props.errors?.[`clientAddress.postCode`]}
                      </p>
                    ) : null}
                  </div>
                  <div className='flex-1'>
                    <label
                      htmlFor='clientAddress.country'
                      className='my-1 block text-xs font-medium text-gray-700'
                    >
                      Country
                    </label>

                    <input
                      type='text'
                      id='clientAddress.country'
                      name='clientAddress.country'
                      placeholder='Force'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.clientAddress?.country}
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                    />
                    {props.errors?.[`clientAddress.country`] &&
                    props.touched?.clientAddress?.country ? (
                      <p className='text-sm text-red-500'>
                        {props.errors?.[`clientAddress.country`]}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='flex my-4'>
                  <div className='flex-1'>
                    <label
                      htmlFor='createdAt'
                      className='my-1 block text-xs font-medium text-gray-700'
                    >
                      Invoice Date
                    </label>

                    <input
                      type='date'
                      id='createdAt'
                      max={fixDateFormat(Date.now())}
                      name='createdAt'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={fixDateFormat(props.values.createdAt)}
                      className='mt-1 w-full rounded-md border-gray-200shadow-sm sm:text-sm'
                    />
                    {props.errors?.[`createdAt`] && props.touched?.createdAt ? (
                      <p className='text-sm text-red-500'>
                        {props.errors?.[`createdAt`]}
                      </p>
                    ) : null}
                  </div>
                  <div className='flex-1'>
                    <label
                      htmlFor='paymentTerms'
                      className='my-1 block text-xs font-medium text-gray-700'
                    >
                      Payment Terms
                    </label>

                    <select
                      name='paymentTerms'
                      id='paymentTerms'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.paymentTerms}
                      className='mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm'
                    >
                      <option value=''>Please select</option>
                      <option value='1'>Next 1 Day</option>
                      <option value='7'>Next 7 Day</option>
                      <option value='14'>Next 14 Day</option>
                      <option value='30'>Next 30 Day</option>
                    </select>
                    {props.errors?.[`paymentTerms`] &&
                    props.touched?.paymentTerms ? (
                      <p className='text-sm text-red-500'>
                        {props.errors?.[`paymentTerms`]}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='my-4'>
                  <label
                    htmlFor='description'
                    className='my-1 block text-xs font-medium text-gray-700'
                  >
                    Description
                  </label>

                  <input
                    type='text'
                    id='description'
                    name='description'
                    placeholder=''
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.description}
                    className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                  />
                  {props.errors?.[`description`] &&
                  props.touched?.description ? (
                    <p className='text-sm text-red-500'>
                      {props.errors?.[`description`]}
                    </p>
                  ) : null}
                </div>
              </div>
            </section>
            <section className='my-4'>
              <p className='font-bold'>Item List</p>
              <FieldArray name='items'>
                {({ insert, remove, push }) => (
                  <div>
                    {props?.values?.items &&
                      props?.values?.items.length > 0 && (
                        <div className='w-full py-4 overflow-x-auto'>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th className='pl-0'>Item Name</th>
                                <th>QTY.</th>
                                <th>Price</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {props?.values?.items.map((el, index) => (
                                <tr key={index}>
                                  <th className='pl-0 relative'>
                                    <Field name={`items.${index}.name`}>
                                      {({ field, form, meta }: any) => (
                                        <input
                                          {...field}
                                          type='text'
                                          placeholder='Asparagus'
                                          className='w-32 rounded-md border-gray-200 pe-4 shadow-sm sm:text-sm'
                                        />
                                      )}
                                    </Field>
                                    {props.errors?.[`items.${index}.name`] &&
                                    props.touched?.items?.[index]?.name ? (
                                      <p className='text-sm -bottom-4 left-0 text-red-500'>
                                        {props.errors?.[`items.${index}.name`]}
                                      </p>
                                    ) : null}
                                  </th>
                                  <th className='relative'>
                                    <Field name={`items.${index}.quantity`}>
                                      {({ field, form, meta }: any) => (
                                        <input
                                          {...field}
                                          type='text'
                                          placeholder='1'
                                          className='w-14 rounded-md border-gray-200 pe-4 shadow-sm sm:text-sm'
                                        />
                                      )}
                                    </Field>
                                    {props.errors?.[
                                      `items.${index}.quantity`
                                    ] &&
                                    props.touched?.items?.[index]?.quantity ? (
                                      <p className='text-sm -bottom-4 left-0 text-red-500'>
                                        {
                                          props.errors?.[
                                            `items.${index}.quantity`
                                          ]
                                        }
                                      </p>
                                    ) : null}
                                  </th>
                                  <th className='relative'>
                                    <Field name={`items.${index}.price`}>
                                      {({ field, form, meta }: any) => (
                                        <input
                                          {...field}
                                          type='text'
                                          placeholder='1'
                                          className='w-20 rounded-md border-gray-200 pe-4 shadow-sm sm:text-sm'
                                        />
                                      )}
                                    </Field>
                                    {props.errors?.[`items.${index}.price`] &&
                                    props.touched?.items?.[index]?.price ? (
                                      <p className='text-sm -bottom-4 left-0 text-red-500'>
                                        {props.errors?.[`items.${index}.price`]}
                                      </p>
                                    ) : null}
                                  </th>
                                  <th>
                                    <div className='flex items-center'>
                                      <span className='w-10'>
                                        {Number(el.price * el.quantity).toFixed(
                                          2
                                        )}
                                      </span>
                                      <button
                                        type='button'
                                        className='btn btn-circle ml-4'
                                        onClick={() => remove(index)}
                                      >
                                        {" "}
                                        d-Item{" "}
                                      </button>
                                    </div>
                                  </th>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    <div>
                      <button
                        className='btn btn-block my-4'
                        type='button'
                        onClick={handleAddNewLineItem.bind(null, push)}
                      >
                        {" "}
                        Icon Add New Item
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </section>
            {formType === "create" ? (
              <CreateFormButtons
                toggleModal={toggleModal}
                handleSave={handleSave}
                handleSaveDraft={handleSaveDraft}
              />
            ) : (
              <EditFormButtons
                toggleModal={toggleModal}
                handleSave={handleSave}
              />
            )}
          </FormikForm>
        );
      }}
    </Formik>
  );
}

const CreateFormButtons = ({ toggleModal, handleSaveDraft, handleSave }) => {
  return (
    <div className='flex my-4 justify-between'>
      <button type='button' className='btn mr-4' onClick={toggleModal}>
        Discard
      </button>
      <div>
        <button type='submit' className='btn' onClick={handleSaveDraft}>
          Save as Draft
        </button>
        <button type='submit' className='btn mx-4' onClick={handleSave}>
          Save and Send
        </button>
      </div>
    </div>
  );
};

const EditFormButtons = ({ toggleModal, handleSave }) => {
  return (
    <div className='flex my-4 justify-end'>
      <button type='button' className='btn mr-4' onClick={toggleModal}>
        Cancel
      </button>
      <button type='submit' className='btn' onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};
