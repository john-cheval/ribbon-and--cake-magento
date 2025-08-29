import { FormAutoSubmit, SelectElement, useFormCompose } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { SetBillingAddressDocument } from '@graphcommerce/magento-cart-shipping-address'
import { Form, FormRow } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useState } from 'react'
import { setDeliveryTimeDateDocument } from '../../../graphql/SetDeliveryTime.gql'

type SlotItem = {
  date: string
  slot: string
  is_available: boolean
  slot_id: string
  slot_group: string
  __typename: string
}

export default function DeliveryDate({ slotList }) {
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [slotTime, setSlotTime] = useState<SlotItem[]>([])
  const [open, setOpen] = useState(false)

  const form = useFormGqlMutationCart(setDeliveryTimeDateDocument, {
    defaultValues: {
      date: '',
      time: '',
    },
    skipUnchanged: true,
    onBeforeSubmit: (variables) => {
      return {
        ...variables,
        date: variables?.date,
        time: variables?.time,
      }
    },
  })

  const { required, error, handleSubmit } = form
  const submit = handleSubmit(() => { })

  const uniqueDates = [...new Set(slotList?.slots?.map((slot) => slot.date))] as string[]
  const sortDates = uniqueDates?.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

  const deliveryDateOptions = sortDates.map((dateString) => ({
    id: dateString,
    label: dateString,
    value: dateString,
  }))

  const today = dayjs().format('YYYY-MM-DD')
  const now = dayjs()

  const disabledSlots = (slot) => {
    // Extract slot start time
    const [startTime] = slot?.slot?.split('-')
    const start = dayjs(`${slot?.date} ${startTime}`, 'YYYY-MM-DD h:mm A')

    // Disable if today and slot time is already past
    return slot?.date === today && start?.isBefore(now) ? true : false
  }

  return (
    <Form
      noValidate
      sx={{
        width: '100%',
        '& .mui-style-15vp5v0-FormRow-root': {
          paddingTop: '0px',
          paddingBottom: '0px',
          '& .MuiInputLabel-root': {
            color: (theme) => theme.palette.custom.main,
            fontSize: { xs: '15px', md: '16px' },
            fontWeight: '400',
            lineHeight: '158%',
          },
          '& .MuiInputLabel-root.MuiInputLabel-animated': {
            padding: '0 6px',
          },
          '& .MuiOutlinedInput-root .MuiSelect-icon': {
            color: (theme: any) => theme.palette.custom.wishlistColor,
          },
          '& .MuiOutlinedInput-root .InputCheckmark': {
            display: 'none',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: (theme) => `1px solid ${theme.palette.custom.border}`,
          },
          '& .MuiSelect-select': {
            color: (theme) => theme.palette.custom.main,
          },
          '& .MuiStack-root': {
            padding: 0,
            overflow: 'unset',
          },
          '& .MuiPickersInputBase-root': {
            // padding: 0
            border: '1px solid #F6DBE0',

          }
        },
        '& .MuiPickersInputBase-sectionContent': {
          background: "transparent !important"
        },
        '& .MuiPickersInputBase-sectionContent::selection': {
          background: "transparent !important",
        }
      }}
      onSubmit={submit}
    >
      <FormAutoSubmit control={form.control} submit={submit} name={['date', 'time']} />
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
          <DemoContainer components={['DatePicker']} sx={{
            '& .MuiPickersOutlinedInput-notchedOutline': {
              borderColor: '#D5B1B8 !important',
              borderWidth: '1px !important'
            },
          }}>
            <DatePicker
              open={open}
              onClose={() => setOpen(false)}
              label={<Trans id='Delivery Date' />}
              format="DD/MM/YYYY"
              name={'date' as any}
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
                    }
                  },
                  inputProps: {
                    readOnly: true,
                    tabIndex: -1,
                  },
                  onClick: () => {
                    setOpen(true)
                  },
                },
                popper: {
                  sx: {
                    '& .MuiPaper-root': {
                      borderRadius: '12px',
                      boxShadow: 4,
                      border: (theme) => `1px solid #F6DBE0`,
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
                    setOpen(true)
                  },
                }
              }}
              onChange={(value) => {
                // setDate(value as any);

                // const filteredSlots = slotList?.slots?.filter((s) =>
                //   dayjs(s.date).isSame(value, 'day')
                // );

                // setSlotTime(filteredSlots);
                // form.setValue("date", value as any, { shouldDirty: true });
                const onlyDate = dayjs(value).format('YYYY-MM-DD')

                setDate(onlyDate)

                const filteredSlots = slotList?.slots?.filter(
                  (s) => dayjs(s.date).isSame(onlyDate, 'day') && !disabledSlots(s)
                ) || []

                setSlotTime(filteredSlots)

                form.setValue('date', onlyDate, { shouldDirty: true })
              }}
              // defaultValue={dayjs(slotList?.start_date)}
              minDate={dayjs()}
              maxDate={dayjs(slotList?.start_date).add(slotList?.maxdays || 1, 'day')}
              shouldDisableDate={(day) => {
                const onlyDate = dayjs(day).format('YYYY-MM-DD')
                const availableSlots = slotList?.slots?.filter(
                  (s) => dayjs(s.date).isSame(onlyDate, 'day') && !disabledSlots(s)
                )
                return availableSlots.length === 0
              }}
            />
          </DemoContainer>
        </LocalizationProvider>

        <SelectElement
          control={form.control}
          name={'time' as any}
          sx={{
            paddingTop: '8px',
            '& .MuiFormLabel-root': {
              color: (theme) => theme.palette.custom.main,
              marginTop: '7px',
              verticalAlign: 'middle',
            },
            '& .MuiOutlinedInput-root .MuiSvgIcon-root': {
              fill: (theme) => theme.palette.custom.wishlistColor,
            },
            '& .mui-style-1d3z3hw-MuiOutlinedInput-notchedOutline, .mui-style-ioqfy8-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline  ':
            {
              borderColor: (theme) => theme.palette.custom.border,
            },
            '& .MuiSelect-select': {
              color: (theme) => theme.palette.custom.main,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#D5B1B8 !important',
              borderWidth: '1px !important',
            },
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#D5B1B8 !important',
              borderWidth: '1px !important',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#D5B1B8 !important',
              borderWidth: '1px !important',
            },



          }}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  backgroundColor: (theme) => theme.palette.custom.border,
                  color: (theme) => theme.palette.custom.main,
                  '&::-webkit-scrollbar': {
                    width: '6px',
                    borderRadius: 0,
                    backgroundColor: '#ebebeb',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#ebebeb', // fixed typo: baxkgroundColor → backgroundColor
                    borderRadius: '0px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: (theme) => theme.palette.custom.main,
                    borderRadius: '0px',
                  },
                  '& .MuiMenuItem-root': {
                    color: (theme) => theme.palette.custom.main,
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.custom.wishlistColor,
                    },
                    '&.Mui-selected': {
                      backgroundColor: (theme) => theme.palette.custom.wishlistColor,
                    },
                  },
                },
              },
            },
          }}
          // autoWidth
          variant='outlined'
          label={<Trans id='Delivery Time' />}
          options={slotTime?.map((slot) => ({
            id: slot?.slot,
            label: slot.slot,
            disabled: disabledSlots(slot)
          }))}
          onChange={(value) => {
            setTime(value as any)
            form.setValue('time', value as any, { shouldDirty: true })
          }}
          value={time}
        />
      </FormRow>
    </Form>
  )
}
