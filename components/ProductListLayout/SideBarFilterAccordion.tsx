import { Checkbox, FormControlLabel } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { GoPlus } from 'react-icons/go'
import { LuMinus } from 'react-icons/lu'

export default function SideBarFilterAccordion({
  linksData,
  expanded,
  onChange,
  id,
  selectedCategory,
  onSelect,
}) {
  return (
    <div>
      <Accordion
        sx={{
          backgroundColor: 'transparent ',
          boxShadow: 'none',
          borderRadius: 'none',
        }}
        expanded={expanded}
        onChange={onChange}
      >
        <AccordionSummary
          expandIcon={
            expanded ? <LuMinus size={20} color='#F1A8B6' /> : <GoPlus size={20} color='#F1A8B6' />
          }
          aria-controls='panel1-content'
          id='panel1-header'
          sx={{
            '& .MuiAccordionSummary-content': {
              margin: '15px 0',
            },
            padding: '0 !important',
            fontSize: { xs: '16px', md: '18px' },
            fontWeight: 400,
            '& svg': {
              color: (theme: any) => theme.palette.custom.dark,
            },
          }}
        >
          <Typography
            component='span'
            sx={{
              color: (theme: any) => theme.palette.custom.dark,
              fontSize: { xs: '16px', md: '18px' },
              fontWeight: 400,
              lineHeight: '120%',
            }}
          >
            {linksData?.name ? linksData?.name : 'hello'}
          </Typography>
        </AccordionSummary>

        {linksData?.children?.length > 0 &&
          linksData?.children?.map((link, index) => (
            <AccordionDetails
              key={index}
              sx={{
                padding: { xs: '2px 0px 0px', md: '8px 0px 0px' },
                fontSize: '16px',
                lineHeight: '120%',
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={link?.url_path?.includes(selectedCategory) || false}
                    onChange={() => onSelect(link?.url_path)}
                    sx={{
                      '&.Mui-checked': {
                        color: '#F1A8B6',
                      },
                    }}
                  />
                }
                label={link?.name}
              />

              {/*   <Link href={link?.url_key || ''}>{link?.name}</Link>*/}
            </AccordionDetails>
          ))}
      </Accordion>
    </div>
  )
}
