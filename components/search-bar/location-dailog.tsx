import { AlertDialogProps } from "@radix-ui/react-alert-dialog"

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PropsWithChildren  } from 'react';


type LocationDialogProps = AlertDialogProps & {
    
};


const LocationDialog = ({
    children,
    open,
    defaultOpen,
    onOpenChange
 }:LocationDialogProps) => {
    // children is dialog trigger button 
    <AlertDialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild >
              {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>選擇地區</AlertDialogTitle>
                <AlertDialogDescription>
                  請選擇縣市和鄉鎮
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="縣市" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="taipei">台北市</SelectItem>
                    <SelectItem value="newtaipei">新北市</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="鄉鎮" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="district1">鄉鎮1</SelectItem>
                    <SelectItem value="district2">鄉鎮2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <AlertDialogFooter>
                <Button onClick={() => onOpenChange(false)}>確認</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>


    
}