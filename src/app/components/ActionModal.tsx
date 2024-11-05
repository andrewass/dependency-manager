import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {updateDependencies} from "@/app/dependencies/actions";
import {useRouter} from "next/navigation";

interface Props {
    isOpen: boolean
    onOpenChange: () => void
    dependencies: string[]
}

export default function ActionModal({isOpen, onOpenChange, dependencies}: Props) {
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            setMessage("Performing action");
            updateDependencies(dependencies)
                .then(() => setMessage("Completed"))

        }
    }, [dependencies, isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">NPM Operation</ModalHeader>
                        <ModalBody>
                            <p>{message}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant="light" onPress={
                                () => {
                                    onClose()
                                    router.refresh();
                                }
                            }>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
