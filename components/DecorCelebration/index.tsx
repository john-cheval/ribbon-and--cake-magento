import styles from './DecorCelebration.module.css'

export type DecorCelebrationProps = {
  content: string
}

export function isDecorCelebrationContent(content?: string | null) {
  if (!content) return false

  return (
    content.includes('decor-hero') ||
    content.includes('decor-planning-section') ||
    content.includes('decor-admin-guide') ||
    content.includes('data-decor-admin-section')
  )
}

export default function DecorCelebration(props: DecorCelebrationProps) {
  const { content } = props
  return <main className={styles.cmsContent} dangerouslySetInnerHTML={{ __html: content }} />
}
