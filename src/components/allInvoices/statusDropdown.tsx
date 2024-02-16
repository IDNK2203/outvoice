import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import chevronDown from "../../../public/assets/icon-arrow-down.svg";

type statusType = "paid" | "pending" | "draft" | "all";
interface IStatus {
  paid: boolean,
  pending: boolean,
  draft: boolean,
  all: boolean,
};

const statusOptions: statusType[] = ["all", "paid", "pending", "draft"];

export default function StatusDropdown({
  searchParamsList,
}: {
  searchParamsList: string[];
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();


  
  const [status, setStatus] = useState<IStatus>(() => {
    const defaultStatus = statusOptions.reduce((acc, status) => {
      acc[status] = searchParamsList?.includes(status) ?? false;
      return acc;
    }, {
      paid: false,
      pending: false,
      draft: false,
      all: false,
    });
    return defaultStatus;
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const s = e.target.name as any as statusType;
    setStatus((prevStatus) => ({ ...prevStatus, [s]: !prevStatus[s] }));
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const filteredStatus = Object.entries(status)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(",");
    params.set("status", filteredStatus);
    replace(`${pathname}?${params.toString()}`);
  }, [status, replace, pathname, searchParams]);

  return (
    <div>
      <div className="dropdown dropdown-hover group">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost my-1 md:m-1 px-2 md:px-4 text-[--primary_fg]"
        >
          Filter by status
          <Image
            className="transition origin-center group-hover:rotate-180"
            src={chevronDown}
            alt="Arrow Indicator"
          />
        </div>
        <ul
          tabIndex={0}
          className="p-2 shadow menu bg-[--secondary_bg_700] dropdown-content z-[1] rounded-md w-52"
        >
          {statusOptions.map((s) => (
            <li key={s}>
              <div className="form-control py-0 hover:bg-inherit active:bg-inherit focus:bg-inherit">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    name={s}
                    checked={status[s]}
                    onChange={handleStatusChange}
                    className="checkbox checkbox-sm rounded-none hover:border-accent [--chkbg:theme(colors.accent)] [--chkfg:white]"
                  />
                  <span className="label-text mx-4 font-bold text-[--primary_fg] capitalize">
                    {s}
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
