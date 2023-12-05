"use client";

import { createContext, useContext, useState } from "react";

// create context
const defaultValue = {
  state: false,
  toggleModalState: () => {},
};

interface modalContextI {
  state: boolean;
  toggleModalState: () => void;
}
export const deleteModalContext = createContext<modalContextI>(defaultValue);
// create provide
export default function DeleteModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deleteModalToggle, setDeleteModalToggle] = useState(false);
  const toggleDeleteModal = () => {
    setDeleteModalToggle((e) => !e);
  };
  return (
    <deleteModalContext.Provider
      value={{ state: deleteModalToggle, toggleModalState: toggleDeleteModal }}
    >
      {children}
    </deleteModalContext.Provider>
  );
}

// create utility hooks

export const useDeleteModalState = () => useContext(deleteModalContext).state;
export const useDeleteModalDispatch = () =>
  useContext(deleteModalContext).toggleModalState;
