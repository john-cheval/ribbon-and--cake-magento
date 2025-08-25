import { Box, styled, Typography } from '@mui/material'
import { m } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa6'
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
          //display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '30px',
          overflowY: 'auto',
        }}
      >
        {/* Close Button */}
        <Box
          onClick={() => setIsOpen(false)}
          sx={{
            cursor: 'pointer',
            alignSelf: 'flex-end',
            textAlign: 'right',

            '& svg': {
              fontWeight: 400,
              fontSize: '25px',
            },
          }}
        >
          <IoClose />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          {/* Animated Links */}
          {more.map((item, i) => (
            <MotionDiv
              key={item.id}
              custom={i}
              initial='hidden'
              animate='visible'
              exit='hidden'
              onClick={() => setIsOpen(false)}
              variants={drawerVariants}
              sx={{
                borderBottom: '1px solid #d4d4d4',
                width: '100%',
                paddingBottom: '20px',
              }}
            >
              <Link href={item.link} passHref legacyBehavior>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '18px',
                      fontWeight: 400,
                      color: '#000',
                      textDecoration: 'none',
                      lineHeight: '120%',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Typography>

                  <FaArrowRight color='#F6DBE0' size={20} />
                </Box>
              </Link>
            </MotionDiv>
          ))}
        </Box>
      </MotionDiv>
    </>
  )
}

export default MenuDrawer
