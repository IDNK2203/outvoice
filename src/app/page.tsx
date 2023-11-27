import InvoiceList from "@/components/allInvoices/InvoiceList";

export default function Home() {
  return (
    <main className='flex-1 flex h-full flex-col items-center overflow-y-scroll p-24'>
      <div className='w-[760px]'>
        <div className='my-8 flex justify-between'>
          <div>
            <h2>Invoices</h2>
            <p>There are 7 total invoices.</p>
          </div>
          <div>
            <details className='dropdown'>
              <summary className='m-1 btn btn-ghost'>Filter by status</summary>
              <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52'>
                <li>
                  <div className='form-control'>
                    <label className='label cursor-pointer'>
                      <input type='checkbox' className='checkbox' />
                      <span className='label-text'>Paid</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className='form-control'>
                    <label className='label cursor-pointer'>
                      <input type='checkbox' className='checkbox' />
                      <span className='label-text'>Pending</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className='form-control'>
                    <label className='label cursor-pointer'>
                      <input type='checkbox' className='checkbox' />
                      <span className='label-text'>Draft</span>
                    </label>
                  </div>
                </li>
              </ul>
            </details>
          </div>
          <div>
            <button className='btn'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
              New Invoice
            </button>
          </div>
        </div>
        <div>
          <InvoiceList />
        </div>
      </div>
    </main>
  );
}
