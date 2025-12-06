"use client";

import { SignOutButton } from "@clerk/nextjs";
import { toast } from "sonner";

function SignOutLink() {
  const handleLogout = () => {
    toast("Çıkış yapılıyor...");
  };

  return (
    <SignOutButton redirectUrl="/">
      <button
        type="button"
        className="w-full text-left"
        onClick={handleLogout}
      >
        Logout
      </button>
    </SignOutButton>
  );
}

export default SignOutLink;
