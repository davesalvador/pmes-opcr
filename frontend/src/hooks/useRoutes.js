import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { useNavigate, useLocation } from "react-router-dom";
//log out
import useConversation from "./useConversation";
import useFetch from "../hooks/fetch.hook";

const useRoutes = () => {
  const navigate = useNavigate();
  const [{ isLoading, apiData, serverError }] = useFetch();
  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");

    if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
    if (serverError)
      return (
        <h1 className="text-x1" text-red-500>
          {serverError.message}
        </h1>
      );
  }
  const pathname = useLocation();
  const { conversationId } = useConversation();
  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: " Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => userLogout(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
