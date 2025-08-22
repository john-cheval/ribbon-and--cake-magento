import { css } from '@emotion/react'
import { Box } from '@mui/material'
import Link from 'next/link'
import { OrderPrimaryButtonProps } from '../../types/buttonTypes'

export function OrderPrimaryButton({
  padding = '19px 80px',
  color = '#302100',
  href,
  text,
  backgroundColor = 'linear-gradient(90deg, #F6DBE0 0%, #F1A8B6 100%)',
  hoverBackgroundColor = 'linear-gradient(180deg, #F6DBE0 0%, #F1A8B6 100%)',
  hoverColor = '#302100',
}: OrderPrimaryButtonProps) {
  const buttonStyles = css`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 8px;
    position: relative;
    font-weight: 500;
    line-height: 158%;
    letter-spacing: 0%;
    overflow: hidden;
    border-radius: 4px;
    cursor: pointer;
    z-index: 1;
    color: ${color};
    transition: color 0.5s ease;
    text-decoration: none;
    border: 1px solid #9b7c38;
    background: ${backgroundColor};
    width: fit-content;

    &:hover {
      color: ${hoverColor};
      background: ${hoverBackgroundColor};
    }
  `
  return (
    <Link href={href || '/order'} passHref legacyBehavior>
      <Box
        component='a'
        css={buttonStyles}
        sx={{
          fontSize: { xs: '15px', md: '16px' },
          padding: { xs: '16px 60px', lg: padding },
        }}
      >
        {text}
      </Box>
    </Link>
  )
}
