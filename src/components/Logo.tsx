import { useNavigate } from "react-router";

// function Logo() {
//   const navigate = useNavigate();
//   return (
//     <img
//       src="/logo.svg"
//       alt="logotip"
//       className="h-auto w-auto cursor-pointer object-cover"
//       onClick={() => navigate("/dashboard")}
//     />
//   );
// }

function Logo() {
  const navigate = useNavigate();
  return (
    <img
      src="/logocrn.svg"
      alt="logotip"
      className="bg-primary drop-shadow-input h-auto w-auto cursor-pointer rounded-lg object-cover px-4 py-2"
      onClick={() => navigate("/dashboard")}
    />
  );
}

export default Logo;
