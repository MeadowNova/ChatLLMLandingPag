
'use client'

import { ZoomIn } from 'lucide-react'
import Image from 'next/image'

export function SocialProofSection() {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            A Glimpse Inside Your Learning Hub
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our intuitive dashboard is designed to guide you from novice to
            expert. See for yourself how we structure your learning for success.
          </p>
        </div>

        <div className="mt-16 w-full max-w-5xl group">
          <a
            href="/demo-shot.png"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative rounded-xl overflow-hidden border-2 border-border/20 shadow-2xl shadow-primary/10 transition-all duration-300 ease-in-out group-hover:shadow-primary/20 group-hover:scale-[1.02] group-hover:border-primary/30"
          >
            <Image
              src="/demo-shot.png"
              alt="Course Dashboard Preview"
              width={1200}
              height={794}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="p-4 bg-background/80 backdrop-blur-sm rounded-full text-foreground flex items-center gap-2">
                <ZoomIn className="w-6 h-6" />
                <span>Click to expand</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
