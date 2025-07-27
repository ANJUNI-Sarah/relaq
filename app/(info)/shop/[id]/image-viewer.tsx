import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ImageViewerProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}

export function ImageViewer({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
}: ImageViewerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] h-[90vh] p-0 bg-black/95 border-none fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0 shadow-[0_0_15px_rgba(0,0,0,0.4)] backdrop-blur-sm">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full p-2 bg-black/50 hover:bg-black/70 transition-colors"
        >
          <X className="h-6 w-6 text-white" />
        </button>
        
        <div className="relative w-full h-full p-10">
          <Image
            src={images[currentIndex]}
            alt={`圖片 ${currentIndex + 1}`}
            fill
            className="object-contain"
          />
          
          <button
            onClick={onPrevious}
            className="absolute left-0 top-0 bottom-0 w-1/4 flex items-center justify-start p-4 bg-transparent hover:bg-gradient-to-r hover:from-black/40 hover:via-transparent hover:to-transparent transition-all rounded-lg"
          >
            <ChevronLeft className="h-8 w-8 text-white drop-shadow-lg" />
          </button>
          
          <button
            onClick={onNext}
            className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-end p-4 bg-transparent hover:bg-gradient-to-l hover:from-black/40 hover:via-transparent hover:to-transparent transition-all rounded-lg"
          >
            <ChevronRight className="h-8 w-8 text-white drop-shadow-lg " />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 