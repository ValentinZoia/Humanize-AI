"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { IAuth } from "@/types/user";
import { getEmailInitial } from "@/lib/utils";
import { logout } from "@/app/login/actions";

interface Props {
  auth: IAuth;
}

const UserMenu = ({ auth }: Props) => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="shadow-md">
          <AvatarImage src={auth.user.image} alt="User Image" />
          <AvatarFallback>{getEmailInitial(auth.user.email)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{auth.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuItem disabled>Billing</DropdownMenuItem>
        <DropdownMenuItem disabled>Suscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
