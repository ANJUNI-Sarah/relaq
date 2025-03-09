import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function FeaturedSection() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">最熱話題！</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Link key={i} href={`/shop/${i}`}>
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative">
                  <Image src="/placeholder.svg" alt="Featured content" fill className="object-cover rounded-t-lg" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Title</h3>
                  <p className="text-sm text-muted-foreground">texttexttexttexttexttexttexttext</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

