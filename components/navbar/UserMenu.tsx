"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItems from "./MenuItems";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";
import useRentModal from "@/hooks/useRentModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => {
      return !value;
    });
  }, []);

  const onRent = useCallback(() => {
    if(!currentUser) {
      return loginModal.onOpen()
    }

    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row gap-5 items-center">
        <div onClick={onRent} className="hidden md:block text-sm font-semibold rounded-full hover:bg-neutral-300 transition cursor-pointer py-3 px-4">
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="flex flex-row  gap-3 rounded-full border-[1px] shadow-sm hover:shadow-md cursor-pointer transition items-center p-4 md:py-1 md:px-2"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-sm w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItems label="My trips" onClick={() => {}} />
                <MenuItems label="My favorites" onClick={() => {}} />
                <MenuItems label="My reservation" onClick={() => {}} />
                <MenuItems label="My properties" onClick={() => {}} />
                <MenuItems label="Airbnb my home" onClick={rentModal.onOpen} />
                <MenuItems label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItems label="Login" onClick={loginModal.onOpen} />
                <MenuItems label="sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
