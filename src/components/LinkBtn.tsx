import type { ReactNode } from "react";
import { useNavigate } from "react-router";

function LinkBtn({
  children,
  to,
  type,
}: {
  children: ReactNode;
  to?: string;
  type: string;
}) {
  const navigate = useNavigate();

  const style: { [key: string]: string } = {
    primary:
      "from-primary to-secondary drop-shadow-btn hover:to-primary cursor-pointer rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300",
    secondary:
      "hover:bg-secondary cursor-pointer rounded-lg px-4 py-3 font-semibold transition-colors duration-300 border border-black hover:border-black/0",
    backBtn:
      "drop-shadow-input border-gray/50 h-11 rounded-lg border bg-white px-4 cursor-pointer text-black/50 font-semibold",
    userList:
      "drop-shadow-input border-secondary h-11 rounded-lg border-2 bg-white px-4 cursor-pointer font-semibold",
  };

  function handleClick() {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  }

  return (
    <button onClick={handleClick} className={style[type]}>
      {children}
    </button>
  );
}

export default LinkBtn;
