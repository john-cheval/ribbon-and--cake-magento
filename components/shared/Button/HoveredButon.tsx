import { Box } from '@mui/material'
import Link from 'next/link'
import { IoArrowForwardCircleSharp } from 'react-icons/io5'
import { HoveredButtonProps } from '../types/buttonTypes'
import { css } from '@emotion/react'

export function HoveredButton({
  href,
  text,
  isArrow = true,
  padding = '24px 20px',
  height = 'auto',
  width = '250px',
  color = '#441E14',
  backgroundColor = '#F6DBE0',
  hoverColor = '#fff',
  hoverBackgroundColor = '#9B7C38',
}: HoveredButtonProps) {
  const buttonStyles = css`
    display: flex;
    align-items: center;
    column-gap: 8px;
    position: relative;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 158%;
    letter-spacing: 0%;
    width: ${width};
    height: ${height};
    padding: ${padding};
    overflow: hidden;
    border-radius: 4px;
    cursor: pointer;
    z-index: 1;
    color: ${color};
    transition: color 0.5s ease;
    text-decoration: none;

    &:hover {
      color: ${hoverColor};
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 50%;
      background-color: ${backgroundColor};
      border-radius: 4px;
      z-index: -1;
      transition: all 0.5s ease;
    }

    &:hover::before {
      background-color: ${hoverBackgroundColor};
      width: 100%;
    }

    .arrow-icon {
      display: inline-flex;
      transition: transform 0.5s ease;
    }

    &:hover .arrow-icon {
      transform: translateX(5px);
    }
  `
  return (
    <Link href={href || '/'} passHref legacyBehavior>
      <Box component='a' css={buttonStyles}>
        {text}
        {isArrow && (
          <Box component='span' className='arrow-icon'>
            <IoArrowForwardCircleSharp />
          </Box>
        )}
      </Box>
    </Link>
  )
}
