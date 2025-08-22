import { Typography } from '@mui/material'
import { EventsCourseTitleProps } from '../EventsAndCoursesTile'

function EventsAndCoursesTileResponsive(props: EventsCourseTitleProps) {
  const { id, title, length, isSelected, onClick } = props

  return (
    <Typography
      onClick={onClick}
      sx={{
        backgroundColor: isSelected ? (theme: any) => theme.palette.custom.border : 'transparent',
        border: '1px solid #F6DBE0',
        color: isSelected
          ? (theme: any) => theme.palette.custom.smallHeading
          : (theme: any) => theme.palette.custom.secondary,
        padding: { xs: '6px 20px', sm: '10px 24px' },
        cursor: 'pointer',
        borderRadius: '999px',
        transition: 'all 0.3s ease',
        fontSize: { xs: '15px', md: '16px' },
        fontWeight: 400,
      }}
    >
      {' '}
      {title}
    </Typography>
  )
}

export default EventsAndCoursesTileResponsive
