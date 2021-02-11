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
    body: string;
    onClose() : void;
    onClick() : void;
}

const ConfirmModal : React.FC<ConfirmModalProps> = ({ isOpen, body, onClose, onClick }) => {
    const cancelRef = useRef();    
    const focusStyle = { outline: 'none' };

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
                            <Button 
                                ref={cancelRef} 
                                _focus={focusStyle}
                                onClick={onClose} 
                            >
                                Cancel
                            </Button>

                            <Button 
                                colorScheme='red' 
                                onClick={handleConfirm} 
                                _focus={focusStyle}
                                ml={3} 
                            >
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