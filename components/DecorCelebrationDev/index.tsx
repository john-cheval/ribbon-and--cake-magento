import styles from './DecorCelebrationDev.module.css'

export type DecorCelebrationDevProps = {
  content: string
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
  return <main className={styles.cmsContent} dangerouslySetInnerHTML={{ __html: content }} />
}
