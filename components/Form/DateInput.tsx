// CustomizedCakeDate.tsx
import { FormRow } from '@graphcommerce/next-ui';
import { Trans } from '@lingui/react';
// import { Trans } from '@lingcommerce/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

// Define the props the component will receive from the Controller
interface CustomizedCakeDateProps {
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
  // You can add more props like `label`, `minDate`, etc. as needed
}

export default function CustomizedCakeDate({ value, onChange }: CustomizedCakeDateProps) {
  const [open, setOpen] = useState(false);

  return (
    <FormRow
      sx={{
        '& .mui-style-1bsurzk-MuiFormControl-root-MuiTextField-root': {
          paddingTop: '8px',
        },
        '& .MuiPickersOutlinedInput-notchedOutline': {
          border: (theme) => `1px solid ${theme.palette.custom.border}`,
        },
        '& .mui-style-1orawlc-MuiPickersInputBase-root-MuiPickersOutlinedInput-root.Mui-focused:not(.Mui-error) .MuiPickersOutlinedInput-notchedOutline ':
        {
          borderWidth: '1px',
          borderColor: (theme) => theme.palette.custom.border,
        },
        '& .mui-style-1orawlc-MuiPickersInputBase-root-MuiPickersOutlinedInput-root:hover .MuiPickersOutlinedInput-notchedOutline':
        {
          borderColor: (theme) => theme.palette.custom.border,
        },
        '& .MuiInputAdornment-root .MuiSvgIcon-root': {
          fill: (theme) => theme.palette.custom.wishlistColor,
        },
        '& .mui-style-rlw1et-MuiButtonBase-root-MuiIconButton-root:hover': {
          backgroundColor: 'transparent',
        },
        '& .MuiPickersSectionList-root span': {
          color: (theme) => theme.palette.custom.main,
        },

      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={['DatePicker']}
          sx={{
            '& .MuiPickersOutlinedInput-notchedOutline': {
              borderColor: '#D5B1B8 !important',
              borderWidth: '1px !important',
            },
          }}
        >
          <DatePicker
            open={open}
            onClose={() => setOpen(false)}
            label={<Trans id='Event date' />}
            format="DD/MM/YYYY"
            value={value} // Use the value prop
            onChange={onChange} // Use the onChange prop
            minDate={dayjs()}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
                sx: {
                  cursor: '!important',
                  '& .MuiInputLabel-root': {
                    color: (theme) => theme.palette.custom.main,
                    fontSize: { xs: '15px', md: '16px' },
                    fontWeight: 400,
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: (theme) => theme.palette.custom.border,
                    },
                    '&:hover fieldset': {
                      borderColor: (theme) => theme.palette.custom.wishlistColor,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: (theme) => theme.palette.custom.wishlistColor,
                    },
                  },
                  '& input': {
                    color: (theme) => theme.palette.custom.main,
                    cursor: 'pointer !important',
                  },

                  '& .MuiPickersInputBase-sectionsContainer': {
                    cursor: 'pointer !important',
                  },
                },
                inputProps: {
                  readOnly: true,
                  tabIndex: -1,
                },
                onClick: () => {
                  setOpen(true);
                },
              },
              popper: {
                sx: {
                  '& .MuiPaper-root': {
                    borderRadius: '12px',
                    boxShadow: 4,
                    border: '1px solid #F6DBE0',
                    '& .MuiDateCalendar-root': {
                      '& .MuiPickersCalendarHeader-root': {
                        color: (theme) => theme.palette.custom.wishlistColor,
                      },
                      '& .MuiIconButton-root svg': {
                        color: (theme) => theme.palette.custom.wishlistColor,
                      },
                    },
                  },
                  '& .MuiPickersDay-root': {
                    color: (theme) => theme.palette.custom.main,
                    '&.Mui-selected': {
                      backgroundColor: (theme) => theme.palette.custom.wishlistColor,
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: (theme) => theme.palette.custom.wishlistColor,
                      },
                    },
                  },
                  '& .Mui-selected': {
                    backgroundColor: '#F1A8B6 !impotant',
                  },
                },
              },
              openPickerButton: {
                onClick: () => {
                  setOpen(true);
                },
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </FormRow>
  );
}