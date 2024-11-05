"use client";

import {
    Button,
    Selection,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure
} from "@nextui-org/react";
import {Application} from "@/app/model/Application";
import {Dependency} from "@/app/model/Dependency";
import {Key, ReactNode, useState} from "react";
import {DependencyHeaderActionMenu, DependencyRowActionMenu} from "@/app/dependencies/DependencyActionMenus";
import ActionModal from "@/app/components/ActionModal";

interface Props {
    application: Application
}

const columns = [
    {key: "package", label: "Package"},
    {key: "current", label: "Current"},
    {key: "wanted", label: "Wanted"},
    {key: "latest", label: "Latest"},
    {key: "actions", label: "Actions"}
]

function renderBodyCell(dependency: Dependency, columnKey: Key): ReactNode {
    switch (columnKey) {
        case "package":
            return <p>{dependency.package}</p>;
        case "current":
            return <p>{dependency.current}</p>;
        case "wanted":
            return <p>{dependency.wanted}</p>;
        case "latest":
            return <p>{dependency.latest}</p>;
        default:
            return <DependencyRowActionMenu/>;
    }
}

export default function DependenciesTable({application}: Props) {
    const [selectedDependencies, setSelectedDependencies] = useState<string[]>([]);
    const {onOpen, isOpen, onOpenChange} = useDisclosure();

    function updateSelectedRows(keys: Selection) {
        if (keys === "all") {
            setSelectedDependencies([keys])
        } else {
            setSelectedDependencies(Array.from(keys) as string[])
        }
    }

    function onOperationStart(){
        onOpen()
    }

    return (
        <div>
            <Table
                removeWrapper
                className={"pr-16 pt-8"}
                aria-label="Table of all the application dependencies"
                selectionMode="multiple"
                onSelectionChange={(keys: Selection) => updateSelectedRows(keys)}
            >
                <TableHeader>
                    {columns.map((column) =>
                        <TableColumn key={column.key}>
                            {column.label === "Actions"
                                ? <DependencyHeaderActionMenu
                                    onOperationStart={onOperationStart}
                                />
                                : <p>{column.label}</p>
                            }
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={application.dependencies}>
                    {(item: Dependency) => (
                        <TableRow key={item.package}>
                            {(columnKey) => <TableCell>{renderBodyCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <ActionModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                dependencies={selectedDependencies}
            />
        </div>
    );
}
