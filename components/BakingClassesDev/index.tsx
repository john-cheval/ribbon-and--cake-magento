import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import BakingClassesCustomForm from './BakingClassesCustomForm'
import styles from './BakingClassesDev.module.css'

export type BakingClassesDevProps = {
  content: string
}

export function isBakingClassesDevContent(content?: string | null) {
  if (!content) return false

  return (
    content.includes('baking-dev-hero') ||
    content.includes('baking-dev-admin-guide') ||
    content.includes('data-baking-dev-admin-section')
  )
}

export default function BakingClassesDev(props: BakingClassesDevProps) {
  const { content } = props
  const contentRef = useRef<HTMLElement>(null)
  const [formMounts, setFormMounts] = useState<HTMLElement[]>([])

  useEffect(() => {
    document.querySelectorAll('[data-next-hide-fouc]').forEach((element) => element.remove())
    document.body.style.display = 'block'
  }, [])

  useEffect(() => {
    const mounts = Array.from(
      contentRef.current?.querySelectorAll<HTMLElement>('[data-baking-custom-form]') ?? [],
    )
    setFormMounts(mounts)
  }, [content])

  useEffect(() => {
    const root = contentRef.current
    if (!root) return

    const items = Array.from(root.querySelectorAll<HTMLDetailsElement>('.baking-dev-faq details'))
    if (!items.length) return

    items
      .filter((item) => item.open)
      .slice(1)
      .forEach((item) => item.removeAttribute('open'))

    const cleanupFns = items.map((item) => {
      const handleToggle = () => {
        if (!item.open) return

        items.forEach((otherItem) => {
          if (otherItem !== item) otherItem.removeAttribute('open')
        })
      }

      item.addEventListener('toggle', handleToggle)
      return () => item.removeEventListener('toggle', handleToggle)
    })

    return () => cleanupFns.forEach((cleanup) => cleanup())
  }, [content])

  useEffect(() => {
    const root = contentRef.current
    if (!root) return

    const sections = Array.from(root.querySelectorAll<HTMLElement>('.baking-dev-parent-reviews'))
    if (!sections.length) return

    const cleanupFns = sections.map((section) => {
      const track = section.querySelector<HTMLElement>('.baking-dev-parent-review-grid')
      const prevButton = section.querySelector<HTMLButtonElement>(
        '.baking-dev-parent-reviews__nav-button--prev',
      )
      const nextButton = section.querySelector<HTMLButtonElement>(
        '.baking-dev-parent-reviews__nav-button--next',
      )

      if (!track || !prevButton || !nextButton) return () => {}

      const getCards = () =>
        Array.from(track.querySelectorAll<HTMLElement>('.baking-dev-parent-review-card'))

      const getScrollStep = () => {
        const card = getCards()[0]
        const trackStyle = window.getComputedStyle(track)
        const gap = Number.parseFloat(trackStyle.columnGap || trackStyle.gap || '0') || 0

        return (card?.getBoundingClientRect().width || track.clientWidth) + gap
      }

      const getVisibleCardCount = () => {
        const step = getScrollStep()
        if (!step) return 1

        return Math.max(1, Math.round((track.clientWidth + 1) / step))
      }

      const getCurrentIndex = () => {
        const step = getScrollStep()
        if (!step) return 0

        return Math.max(0, Math.round(track.scrollLeft / step))
      }

      const updateButtons = () => {
        const cards = getCards()
        const visibleCardCount = getVisibleCardCount()
        const maxIndex = Math.max(cards.length - visibleCardCount, 0)
        const currentIndex = Math.min(getCurrentIndex(), maxIndex)
        const hasOverflow = cards.length > visibleCardCount

        prevButton.disabled = !hasOverflow || currentIndex <= 0
        nextButton.disabled = !hasOverflow || currentIndex >= maxIndex
      }

      const scrollToCard = (direction: -1 | 1) => {
        const cards = getCards()
        const visibleCardCount = getVisibleCardCount()
        const maxIndex = Math.max(cards.length - visibleCardCount, 0)
        const nextIndex = Math.min(Math.max(getCurrentIndex() + direction, 0), maxIndex)

        track.scrollTo({ left: nextIndex * getScrollStep(), behavior: 'smooth' })
        window.setTimeout(updateButtons, 360)
      }

      const scrollPrev = () => scrollToCard(-1)
      const scrollNext = () => scrollToCard(1)

      prevButton.addEventListener('click', scrollPrev)
      nextButton.addEventListener('click', scrollNext)
      track.addEventListener('scroll', updateButtons, { passive: true })
      window.addEventListener('resize', updateButtons)

      const resizeObserver =
        typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateButtons) : null
      resizeObserver?.observe(track)

      window.requestAnimationFrame(updateButtons)
      window.setTimeout(updateButtons, 250)

      return () => {
        prevButton.removeEventListener('click', scrollPrev)
        nextButton.removeEventListener('click', scrollNext)
        track.removeEventListener('scroll', updateButtons)
        window.removeEventListener('resize', updateButtons)
        resizeObserver?.disconnect()
      }
    })

    return () => cleanupFns.forEach((cleanup) => cleanup())
  }, [content])

  return (
    <>
      <main
        ref={contentRef}
        className={`${styles.cmsContent} baking-dev-page`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {formMounts.map((mount, index) => {
        const identifier = mount.dataset.bakingCustomForm
        if (!identifier) return null

        return createPortal(
          <BakingClassesCustomForm identifier={identifier} />,
          mount,
          `${identifier}-${index}`,
        )
      })}
    </>
  )
}
