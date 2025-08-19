'use client'

import { Box, styled, Typography } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
// import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import { FaWhatsapp } from 'react-icons/fa6'
import { GoHome } from 'react-icons/go'
import { IoMenuSharp } from 'react-icons/io5'
import { MdOutlineInterests } from 'react-icons/md'
import MenuDrawer from './MenuDrawer'
import ShopMenuDrawer from './ShopMenuDrawer'

const moreMenu = [
  { id: 1, title: 'About', link: '/about' },
  { id: 2, title: 'Events', link: '/events' },
  { id: 3, title: 'Courses', link: '/courses' },
  { id: 4, title: 'Checkout', link: '/checkout' },
  { id: 5, title: 'Login / Register', link: '/account/sigin' },
]

function MobileMenu({ ShopCategories }) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openshopMenu, setOpenShopMenu] = useState(false)
  const router = useRouter()
  const currentPath = router?.pathname
  const splittedPath = currentPath.split('/').filter(Boolean)[0]
  const isMatch = moreMenu.some((menu) => {
    if (menu.link.startsWith('/courses')) {
      return router.pathname.startsWith('/courses')
    }
    return menu.link === splittedPath
  })

  const handleShopMenuOpen = () => {
    setOpenShopMenu(!openshopMenu)
    setOpenDrawer(false)
  }

  const handleMoreMenuOpen = () => {
    setOpenDrawer(!openDrawer)
    setOpenShopMenu(false)
  }

  const handleCloseAllOtherPopups = () => {
    setOpenDrawer(false)
    setOpenShopMenu(false)
  }

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
            color: currentPath === '/' ? '#D23552' : '#441E14',
          }}
        >
          <GoHome size={20} />
          <Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}>Home</Typography>
        </Box>
      </Link>

      <Box onClick={handleShopMenuOpen}>
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

      <Link href='/cart' onClick={handleCloseAllOtherPopups}>
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '4px',
              alignItems: 'center',
              cursor: 'pointer',
              color: currentPath === '/cart' ? '#D23552' : '#441E14',
            }}
          >
            <AiOutlineShopping size={20} />
            <Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}>Cart</Typography>
          </Box>
        </Box>
      </Link>

      <Link href='https://api.whatsapp.com/send/?phone=971528899029&text&type=phone_number&app_absent=0'>
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

      <Box onClick={handleMoreMenuOpen}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '4px',
            alignItems: 'center',
            cursor: 'pointer',
            color: isMatch ? '#D23552' : '#441E14',
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

      {/* Shop Menu */}
      <AnimatePresence>
        {openshopMenu && (
          <ShopMenuDrawer
            isOpen={openshopMenu}
            setIsOpen={setOpenShopMenu}
            shopMenu={ShopCategories}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default MobileMenu
