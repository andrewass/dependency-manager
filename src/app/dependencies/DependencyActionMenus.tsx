import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import React from "react";
import {CiMenuKebab} from "react-icons/ci";

export function DependencyRowActionMenu() {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <CiMenuKebab />
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem>Update</DropdownItem>
                <DropdownItem>Upgrade to latest</DropdownItem>
                <DropdownItem>Uninstall</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

interface HeaderProps{
    onOperationStart: () => void
}

export function DependencyHeaderActionMenu({onOperationStart}: HeaderProps){

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button size="sm" endContent={<CiMenuKebab/>}>
                    Actions
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem onClick={onOperationStart}>
                    Update selected
                </DropdownItem>
                <DropdownItem>Upgrade selected to latest</DropdownItem>
                <DropdownItem>Uninstall selected</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
