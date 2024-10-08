"use client";

import {Accordion, AccordionItem} from "@nextui-org/react";
import {ApplicationDependencies} from "@/app/model/ApplicationDependencies";
import DependencyAccordion from "@/app/dependencies/DependencyAccordion";

interface Props {
    application: ApplicationDependencies
}

export default function ApplicationDependencyAccordion({application}: Props) {
    return (
        <Accordion selectionMode="multiple">
            <AccordionItem key={application.name} title={`${application.name} (${application.version})`}>
                {application.dependencies && Object.keys(application.dependencies).length > 0 &&
                    <DependencyAccordion dependencies={application.dependencies} depth={0}/>
                }
            </AccordionItem>
        </Accordion>
    );
}
