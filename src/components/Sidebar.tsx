export default function Sidebar() {
  return (
    <div className='h-full basis-24 justify-between flex flex-col border-2 border-black'>
      <div className='border-2 border-black h-24 p-4'>
        <p>Image</p>
      </div>
      <div className='border-2 border-black h-40 justify-between flex flex-col p-4'>
        <div>
          <p>icon</p>
        </div>

        <div>
          <p>profile Image</p>
        </div>
      </div>
    </div>
  );
}
