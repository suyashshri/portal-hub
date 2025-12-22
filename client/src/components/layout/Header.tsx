import { LogInIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

const Header = () => {
  return (
    <header className="bg-black/90 px-16 py-4 flex items-center justify-between sticky top-0 z-10 backdrop-blur border-b border-blue-500/20">
      <Link to="/" className="flex items-center gap-2">
        {/* <img
          src="/logo.png"
          alt="Portalhub logo"
          className="h-14 w-14 bg-green-400"
        /> */}

        <h1 className="text-2xl font-bold font-mono tracking-tight text-green-400 flex gap-1.5 items-center">
          <span className="text-white text-3xl">&#x1F30D;</span>
          portalhub
        </h1>
      </Link>
      <div className="flex items-center gap-8 pr-4">
        <SignedOut>
          <Button
            variant="outline"
            className="h-11 font-semibold flex items-center gap-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition cursor-pointer"
          >
            <LogInIcon size={18} />
            <SignInButton />
          </Button>
        </SignedOut>

        <SignedIn>
          <Button
            variant="outline"
            className="h-11 font-semibold flex items-center gap-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition cursor-pointer"
          >
            <span className="font-semibold text-lg">
              <Link to="/dashboard">Dashboard</Link>
            </span>
          </Button>

          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
