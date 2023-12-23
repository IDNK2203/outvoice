import DeleteModalProvider from "@/context/modals/deleteModal";
import EditModalProvider from "@/context/modals/editModal";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <EditModalProvider>
      <DeleteModalProvider>{props.children}</DeleteModalProvider>
    </EditModalProvider>
  );
}
