// import { Image } from '@graphcommerce/image'
// import { AddProductsToCartFab, AddProductsToCartForm } from '@graphcommerce/magento-product'
// import { iconShoppingBag } from '@graphcommerce/next-ui'
// // import { AddProductsToCartFab } from '@graphcommerce/magento-product'
// import { Box, Typography } from '@mui/material'
// import { IoIosHeartEmpty } from 'react-icons/io'
// import { IoBagHandleOutline } from 'react-icons/io5'
// // import { iconShoppingBag } from '../../../plugins/icons'
// import dhirams from '../dhirams.svg'
// import type { ProductCardProps } from '../types/cardTypes'
//
// export function ProductCard({
//   item,
//   imageWidth = 356,
//   imageHeight = 356,
//   iconPosition = 'right',
//   right = '29px',
//   left = '29px',
//   top = '24px',
//   padding = '16px',
//   sku,
// }: ProductCardProps) {
//   if (!item) {
//     return null
//   }
//   const product = item
//   const isLeftIcon = iconPosition === 'left'
//
//   // const ActionIcon = isLeftIcon ? IoIosHeartEmpty : IoBagHandleOutline
//   // const currentIconHoverColor = isLeftIcon ? '#F1A8B6' : iconColor
//
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         gap: { xs: '5px', md: '8px', lg: '13px' },
//         flexDirection: 'column',
//         transition: 'all 0.3s ease-in-out',
//         overflow: 'hidden',
//         transformOrigin: 'top',
//       }}
//     >
//       <Box sx={{ position: 'relative' }}>
//         <Image
//           src={item?.image}
//           alt={item?.title || 'product Image'}
//           width={imageWidth}
//           height={imageHeight}
//           sizes='100vw'
//           sx={{
//             borderRadius: '8px',
//           }}
//         />
//
//         <Box
//           component='div'
//           sx={{
//             position: 'absolute',
//             right: { xs: '10px', md: right },
//             // left: isLeftIcon ? left : 'auto',
//             top: { xs: '10px', md: top },
//             backgroundColor: (theme: any) => theme.palette.primary.contrastText,
//             color: (theme: any) => theme.palette.custom.wishlistColor,
//             zIndex: 5,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'cemter',
//             columnGap: '4px',
//             padding: { xs: '10px', md: padding },
//             borderRadius: '50%',
//             width: 'fit-content',
//             cursor: 'pointer',
//             transition: 'all 0.3s ease',
//           }}
//         >
//           <IoIosHeartEmpty size='18px' />
//         </Box>
//       </Box>
//
//       <Box
//         component='div'
//         sx={{
//           display: 'flex',
//           position: 'relative',
//           justifyContent: 'space-between',
//           columnGap: '15px',
//           alignItems: 'center',
//         }}
//       >
//         <Box component='div'>
//           <Typography
//             component='p'
//             variant='p'
//             style={{
//               marginBottom: '6px',
//             }}
//           >
//             {item?.title}
//           </Typography>
//
//           {item?.startPrice && item?.endPrice && (
//             <Box component='div' sx={{ display: 'flex', columnGap: '3px' }}>
//               <Typography
//                 component='p'
//                 variant='p'
//                 style={{
//                   fontWeight: 800,
//                   display: 'flex',
//                   gap: '3px',
//                   alignItems: 'center',
//                 }}
//               >
//                 <Image
//                   src={dhirams}
//                   alt='Dhirams'
//                   width={18}
//                   height={18}
//                   sizes='100vw'
//                   sx={{ width: { xs: '14px', md: '18px' }, maxWidth: '18px' }}
//                 />
//                 {item?.startPrice}
//               </Typography>
//
//               <span style={{ color: '#000', fontWeight: 800 }}>-</span>
//
//               <Typography
//                 component='p'
//                 variant='p'
//                 style={{
//                   fontWeight: 800,
//                   display: 'flex',
//                   gap: '3px',
//                   alignItems: 'center',
//                 }}
//               >
//                 <Image
//                   src={dhirams}
//                   alt='Dhirams'
//                   width={18}
//                   height={18}
//                   sizes='100vw'
//                   sx={{ width: { xs: '14px', md: '18px' }, maxWidth: '18px' }}
//                 />
//                 {item?.endPrice}
//               </Typography>
//             </Box>
//           )}
//
//           {item?.price && (
//             <Box component='div' sx={{ display: 'flex', columnGap: '3px', alignItems: 'center' }}>
//               <Typography
//                 component='p'
//                 variant='p'
//                 style={{
//                   fontWeight: 800,
//                   display: 'flex',
//                   gap: '3px',
//                   alignItems: 'center',
//                 }}
//               >
//                 <Image
//                   src={dhirams}
//                   alt='Dhirams'
//                   width={18}
//                   height={18}
//                   sizes='100vw'
//                   sx={{
//                     width: { xs: '14px', md: '18px' },
//                     maxWidth: '18px',
//                     // objectFit: 'cover',
//                   }}
//                 />
//                 {item?.price}
//               </Typography>
//             </Box>
//           )}
//         </Box>
//
//         {/*  <Box
//           component='div'
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             columnGap: '4px',
//             justifyContent: 'center',
//             backgroundColor: (theme: any) => theme.palette.custom.border,
//             color: (theme: any) => theme.palette.custom.main,
//             padding: '17px',
//             borderRadius: '50%',
//             width: 'fit-content',
//             cursor: 'pointer',
//             border: '1px solid #F6DBE0 ',
//             transition: 'all 0.3s ease',
//             '&:hover': {
//               backgroundColor: 'transparent',
//             },
//           }}
//         >
//           <IoBagHandleOutline size='18px' />
//         </Box>
//         */}
//         <AddProductsToCartForm>
//           <AddProductsToCartFab
//             sku={item?.sku || '1'}
//             icon={iconShoppingBag}
//             sx={{
//               backgroundColor: '#F6DBE0 !important',
//               display: 'inline-flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: '#441E14!important',
//               boxShadow: 'none !important',
//               padding: { xs: '8px', md: '12px' },
//               borderRadius: '50%',
//               width: 'fit-content',
//               height: 'fit-content',
//               transition: 'all 0.4s ease',
//               ['& .MuiBox-root']: {
//                 left: { xs: '6px', md: '8px' },
//                 top: { xs: '2px', md: '3px' },
//                 position: 'relative',
//               },
//               '& svg': {
//                 fontSize: { xs: '24px', md: '27px', xl: '30px' },
//                 stroke: 'unset !important',
//               },
//               '&:hover': {
//                 backgroundColor: 'transparent !important',
//                 color: '#441E14 !important',
//                 border: '1px solid #F6DBE0 !important',
//               },
//             }}
//           />
//         </AddProductsToCartForm>
//       </Box>
//     </Box>
//   )
// }
//
