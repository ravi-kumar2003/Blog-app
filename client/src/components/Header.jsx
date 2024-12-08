import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import React from "react";
import { MdDarkMode } from "react-icons/md";

export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl ">
        <span className="p-2 bg-gradient-to-r from-indigo-500 via-purple-900 to-pink-500 rounded-md">
          TeachDaddy
        </span>
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={FaSearch}
          className="hidden lg:inline"
        ></TextInput>
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <FaSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <MdDarkMode />
        </Button>
        <Link to="/sign-in">
          <Button gradientDuoTone="tealToLime" className="p-1 rounded-3xl" >
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
