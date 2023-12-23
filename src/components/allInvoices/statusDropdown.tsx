import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type InputObject = {
  [key: string]: any;
};

function getTruthyValues(obj: InputObject): any[] {
  return Object.keys(obj).filter((key) => Boolean(obj[key]));
}
export default function StatusDropdown() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [Istatus, setIstatus] = useState<Record<string, boolean>>({
    paid: false,
    pending: false,
    draft: false,
    all: true,
  });

  function handleStatusChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log({ [e.target.name]: e.target.value });

    setIstatus((status) => {
      return {
        ...status,
        [e.target.name]: !status[e.target.name],
      };
    });
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const filteredStatus = getTruthyValues(Istatus).join(",");
    params.set("status", filteredStatus);
    replace(`${pathname}?${params.toString()}`);
  }, [Istatus, replace, pathname, searchParams]);
  return (
    <div>
      <details className='dropdown'>
        <summary className='m-1 btn btn-ghost'>Filter by status</summary>
        <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52'>
          <li>
            <div className='form-control'>
              <label className='label cursor-pointer'>
                <input
                  type='checkbox'
                  name='all'
                  checked={Istatus.all}
                  onChange={handleStatusChange}
                  className='checkbox'
                />
                <span className='label-text'>All </span>
              </label>
            </div>
          </li>
          <li>
            <div className='form-control'>
              <label className='label cursor-pointer'>
                <input
                  type='checkbox'
                  name='paid'
                  checked={Istatus.paid}
                  onChange={handleStatusChange}
                  className='checkbox'
                />
                <span className='label-text'>Paid</span>
              </label>
            </div>
          </li>
          <li>
            <div className='form-control'>
              <label className='label cursor-pointer'>
                <input
                  type='checkbox'
                  checked={Istatus.pending}
                  name='pending'
                  value={"pending"}
                  onChange={handleStatusChange}
                  className='checkbox'
                />
                <span className='label-text'>Pending</span>
              </label>
            </div>
          </li>
          <li>
            <div className='form-control'>
              <label className='label cursor-pointer'>
                <input
                  type='checkbox'
                  checked={Istatus.draft}
                  name='draft'
                  onChange={handleStatusChange}
                  className='checkbox'
                />
                <span className='label-text'>Draft</span>
              </label>
            </div>
          </li>
        </ul>
      </details>
    </div>
  );
}
