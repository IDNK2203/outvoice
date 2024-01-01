"use client";

export default function Cbutton({
  children,
  funcHandler,
  classes,
  type,
  submit,
}: {
  children: React.ReactNode;
  funcHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  classes?: string;
  type?: string;
  submit?: boolean;
}) {
  const btnTypeClass = (() => {
    switch (type) {
      case "primary":
        return "btn-accent text-white";
      case "secondary":
        return "bg-[--secondary_bg_500] text-[--secondary_fg] hover:bg-[--secondary_bg_700]";
      case "base":
        return " bg-[--secondary_bg_500] text-[--primary_fg] btn-outline ";
      case "error":
        return "btn-error text-white";
      default:
        return null;
    }
  })();

  return (
    <button
      onClick={funcHandler}
      type={submit ? "submit" : "button"}
      className={`btn rounded-full py-2 h-12 capitalize ${btnTypeClass} ${classes}`}
    >
      {children}
    </button>
  );
}
