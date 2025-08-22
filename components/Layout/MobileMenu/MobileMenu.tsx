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

// import ShopMenuDrawer from './ShopMenuDrawer'

const moreMenu = [
  { id: 1, title: 'Cakes', link: '/cakes' },
  { id: 2, title: "Chef's Special", link: '/chef-s-special' },
  { id: 3, title: 'Corporate Events', link: '/events' },
  { id: 4, title: 'Baking Classes', link: '/courses' },
  { id: 5, title: 'Login/Signup', link: '/account/sigin' },
  { id: 6, title: 'Orders', link: '/account/orders' },
  { id: 7, title: 'About', link: '/about' },
  { id: 8, title: 'Events', link: '/events' },
  { id: 9, title: 'Home', link: '/' },
]

function MobileMenu({ ShopCategories }) {
  const [openDrawer, setOpenDrawer] = useState(true)
  //  const [openshopMenu, setOpenShopMenu] = useState(false)
  const router = useRouter()
  const currentPath = router?.pathname
  const isMatch = moreMenu.some((menu) => {
    return currentPath.startsWith(menu.link)
  })

  const handleMoreMenuOpen = () => {
    setOpenDrawer(!openDrawer)
  }

  const handleCloseAllOtherPopups = () => {
    setOpenDrawer(false)
  }

  console.log(router, 'this is the router')
  console.log(currentPath, 'this is the current path')

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

      <Link href='/shop' onClick={handleCloseAllOtherPopups}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '4px',
            alignItems: 'center',
            cursor: 'pointer',
            color: router?.asPath === '/shop' ? '#D23552' : '#441E14',
          }}
        >
          <MdOutlineInterests size={20} />
          <Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}>Shop</Typography>
        </Box>
      </Link>

      <Link href='/cart' onClick={handleCloseAllOtherPopups}>
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '4px',
              alignItems: 'center',
              cursor: 'pointer',
              color: router.asPath === '/cart' ? '#D23552' : '#441E14',
            }}
          >
            <AiOutlineShopping size={20} />
            <Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}>Cart</Typography>
          </Box>
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

      {/* Shop Menu 
      <AnimatePresence>
        {openshopMenu && (
          <ShopMenuDrawer
            isOpen={openshopMenu}
            setIsOpen={setOpenShopMenu}
            shopMenu={ShopCategories}
          />
        )}
      </AnimatePresence>*/}
    </>
  )
}

export default MobileMenu
