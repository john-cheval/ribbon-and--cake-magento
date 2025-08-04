'use client'

import { Box, styled, Typography } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
// import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import { FaWhatsapp } from 'react-icons/fa6'
import { GoHome } from 'react-icons/go'
import { IoMenuSharp } from 'react-icons/io5'
import { MdOutlineInterests } from 'react-icons/md'
import MenuDrawer from './MenuDrawer'

const moreMenu = [
  { id: 1, title: 'About', link: '/about' },
  { id: 2, title: 'Events', link: '/events' },
  { id: 3, title: 'Courses', link: '/courses' },
  { id: 4, title: 'Checkout', link: '/checkout' },
  { id: 5, title: 'Login / Register', link: '/account/sigin' },
]

function MobileMenu() {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <>
      <Link href='/'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '4px',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <GoHome size={20} />
          <Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}>Home</Typography>
        </Box>
      </Link>

      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '4px',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <MdOutlineInterests size={20} />
          <Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}>Shop</Typography>
        </Box>
      </Box>

      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '4px',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <AiOutlineShopping size={20} />
          <Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}>Cart</Typography>
        </Box>
      </Box>

      <Link href='/'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '4px',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <FaWhatsapp size={20} />
          <Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}>
            WhatsApp
          </Typography>
        </Box>
      </Link>

      <Box onClick={() => setOpenDrawer(!openDrawer)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '4px',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <IoMenuSharp size={20} />
          <Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}>More</Typography>
        </Box>
      </Box>

      {/* moreMenu */}
      <AnimatePresence>
        {openDrawer && <MenuDrawer isOpen={openDrawer} setIsOpen={setOpenDrawer} more={moreMenu} />}
      </AnimatePresence>
    </>
  )
}

export default MobileMenu
