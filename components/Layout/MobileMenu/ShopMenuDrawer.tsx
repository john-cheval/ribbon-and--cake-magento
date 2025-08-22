import { Box, Button, styled, Typography } from '@mui/material'
import { m } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { drawerVariants } from '../../../constants/animationVariation'
import MenuAccordion from './MenuAccordion'

const MotionDiv = styled(m.div)({})

function ShopMenuDrawer({ isOpen, setIsOpen, shopMenu }) {
  const router = useRouter()
  const [expandedPanel, setExpandedPanel] = useState<number | null>(null)
  const handleChange =
    (panelIndex: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedPanel(isExpanded ? panelIndex : null)
    }
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  useEffect(() => {
    const pathParts = router.asPath.split('/')
    const categoryFromUrl = pathParts[pathParts.length - 1]
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [router.asPath])
  const handleSearch = () => {
    if (selectedCategory) {
      router.push(`/${selectedCategory.toLocaleLowerCase()}`)
      setIsOpen(false)
    }
  }

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
          // gap: '20px',
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #d4d4d4',
            paddingBottom: { xs: '15px', md: '30px' },
          }}
        >
          <Typography
            sx={{ color: '#000', fontSize: { xs: '18px', md: '20px' }, lineHeight: '24px' }}
          >
            Shop by Category{' '}
          </Typography>
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
        </Box>
        {/* Close Button */}

        {/* Animated Links */}

        {shopMenu?.map((menu, i) => {
          return (
            <MotionDiv
              key={menu?.uid}
              custom={i}
              initial='hidden'
              animate='visible'
              exit='hidden'
              variants={drawerVariants}
              sx={{
                borderBottom: '1px solid #d4d4d4',
                width: '100%',
              }}
            >
              <MenuAccordion
                linksData={menu}
                expanded={expandedPanel === i}
                onChange={handleChange(i)}
                id={isOpen}
                selectedCategory={selectedCategory}
                onSelect={(categoryUid: string) => setSelectedCategory(categoryUid)}
              />
            </MotionDiv>
          )
        })}

        <Button
          onClick={handleSearch}
          sx={{
            marginTop: '18px',
            backgroundColor: '#441e14',
            color: '#f6f6f6',
            fontSize: { xs: '15px', md: '16px' },
            textAlign: 'center',
            fontWeight: 400,
            padding: '14px 24px',
            borderRadius: '4px',
            width: '100%',
            border: '1px solid #441e14',
            transition: 'color 0.3s ease',
            '&:hover': {
              backgroundColor: '#fff',
              color: '#441e14',
            },
          }}
        >
          Search
        </Button>
      </MotionDiv>
    </>
  )
}

export default ShopMenuDrawer
