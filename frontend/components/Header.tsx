import Link from "next/link";
import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <Link href="/" className="navbar-brand">
          <div className="d-flex">
            <img src="/logo.png" className="mr-2" alt="" />
            <div>Project Mgmt</div>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
