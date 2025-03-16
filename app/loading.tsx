import { Spinner } from '@/components/ui/spinner';


export default function Loading() {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex relative flex-col items-center gap-3 p-6">
                <Spinner className="w-[100px] h-[100px] text-white" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-medium text-white font-playfair" >
                    Relaq
                </span>
            </div>
        </div>
    );
}