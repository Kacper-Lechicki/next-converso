import Image from 'next/image';
import Link from 'next/link';

import NavbarItems from '@/components/layout/NavbarItems';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5">
          <Image
            preload
            src="/images/logo.svg"
            alt="converso home"
            width={46}
            height={44}
            className="w-[46px] h-auto"
          />
        </div>
      </Link>

      <div className="flex items-center gap-8">
        <NavbarItems />
        <Link href="/sign-in">Sign In</Link>
      </div>
    </nav>
  );
};

export default Navbar;
