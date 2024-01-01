import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import chevronDown from "../../../public/assets/icon-arrow-down.svg";

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
    setIstatus((status) => {
      return {
        ...status,
        [e.target.name]: !status[e.target.name],
      };
    });
  }

  const dropdownData = ["all", "paid", "pending", "draft"];
  // "checked:border-indigo-800 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange]"

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const filteredStatus = getTruthyValues(Istatus).join(",");
    params.set("status", filteredStatus);
    replace(`${pathname}?${params.toString()}`);
  }, [Istatus, replace, pathname, searchParams]);
  return (
    <div>
      <div className='dropdown dropdown-hover group'>
        <div
          tabIndex={0}
          role='button'
          className='btn btn-ghost my-1 md:m-1 px-2 md:px-4 text-[--primary_fg]'
        >
          Filter by status
          <Image
            className=' transition origin-center group-hover:rotate-180'
            src={chevronDown}
            alt='Arrow Indicator'
          />
        </div>
        <ul
          tabIndex={0}
          className='p-2 shadow menu bg-[--secondary_bg_700] dropdown-content z-[1] rounded-md w-52'
        >
          {dropdownData.map((status) => (
            <li key={status}>
              <div className='form-control py-0 hover:bg-inherit active:bg-inherit focus:bg-inherit'>
                <label className='label cursor-pointer'>
                  <input
                    type='checkbox'
                    name={status}
                    checked={Istatus[`${status}`]}
                    onChange={handleStatusChange}
                    className='checkbox checkbox-sm rounded-none hover:border-accent [--chkbg:theme(colors.accent)] [--chkfg:white]'
                  />
                  <span className='label-text mx-4 font-bold text-[--primary_fg] capitalize'>
                    {status}{" "}
                  </span>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
