'use client';

import React from 'react';
import { useModal } from '../ModalContext';
import { useSession, signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenu = () => {
  const { openRegisterModal, openLoginModal } = useModal();
  const { data: session } = useSession();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>User</DropdownMenuTrigger>
        <DropdownMenuContent className="z-[101]">
          {session ? (
            <DropdownMenuItem onClick={() => signOut()}>
              Sign Out
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem onClick={openRegisterModal}>
                Register
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openLoginModal}>
                Login
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
