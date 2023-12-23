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
export const createModalContext = createContext<modalContextI>(defaultValue);
// create provide
export default function CreateModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [createModalToggle, setCreateModalToggle] = useState(false);
  const toggleCreateModal = () => {
    setCreateModalToggle((e) => !e);
  };
  return (
    <createModalContext.Provider
      value={{ state: createModalToggle, toggleModalState: toggleCreateModal }}
    >
      {children}
    </createModalContext.Provider>
  );
}

// create utility hooks

export const useCreateModalState = () => useContext(createModalContext).state;
export const useCreateModalDispatch = () =>
  useContext(createModalContext).toggleModalState;
