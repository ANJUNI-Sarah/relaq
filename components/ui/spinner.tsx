import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
    className?: string;
    strokeWidth?: number;
}

export const Spinner = ({ className, strokeWidth = 1, ...rest }: SpinnerProps) => (
    <Loader2 className={cn("animate-spin h-6 w-6", className)}  strokeWidth={strokeWidth} {...rest}/>
);