"use client";
import { useDeleteModalState } from "@/context/modals/deleteModal";
import { useEditModalState } from "@/context/modals/editModal";

export default function Layout(props: {
  children: React.ReactNode;
  deleteModal: React.ReactNode;
  editModal: React.ReactNode;
}) {
  const deleteModalToggle = useDeleteModalState();
  return (
    <>
      {props.children}
      {deleteModalToggle && props.deleteModal}
      {props.editModal}
    </>
  );
}
