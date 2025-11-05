import { Box, CircularProgress, Typography } from "@mui/material";
import { UpdateAlekseonFormDocument } from "../../graphql/UpdateAleskonForm.gql";
import { useMutation } from "@apollo/client";
import { useForm } from "@graphcommerce/react-hook-form";
import { TextFieldElement } from "@graphcommerce/ecommerce-ui";
import { Button, FormRow, MessageSnackbar } from "@graphcommerce/next-ui";
import { ApolloCartErrorAlert } from "@graphcommerce/magento-cart";
import { useEffect } from "react";

type ClassFormProps = {
    formValue: any
}

function ClassForm({ formValue }: ClassFormProps) {
    const [updateAlekseonForm, { data, loading: isSubmitting, error }] = useMutation(
        UpdateAlekseonFormDocument,
    )

    const getDefaultValues = () => {
        if (!formValue?.formfield?.length) {
            return {}
        }

        return formValue?.formfield?.reduce(
            (acc, field) => {
                if (field?.attribute_code) {
                    acc[field.attribute_code] = ''
                }
                return acc
            },
            {} as Record<string, string>,
        )
    }

    const { control, handleSubmit, reset } = useForm({
        defaultValues: getDefaultValues(),
    })

    const onSubmit = async (values: Record<string, string>) => {
        try {
            const fields = formValue?.formfield?.filter((field) => typeof field?.attribute_code === 'string')?.map((field) => ({
                fieldIdentifier: field!.attribute_code as string,
                value: values[field!.attribute_code as string] || '',
            }))

            await updateAlekseonForm({
                variables: {
                    input: {
                        identifier: formValue?.identifier,
                        fields,
                    },
                },
            })
        } catch (err) {
            console.error(err)
        }
    }

    const isSuccess = data?.updateAlekseonForm?.success
    const showSuccess = !isSubmitting && isSuccess && !error?.message

    useEffect(() => {
        if (isSuccess) {
            const emptyValues = formValue?.formfield.reduce(
                (acc, field) => {
                    if (field?.attribute_code) {
                        acc[field.attribute_code] = ''
                    }
                    return acc
                },
                {} as Record<string, string>,
            )

            reset(emptyValues)
        }
    }, [isSuccess, reset, formValue?.formfield])

    const formfield = (field, index) => {
        const isFullWidth =
            field?.frontend_label === "Name" ||
            field?.frontend_label === "Date of Birth";

        const rules = field?.frontend_label == 'Mobile Number' ? {
            required: 'Phone number is Required',
            pattern: {
                value: /^[0-9]*$/,
                message: 'Only numbers are allowed',
            },
            minLength: {
                value: 7,
                message: 'Phone number is too short',
            },
            maxLength: {
                value: 15,
                message: 'Phone number is too long',
            },
        } : field?.frontend_label == 'Email' ? {
            required: 'Email is Required',
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
            },
        } : field?.frontend_label === "Name" ? {
            required: 'Name is Required',
        } : {}

        const label = field?.is_required ? `${field?.frontend_label} *` : field?.frontend_label

        return (
            <TextFieldElement
                key={index}
                rules={rules}
                control={control}
                name={field?.attribute_code}
                // required={field?.is_required}
                variant="outlined"
                type={field?.frontend_input}
                label={field?.frontend_label === "Date of Birth" ? "" : label}
                sx={{
                    gridColumn: isFullWidth ? "1 / -1" : "auto",
                    width: "100%",
                }}
            />
        );
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ marginTop: "45px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
        >
            <Typography
                variant="h2"
                component={"span"}
                sx={{
                    margin: "0 0 8px",
                    textAlign: "center",
                    color: "#9B7C38",
                    fontSize: "24px !important",
                    fontWeight: "300 !important",
                    lineHeight: "30px !important"
                }}
            >Simply fill out the form below to register </Typography>

            <Typography variant="body2" sx={{
                margin: "0 0 34px",
                textAlign: "center",
                color: "#6F6F6F",
                fontSize: "16px !important",
                lineHeight: "32px !important",
            }}>
                {formValue?.widget_setting?.frontend_form_description}
            </Typography>

            <FormRow sx={{
                width: "100%",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            }}>
                {formValue?.formfield?.slice(0, 4)?.map((field, index) => (
                    formfield(field, index)
                ))}
            </FormRow>

            <Typography
                variant="h2"
                component={"span"}
                sx={{
                    margin: "53px 0 23px",
                    textAlign: "center",
                    color: "#9B7C38",
                    fontSize: "24px !important",
                    fontWeight: "300 !important",
                    lineHeight: "30px !important"
                }}
            >Who would like to bring along</Typography>

            <FormRow sx={{
                width: "100%",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                marginBottom: "16px"
            }}>
                {formValue?.formfield?.slice(4)?.map((field, index) => (
                    formfield(field, index)
                ))}
            </FormRow>

            <Button
                type='submit'
                disabled={isSubmitting}
                sx={{
                    backgroundColor: (theme: any) => theme.palette.custom.main,
                    color: (theme: any) => theme.palette.custom.border,
                    fontSize: { xs: '15px', md: '18px' },
                    fontWeight: 500,
                    lineHeight: '158%',
                    borderRadius: '4px',
                    border: '1px solid #441e14',
                    transition: 'all 0.3s ease',
                    boxShadow: 'none !important',
                    paddingBlock: { xs: '15px', md: '18px' },
                    width: '100%',
                    maxWidth: '459px',

                    '&:hover': {
                        backgroundColor: (theme: any) => theme.palette.custom.border,
                        color: (theme: any) => theme.palette.custom.main,
                        border: (theme) => `1px solid ${theme.palette.custom.border}`,
                        '& svg': {
                            color: (theme: any) => theme.palette.custom.main,
                        },
                    },
                    '&.Mui-disabled': {
                        color: (theme: any) => theme.palette.custom.border,
                    },
                }}
            >
                {isSubmitting ? <CircularProgress
                    size='20px'
                    sx={{
                        '& svg': {
                            color: (theme: any) => theme.palette.custom.border,
                        },
                    }}
                /> : formValue?.widget_setting?.submit_button_label}
            </Button>

            <ApolloCartErrorAlert error={error} />

            {showSuccess && (
                <MessageSnackbar sx={{
                    '& .MuiSnackbarContent-message': {
                        '& svg': {
                            color: (theme: any) => theme.palette.custom.main,
                            fontSize: { xs: '18px', lg: '25px' },
                        },
                        '& .MuiBox-root': {
                            color: (theme: any) => theme.palette.custom.main,
                            fontSize: { xs: '15px', md: '16px' },
                            textAlign: 'center'
                        },
                        '& .MuiButtonBase-root': {
                            width: { xs: '35px', xl: '40px' },
                            height: { xs: '35px', xl: '40px' },
                        }
                    }
                }} open={showSuccess} sticky variant='pill' severity='success'>
                    {formValue?.widget_setting?.form_submit_success_title}
                </MessageSnackbar>
            )}
        </Box>
    )
}

export default ClassForm;