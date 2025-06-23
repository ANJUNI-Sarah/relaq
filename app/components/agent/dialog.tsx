import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";


const useAgent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFindShop, setIsFindShop] = useState(false);

    const toggleDialog = () => {
        setIsOpen(prev => !prev);
    };

    const toggleFindShop = () => {
        setIsFindShop(prev => !prev);
    };

    return {
        isOpen,
        toggleDialog,
        isFindShop,
        toggleFindShop
    };
}



export const AgentDialog = ({isOpen}: {isOpen: boolean}) => {


    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Agent Information</AlertDialogTitle>
                    <AlertDialogDescription>
                        This is a dialog for agent-related information.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <button className="btn btn-primary" onClick={() => console.log("Confirmed")}>
                        Confirm
                    </button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
} 