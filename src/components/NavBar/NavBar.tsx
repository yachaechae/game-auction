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

function NavBar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">E-SPORT AUCTION</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/create">
              경매 등록
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/join">
              경매 참여
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              내 경매
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            {/* 로그인 클릭 시 모달 열기 */}
            <Link href="#" onClick={onOpen}>
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              className="bg-navy text-white"
              href="#"
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem>
            <ThemeToggle />
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

export default NavBar;
