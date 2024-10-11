"use client";

import {Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import {useState} from "react";

export default function NavbarHeader(){

    const [activeItem, setActiveItem] = useState<number>(0);

    return(
        <Navbar>
            <NavbarBrand>
                <p className="font-bold">Dependency Manager</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center"
                           onClick={() => setActiveItem(1)}
            >
                <NavbarItem isActive={activeItem === 1}>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeItem === 2}>
                    <Link href="#" aria-current="page">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeItem === 3}>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}
