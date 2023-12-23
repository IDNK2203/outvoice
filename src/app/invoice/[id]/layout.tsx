"use client";
import { useDeleteModalState } from "@/context/modals/deleteModal";
import { useEditModalState } from "@/context/modals/editModal";

export default function Layout(props: {
  children: React.ReactNode;
  deleteModal: React.ReactNode;
  editModal: React.ReactNode;
}) {
  const deleteModalToggle = useDeleteModalState();
  const editModalToggle = useEditModalState();
  return (
    <>
      {props.children}
      {deleteModalToggle && props.deleteModal}
      {editModalToggle && props.editModal}
    </>
  );
}
