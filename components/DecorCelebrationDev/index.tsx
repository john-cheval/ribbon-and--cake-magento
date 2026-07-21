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
  const workCarouselAnimatingRef = useRef(false)
  const [formMounts, setFormMounts] = useState<HTMLElement[]>([])
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
  const isLightboxOpen = activeImageIndex !== null

  const normalizeWorkCarousel = () => {
    const gallery = contentRef.current?.querySelector<HTMLElement>('.decor-work-gallery')
    if (!gallery) return null

    let track = gallery.querySelector<HTMLElement>('.decor-work-track')
    if (!track) {
      track = document.createElement('div')
      track.className = 'decor-work-track'
      const carouselTrack = track

      Array.from(gallery.children).forEach((child) => {
        if (child.classList.contains('decor-work-card')) carouselTrack.appendChild(child)
      })

      gallery.appendChild(track)
    }

    Array.from(
      contentRef.current?.querySelectorAll<HTMLElement>('.decor-work-arrow') ?? [],
    ).forEach((arrow, index) => {
      if (!arrow.dataset.decorCarouselDirection) {
        const label = arrow.getAttribute('aria-label')?.toLowerCase() ?? ''
        arrow.dataset.decorCarouselDirection =
          label.includes('previous') || index === 0 ? 'prev' : 'next'
      }

      if (!arrow.getAttribute('role')) arrow.setAttribute('role', 'button')
    })

    return track
  }

  useEffect(() => {
    const mounts = Array.from(
      contentRef.current?.querySelectorAll<HTMLElement>('[data-decor-custom-form]') ?? [],
    )
    setFormMounts(mounts)

    normalizeWorkCarousel()

    const cards = Array.from(
      contentRef.current?.querySelectorAll<HTMLElement>('.decor-work-card') ?? [],
    )

    cards.forEach((card, index) => {
      if (!card.dataset.decorGalleryIndex) card.dataset.decorGalleryIndex = String(index)
    })

    const images = cards
      .map((card, fallbackIndex) => ({
        index: Number(card.dataset.decorGalleryIndex ?? fallbackIndex),
        image: card.querySelector<HTMLImageElement>('img'),
      }))
      .filter((entry): entry is { index: number; image: HTMLImageElement } => Boolean(entry.image))
      .sort((a, b) => a.index - b.index)
      .map(({ image }) => ({
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

  const moveWorkCarousel = (direction: -1 | 1) => {
    const gallery = contentRef.current?.querySelector<HTMLElement>('.decor-work-gallery')
    const track = gallery?.querySelector<HTMLElement>('.decor-work-track') ?? normalizeWorkCarousel()
    if (!gallery || !track || workCarouselAnimatingRef.current) return

    const cards = Array.from(track.querySelectorAll<HTMLElement>('.decor-work-card'))
    const shiftCount = Math.min(2, cards.length)
    if (shiftCount < 2) return

    const firstCard = cards[0]
    const trackStyles = window.getComputedStyle(track)
    const columnGap =
      Number.parseFloat(trackStyles.columnGap || trackStyles.gap || '0') ||
      Number.parseFloat(trackStyles.gap || '0') ||
      0
    const slideDistance = firstCard.getBoundingClientRect().width + columnGap
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const transition = prefersReducedMotion
      ? 'none'
      : 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)'
    let fallbackTimer: number | undefined

    const unlockCarousel = () => {
      workCarouselAnimatingRef.current = false
    }

    const resetTrack = () => {
      if (fallbackTimer) window.clearTimeout(fallbackTimer)
      track.removeEventListener('transitionend', finishNext)
      track.removeEventListener('transitionend', finishPrevious)
      track.style.transition = 'none'
      track.style.transform = 'translate3d(0, 0, 0)'
      window.requestAnimationFrame(() => {
        track.style.transition = ''
        unlockCarousel()
      })
    }

    const finishNext = (event?: TransitionEvent) => {
      if (event && event.target !== track) return
      cards.slice(0, shiftCount).forEach((card) => track.appendChild(card))
      resetTrack()
    }

    const finishPrevious = (event?: TransitionEvent) => {
      if (event && event.target !== track) return
      resetTrack()
    }

    workCarouselAnimatingRef.current = true

    if (direction > 0) {
      track.style.transition = transition
      track.style.transform = `translate3d(-${slideDistance}px, 0, 0)`

      if (prefersReducedMotion) {
        finishNext()
      } else {
        track.addEventListener('transitionend', finishNext)
        fallbackTimer = window.setTimeout(finishNext, 520)
      }
      return
    }

    cards
      .slice(-shiftCount)
      .reverse()
      .forEach((card) => track.insertBefore(card, track.firstElementChild))

    track.style.transition = 'none'
    track.style.transform = `translate3d(-${slideDistance}px, 0, 0)`
    void track.offsetHeight

    window.requestAnimationFrame(() => {
      track.style.transition = transition
      track.style.transform = 'translate3d(0, 0, 0)'

      if (prefersReducedMotion) {
        finishPrevious()
      } else {
        track.addEventListener('transitionend', finishPrevious)
        fallbackTimer = window.setTimeout(finishPrevious, 520)
      }
    })
  }

  const handleContentClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target
    if (!(target instanceof Element)) return

    const carouselArrow = target.closest<HTMLElement>('.decor-work-arrow')
    if (
      carouselArrow &&
      contentRef.current?.contains(carouselArrow) &&
      carouselArrow.closest('.decor-work-arrows')
    ) {
      event.preventDefault()
      const label = carouselArrow.getAttribute('aria-label')?.toLowerCase() ?? ''
      const direction =
        carouselArrow.dataset.decorCarouselDirection === 'prev' || label.includes('previous')
          ? -1
          : 1
      moveWorkCarousel(direction)
      return
    }

    const card = target.closest<HTMLElement>('.decor-work-card')
    if (!card || !contentRef.current?.contains(card)) return

    const imageIndex = Number(card.dataset.decorGalleryIndex)
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
