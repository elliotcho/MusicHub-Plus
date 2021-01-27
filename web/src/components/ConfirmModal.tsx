import React, { useRef } from 'react';
import { 
    AlertDialog, 
    AlertDialogBody, 
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogOverlay, 
    Button 
} from '@chakra-ui/react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose() : void;
    onClick() : void;
    body: string;
}

const ConfirmModal : React.FC<ConfirmModalProps> = ({ isOpen, onClose, onClick, body }) => {
    const cancelRef = useRef();

    const handleConfirm = () => {
        onClick();
        onClose();
    }

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            Music-Hub Plus
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {body}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} _focus={{outline: 'none'}}>
                                Cancel
                            </Button>

                            <Button colorScheme='red' onClick={handleConfirm} ml={3} _focus={{outline: 'none'}}>
                                Confirm
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default ConfirmModal;