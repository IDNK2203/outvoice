"use client";

import { useCreateModalState } from "@/context/modals/createModal";

export default function Layout(props: {
  children: React.ReactNode;
  createModal: React.ReactNode;
}) {
  const createModalToggle = useCreateModalState();

  return (
    <>
      {props.children}
      {props.createModal}
    </>
  );
}
