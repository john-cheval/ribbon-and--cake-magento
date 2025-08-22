import { Box, Typography } from '@mui/material'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { saxoGrammaticus } from '../../../../lib/fonts'

export type EventsCourseTitleProps = {
  id?: number
  title?: string
  length?: number
  isSelected?: boolean
  onClick?: () => void
}

function EventsAndCoursesTile(props: EventsCourseTitleProps) {
  const { id, title, length, isSelected, onClick } = props
  return (
    <Typography
      component='p'
      onClick={onClick}
      sx={{
        fontFamily: `${saxoGrammaticus.style.fontFamily}, sans-serif`,
        color: isSelected
          ? (theme: any) => theme.palette.custom.main
          : (theme: any) => theme.palette.custom.heading,
        fontSize: { xs: '15px', md: '25px', lg: '30px', xl: '35px' },
        textTransform: 'uppercase',
        fontWeight: '300 !important',
        borderBottom: length && length - 1 ? '1px solid #E6E6E6' : '',
        paddingBottom: { md: '10px', lg: '20px' },
        paddingTop: id === 0 ? { md: '10px', lg: '20px' } : { md: '10px', lg: '20px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.4s ease-in-out',
        cursor: 'pointer',
        position: 'relative',

        '&::after': {
          content: '" "',
          width: '90px',
          height: '2px',
          backgroundColor: (theme: any) => theme.palette.custom.heading,
          position: 'absolute',
          bottom: 0,
          visibility: isSelected ? 'visible' : 'hidden',
        },
        '&:hover': {
          color: '#441E14',
        },

        '&:hover .arrow-icon': {
          transform: 'translateX(8px)',
          opacity: 1,
        },
      }}
    >
      {title}

      <Box
        component='span'
        className='arrow-icon'
        sx={{
          transition: 'transform 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          opacity: isSelected ? 1 : 0,
        }}
      >
        <IoIosArrowRoundForward color='#441E14' />
      </Box>
    </Typography>
  )
}

export default EventsAndCoursesTile
