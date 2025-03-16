import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          頁面不存在
        </h2>
        <p className="text-muted-foreground">
          抱歉，您要找的頁面不存在或已被移除。
        </p>
      </div>
      
      <Button asChild variant="outline">
        <Link href="/" className="gap-2">
          <Home className="h-4 w-4" />
          返回首頁
        </Link>
      </Button>
    </div>
  );
} 