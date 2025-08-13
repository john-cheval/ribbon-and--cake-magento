import { Box } from '@mui/material'

export function HomeCta(props) {
  const { content } = props

  return (
    <Box
      component='section'
      className='cta-action'
      sx={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </Box>
  )
}
