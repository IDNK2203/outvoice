export default function StatusBadge({ status }: { status: string }) {
  const statusClass = (() => {
    switch (status) {
      case "paid":
        return { bg: "bg-paid_bg/25 text-paid_fg", fg: "bg-paid_fg" };
      case "pending":
        return { bg: "bg-pending_bg/25  text-pending_fg", fg: "bg-pending_fg" };
      case "draft":
        return {
          bg: "bg-draft_bg text-[--primary_fg]",
          fg: "bg-[--primary_fg]",
        };
      default:
        return null;
    }
  })();
  return (
    <div
      // data-theme='mid'
      className={`w-24 h-10 p-2 rounded capitalize font-medium flex items-center justify-center ${statusClass?.bg} `}
    >
      <span className={`mr-2 w-2 h-2 rounded-full ${statusClass?.fg}`}></span>{" "}
      {status}
    </div>
  );
}
