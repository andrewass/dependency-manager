"use client";

import {Accordion, AccordionItem} from "@nextui-org/react";
import {ApplicationDependencies} from "@/app/model/ApplicationDependencies";

interface Props {
    dependencies: ApplicationDependencies
}

export default function DependencyAccordion({dependencies}: Props) {
    return (
        <Accordion selectionMode="multiple">
            {Object.entries(dependencies).map(([key, value], index) =>
                <AccordionItem key={index} label={key} title={key}>
                    someContent
                </AccordionItem>
            )}
        </Accordion>
    );
}
