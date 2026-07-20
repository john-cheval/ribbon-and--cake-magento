import type { MouseEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import DecorCelebrationCustomForm from './DecorCelebrationCustomForm'
import styles from './DecorCelebrationDev.module.css'

export type DecorCelebrationDevProps = {
  content: string
}

type GalleryItem = {
  src: string
  alt: string
}

export function isDecorCelebrationDevContent(content?: string | null) {
  if (!content) return false

  return (
    content.includes('decor-hero') ||
    content.includes('decor-planning-section') ||
    content.includes('decor-admin-guide') ||
    content.includes('data-decor-admin-section')
  )
}

export default function DecorCelebrationDev(props: DecorCelebrationDevProps) {
  const { content } = props
  const contentRef = useRef<HTMLElement>(null)
  const lightboxDialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)
  const [formMounts, setFormMounts] = useState<HTMLElement[]>([])
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
  const isLightboxOpen = activeImageIndex !== null

  useEffect(() => {
    const mounts = Array.from(
      contentRef.current?.querySelectorAll<HTMLElement>('[data-decor-custom-form]') ?? [],
    )
    setFormMounts(mounts)

    const images = Array.from(
      contentRef.current?.querySelectorAll<HTMLImageElement>('.decor-work-card img') ?? [],
    ).map((image) => ({
      src: image.getAttribute('src') || image.currentSrc,
      alt: image.getAttribute('alt') || 'Balloon decoration setup',
    }))
    setGalleryItems(images)
    setActiveImageIndex(null)
  }, [content])

  useEffect(() => {
    if (!isLightboxOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImageIndex(null)
        window.requestAnimationFrame(() => lastTriggerRef.current?.focus())
      } else if (event.key === 'ArrowLeft') {
        setActiveImageIndex((current) =>
          current === null ? null : (current - 1 + galleryItems.length) % galleryItems.length,
        )
      } else if (event.key === 'ArrowRight') {
        setActiveImageIndex((current) =>
          current === null ? null : (current + 1) % galleryItems.length,
        )
      } else if (event.key === 'Tab') {
        const controls = Array.from(
          lightboxDialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ??
            [],
        )
        if (!controls.length) return

        const firstControl = controls[0]
        const lastControl = controls[controls.length - 1]
        const activeElement = document.activeElement

        if (event.shiftKey && activeElement === firstControl) {
          event.preventDefault()
          lastControl.focus()
        } else if (!event.shiftKey && activeElement === lastControl) {
          event.preventDefault()
          firstControl.focus()
        } else if (!activeElement || !lightboxDialogRef.current?.contains(activeElement)) {
          event.preventDefault()
          firstControl.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [galleryItems.length, isLightboxOpen])

  const closeLightbox = () => {
    setActiveImageIndex(null)
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus())
  }

  const handleContentClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target
    if (!(target instanceof Element)) return

    const card = target.closest<HTMLElement>('.decor-work-card')
    if (!card || !contentRef.current?.contains(card)) return

    const cards = Array.from(contentRef.current.querySelectorAll<HTMLElement>('.decor-work-card'))
    const imageIndex = cards.indexOf(card)
    if (imageIndex < 0 || !galleryItems[imageIndex]) return

    event.preventDefault()
    lastTriggerRef.current = card
    setActiveImageIndex(imageIndex)
  }

  const activeImage = activeImageIndex === null ? null : (galleryItems[activeImageIndex] ?? null)

  return (
    <>
      <main
        ref={contentRef}
        className={styles.cmsContent}
        onClick={handleContentClick}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {formMounts.map((mount, index) => {
        const identifier = mount.dataset.decorCustomForm
        if (!identifier) return null

        return createPortal(
          <DecorCelebrationCustomForm identifier={identifier} />,
          mount,
          `${identifier}-${index}`,
        )
      })}
      {activeImage && activeImageIndex !== null
        ? createPortal(
            <div
              className={styles.lightbox}
              role='presentation'
              onMouseDown={(event) => {
                if (event.currentTarget === event.target) closeLightbox()
              }}
            >
              <div
                ref={lightboxDialogRef}
                className={styles.lightboxDialog}
                role='dialog'
                aria-modal='true'
                aria-label='Our work image gallery'
              >
                <button
                  ref={closeButtonRef}
                  className={styles.lightboxClose}
                  type='button'
                  aria-label='Close image gallery'
                  onClick={closeLightbox}
                >
                  <svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                    <path
                      d='M5 5l14 14M19 5 5 19'
                      stroke='currentColor'
                      strokeWidth='1.7'
                      strokeLinecap='round'
                    />
                  </svg>
                </button>

                <div className={styles.lightboxImageWrap}>
                  <img
                    className={styles.lightboxImage}
                    src={activeImage.src}
                    alt={activeImage.alt}
                    decoding='async'
                  />

                  {galleryItems.length > 1 && (
                    <>
                      <button
                        className={`${styles.lightboxArrow} ${styles.lightboxArrowPrevious}`}
                        type='button'
                        aria-label='Previous image'
                        onClick={() =>
                          setActiveImageIndex(
                            (activeImageIndex - 1 + galleryItems.length) % galleryItems.length,
                          )
                        }
                      >
                        <svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                          <path
                            d='M15 5 8 12l7 7'
                            stroke='currentColor'
                            strokeWidth='1.7'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>
                      <button
                        className={`${styles.lightboxArrow} ${styles.lightboxArrowNext}`}
                        type='button'
                        aria-label='Next image'
                        onClick={() =>
                          setActiveImageIndex((activeImageIndex + 1) % galleryItems.length)
                        }
                      >
                        <svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                          <path
                            d='m9 5 7 7-7 7'
                            stroke='currentColor'
                            strokeWidth='1.7'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                <div className={styles.lightboxMeta}>
                  <p className={styles.lightboxCaption}>{activeImage.alt}</p>
                  <span className={styles.lightboxCounter} aria-live='polite'>
                    {activeImageIndex + 1} / {galleryItems.length}
                  </span>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
