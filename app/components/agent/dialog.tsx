'use client';

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { useState } from "react";


export const useAgent = () => {
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



export const AgentDialog = () => {
    const { isOpen, toggleDialog, isFindShop, toggleFindShop } = useAgent();



    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <span className={`${isFindShop && 'font-medium' }`}>找店家</span>
                        <span className={`${!isFindShop && 'font-medium' }`}>找顏色</span>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                {

                }
                <AlertDialogFooter>
                    <button className="btn btn-primary" onClick={() => console.log("Confirmed")}>
                        Confirm
                    </button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
} 