"use client";
import { useDeleteModalState } from "@/context/modals/deleteModal";

export default function Layout(props: {
  children: React.ReactNode;
  deleteModal: React.ReactNode;
}) {
  const deleteModalToggle = useDeleteModalState();
  return (
    <>
      {props.children}
      {deleteModalToggle && props.deleteModal}
    </>
  );
}
