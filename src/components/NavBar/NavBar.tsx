'use client';

import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from '@heroui/react';
import ThemeToggle from '@/components/Theme/ThemeSwitcher';
import LoginModal from '@/components/Modal/Login';
import SignUpModal from '@/components/Modal/SignUp';

export default function NavBar() {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onOpenChange: onLoginOpenChange,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onOpenChange: onSignUpOpenChange,
  } = useDisclosure();

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            E-SPORT AUCTION
          </Link>
        </NavbarBrand>
        {/*<NavbarContent className="hidden sm:flex gap-4" justify="center">*/}
        {/*  <NavbarItem>*/}
        {/*    <Link color="foreground" href="/create">*/}
        {/*      경매 등록*/}
        {/*    </Link>*/}
        {/*  </NavbarItem>*/}
        {/*  <NavbarItem>*/}
        {/*    <Link color="foreground" href="/join">*/}
        {/*      경매 참여*/}
        {/*    </Link>*/}
        {/*  </NavbarItem>*/}
        {/*  <NavbarItem>*/}
        {/*    <Link color="foreground" href="#">*/}
        {/*      내 경매*/}
        {/*    </Link>*/}
        {/*  </NavbarItem>*/}
        {/*</NavbarContent>*/}
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button onPress={onLoginOpen} variant="light">
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button onPress={onSignUpOpen} variant="light">
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem>
            <ThemeToggle />
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <LoginModal isOpen={isLoginOpen} onOpenChange={onLoginOpenChange} />
      <SignUpModal isOpen={isSignUpOpen} onOpenChange={onSignUpOpenChange} />
    </>
  );
}
