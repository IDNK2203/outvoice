import { useInvctxGetById } from "@/context/invoice";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const invoice = useInvctxGetById(id);
  return (
    <main className='flex-1 flex h-full flex-col items-center overflow-y-scroll p-24 py-16'>
      <div className='w-[760px]'></div>
    </main>
  );
}
