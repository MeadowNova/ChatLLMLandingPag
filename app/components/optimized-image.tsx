'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  quality?: number
  fill?: boolean
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  quality = 85,
  fill = false,
  style,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority) // Load immediately if priority
  const imgRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before the image enters viewport
        threshold: 0.1,
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isInView])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Generate blur placeholder if not provided
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#f3f4f6' // gray-100
      ctx.fillRect(0, 0, w, h)
    }
    return canvas.toDataURL()
  }

  const defaultBlurDataURL = blurDataURL || (width && height ? generateBlurDataURL(width, height) : undefined)

  const isRemoteImage = src.startsWith('http://') || src.startsWith('https://');
  const effectivePlaceholder = (isRemoteImage && placeholder === 'blur' && !defaultBlurDataURL)
    ? 'empty'
    : placeholder;
 
   return (
     <div
       ref={imgRef}
       className={cn(
         'relative overflow-hidden',
         !isLoaded && 'animate-pulse bg-gray-200',
         className
       )}
       style={fill ? { position: 'relative', ...style } : style}
     >
      {hasError ? (
        // Error fallback
        <div
          className="flex items-center justify-center bg-gray-100 text-gray-400"
          style={{ width, height }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      ) : isInView ? (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          placeholder={effectivePlaceholder}
          blurDataURL={defaultBlurDataURL}
          sizes={sizes}
          quality={quality}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={fill ? undefined : { width: '100%', height: 'auto' }}
        />
      ) : (
        // Placeholder while not in view
        <div
          className="bg-gray-200 animate-pulse"
          style={{ width, height }}
          aria-label={`Loading ${alt}`}
        />
      )}
    </div>
  )
}

// Specialized component for hero images with better performance
export function HeroImage({
  src,
  alt,
  className,
  ...props
}: Omit<OptimizedImageProps, 'priority'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      priority={true} // Hero images should load immediately
      placeholder="empty" // Use empty placeholder to avoid blur issues
      quality={90} // Higher quality for hero images
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      {...props}
    />
  )
}

// Component for feature/content images
export function ContentImage({
  src,
  alt,
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      placeholder="empty" // Use empty placeholder to avoid blur issues
      quality={80} // Standard quality for content images
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  )
}

// Component for avatar/profile images
export function AvatarImage({
  src,
  alt,
  size = 64,
  className,
  ...props
}: Omit<OptimizedImageProps, 'width' | 'height'> & { size?: number }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn('rounded-full', className)}
      quality={75} // Lower quality for small avatars
      sizes={`${size}px`}
      {...props}
    />
  )
}
