import DeleteModalProvider from "@/context/modals/deleteModal";

export default function Layout(props: { children: React.ReactNode }) {
  return <DeleteModalProvider>{props.children}</DeleteModalProvider>;
}
