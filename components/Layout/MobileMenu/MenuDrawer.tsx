import { Box, styled, Typography } from '@mui/material'
import { m } from 'framer-motion'
import Link from 'next/link'
import { IoClose } from 'react-icons/io5'
import { drawerVariants } from '../../../constants/animationVariation'

const MotionDiv = styled(m.div)({})

function MenuDrawer({ isOpen, setIsOpen, more }) {
  return (
    <>
      <MotionDiv
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        sx={{
          position: 'fixed',
          top: { xs: '65px', md: '80px' },
          left: 0,
          bottom: '80px',
          width: '100%',
          // height: '100vh',
          backgroundColor: 'white',
          zIndex: 9999,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '20px',
          overflowY: 'auto',
        }}
      >
        {/* Close Button */}
        <Box
          onClick={() => setIsOpen(false)}
          sx={{
            fontSize: '18px',
            fontWeight: 600,
            cursor: 'pointer',
            alignSelf: 'flex-end',
          }}
        >
          <IoClose />
        </Box>

        {/* Animated Links */}
        {more.map((item, i) => (
          <MotionDiv
            key={item.id}
            custom={i}
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={drawerVariants}
          >
            <Link href={item.link}>
              <Typography
                sx={{
                  fontSize: '18px',
                  fontWeight: 500,
                  color: '#000',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Typography>
            </Link>
          </MotionDiv>
        ))}
      </MotionDiv>
    </>
  )
}

export default MenuDrawer
