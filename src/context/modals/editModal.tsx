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
export const editModalContext = createContext<modalContextI>(defaultValue);
// create provide
export default function EditModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [editModalToggle, setEditModalToggle] = useState(false);
  const toggleEditModal = () => {
    setEditModalToggle((e) => !e);
  };
  return (
    <editModalContext.Provider
      value={{ state: editModalToggle, toggleModalState: toggleEditModal }}
    >
      {children}
    </editModalContext.Provider>
  );
}

// create utility hooks

export const useEditModalState = () => useContext(editModalContext).state;
export const useEditModalDispatch = () =>
  useContext(editModalContext).toggleModalState;
