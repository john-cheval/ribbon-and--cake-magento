import type { FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'

type FormOption = {
  option_id?: number | null
  option_code?: string | null
  sort_order?: number | null
  label?: string | null
}

type FormField = {
  frontend_label?: string | null
  frontend_input?: string | null
  is_required?: boolean | null
  sort_order?: number | null
  input_visibility?: boolean | null
  attribute_code?: string | null
  options?: Array<FormOption | null> | null
}

type WidgetSettings = {
  submit_button_label?: string | null
  form_submit_success_message?: string | null
}

type CustomFormDefinition = {
  identifier?: string | null
  title?: string | null
  formfield?: Array<FormField | null> | null
  widget_setting?: WidgetSettings | null
}

type CustomFormResponse = {
  form?: CustomFormDefinition | null
  error?: string
  success?: boolean
  message?: string
}

type BakingClassesCustomFormProps = {
  identifier: string
}

const fallbackDefinitions: Record<string, CustomFormDefinition> = {
  'baking-classes-dev-booking': {
    identifier: 'baking-classes-dev-booking',
    title: 'Baking Classes Dev Booking',
    formfield: [
      {
        attribute_code: 'baking_dev_name',
        frontend_label: 'Your Name',
        frontend_input: 'text',
        is_required: true,
        sort_order: 10,
        input_visibility: true,
      },
      {
        attribute_code: 'baking_dev_phone',
        frontend_label: 'Your Phone',
        frontend_input: 'text',
        is_required: true,
        sort_order: 20,
        input_visibility: true,
      },
      {
        attribute_code: 'baking_dev_email',
        frontend_label: 'Your Email',
        frontend_input: 'text',
        is_required: true,
        sort_order: 30,
        input_visibility: true,
      },
      {
        attribute_code: 'baking_dev_class',
        frontend_label: 'Class Interested In',
        frontend_input: 'text',
        is_required: false,
        sort_order: 40,
        input_visibility: true,
      },
      {
        attribute_code: 'baking_dev_attendees',
        frontend_label: 'Number of Attendees',
        frontend_input: 'text',
        is_required: false,
        sort_order: 50,
        input_visibility: true,
      },
      {
        attribute_code: 'baking_dev_details',
        frontend_label:
          'Any other details like preferred dates, allergies, birthday party details, number of children...',
        frontend_input: 'textarea',
        is_required: false,
        sort_order: 60,
        input_visibility: true,
      },
    ],
    widget_setting: {
      submit_button_label: 'Send my booking request →',
      form_submit_success_message:
        "Thanks — your booking request has been received. We'll get back to you shortly.",
    },
  },
}

function getFallbackDefinition(identifier: string) {
  return fallbackDefinitions[identifier] ?? null
}

const formDefinitionRequestCache = new Map<string, Promise<CustomFormDefinition>>()

async function fetchFormDefinition(identifier: string) {
  const cachedRequest = formDefinitionRequestCache.get(identifier)
  if (cachedRequest) return cachedRequest

  const request = fetch(`/api/alekseon-form?identifier=${encodeURIComponent(identifier)}`, {
    headers: { Accept: 'application/json' },
  })
    .then(async (response) => {
      const result = (await response.json()) as CustomFormResponse

      if (!response.ok || !result.form) {
        throw new Error(result.error || 'The booking form is currently unavailable.')
      }

      return result.form
    })
    .catch((error) => {
      formDefinitionRequestCache.delete(identifier)
      throw error
    })

  formDefinitionRequestCache.set(identifier, request)
  return request
}

function getInitialValues(definition: CustomFormDefinition | null) {
  return (definition?.formfield ?? []).reduce<Record<string, string>>((initial, field) => {
    if (field?.attribute_code) initial[field.attribute_code] = ''
    return initial
  }, {})
}

function getVisibleFields(definition: CustomFormDefinition | null) {
  return (definition?.formfield ?? [])
    .filter((field): field is FormField & { attribute_code: string } =>
      Boolean(field?.attribute_code && field.input_visibility !== false),
    )
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
}

function reconcileValuesForFields(
  currentValues: Record<string, string>,
  currentFields: Array<FormField & { attribute_code: string }>,
  nextFields: Array<FormField & { attribute_code: string }>,
) {
  return nextFields.reduce<Record<string, string>>((nextValues, field, index) => {
    const previousField = currentFields[index]
    nextValues[field.attribute_code] =
      currentValues[field.attribute_code] ?? currentValues[previousField?.attribute_code] ?? ''
    return nextValues
  }, {})
}

const fieldClassByCode: Record<string, string> = {
  baking_dev_name: 'baking-dev-booking-form__field--name',
  baking_dev_phone: 'baking-dev-booking-form__field--phone',
  baking_dev_email: 'baking-dev-booking-form__field--email',
  baking_dev_class: 'baking-dev-booking-form__field--class',
  baking_dev_attendees: 'baking-dev-booking-form__field--attendees',
  baking_dev_details: 'baking-dev-booking-form__field--details',
}

const fieldClassByPosition = [
  'baking-dev-booking-form__field--name',
  'baking-dev-booking-form__field--phone',
  'baking-dev-booking-form__field--email',
  'baking-dev-booking-form__field--class',
  'baking-dev-booking-form__field--attendees',
  'baking-dev-booking-form__field--details',
]

function getFieldModifier(field: FormField & { attribute_code: string }, index: number) {
  if (fieldClassByCode[field.attribute_code]) return fieldClassByCode[field.attribute_code]

  const label = String(field.frontend_label || '').toLowerCase()
  const inputType = String(field.frontend_input || '').toLowerCase()

  if (inputType === 'textarea' || label.includes('detail') || label.includes('message')) {
    return 'baking-dev-booking-form__field--details'
  }
  if (label.includes('attendee') || label.includes('children') || label.includes('number')) {
    return 'baking-dev-booking-form__field--attendees'
  }
  if (label.includes('class')) return 'baking-dev-booking-form__field--class'
  if (label.includes('email')) return 'baking-dev-booking-form__field--email'
  if (label.includes('phone') || label.includes('mobile')) return 'baking-dev-booking-form__field--phone'
  if (label.includes('name')) return 'baking-dev-booking-form__field--name'

  return fieldClassByPosition[index] || ''
}

function getInputType(field: FormField & { attribute_code: string }) {
  const label = String(field.frontend_label || '').toLowerCase()
  const code = field.attribute_code

  if (label.includes('email') || code.includes('email')) return 'email'
  if (label.includes('phone') || label.includes('mobile') || code.includes('phone')) return 'tel'
  if (label.includes('attendee') || label.includes('children') || code.includes('attendee')) return 'number'

  return 'text'
}

export default function BakingClassesCustomForm({ identifier }: BakingClassesCustomFormProps) {
  const fallbackDefinition = useMemo(() => getFallbackDefinition(identifier), [identifier])
  const [definition, setDefinition] = useState<CustomFormDefinition | null>(fallbackDefinition)
  const [hasRemoteDefinition, setHasRemoteDefinition] = useState(!fallbackDefinition)
  const [values, setValues] = useState<Record<string, string>>(
    getInitialValues(fallbackDefinition),
  )
  const [loading, setLoading] = useState(!fallbackDefinition)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    let isActive = true
    const instantDefinition = getFallbackDefinition(identifier)

    setDefinition(instantDefinition)
    setHasRemoteDefinition(!instantDefinition)
    setValues((current) => ({ ...getInitialValues(instantDefinition), ...current }))
    setLoading(!instantDefinition)

    async function loadForm() {
      setStatus(null)

      try {
        const form = await fetchFormDefinition(identifier)

        if (!isActive) return

        setDefinition(form)
        setHasRemoteDefinition(true)
        setValues((current) => ({ ...getInitialValues(form), ...current }))
      } catch (error) {
        if (isActive && !instantDefinition) {
          setStatus({
            type: 'error',
            message:
              error instanceof Error ? error.message : 'The booking form is currently unavailable.',
          })
        }
      } finally {
        if (isActive) setLoading(false)
      }
    }

    void loadForm()
    return () => {
      isActive = false
    }
  }, [identifier])

  const fields = useMemo(
    () => getVisibleFields(definition),
    [definition],
  )

  useEffect(() => {
    const handleSelectedClass = (event: Event) => {
      const className =
        event instanceof CustomEvent && typeof event.detail?.className === 'string'
          ? event.detail.className.trim()
          : ''
      if (!className) return

      const classField = fields.find((field) => {
        const code = field.attribute_code.toLowerCase()
        const label = String(field.frontend_label || '').toLowerCase()

        return code.includes('class') || label.includes('class interested') || label.includes('class')
      })

      if (!classField) return

      const matchingOption = (classField.options ?? []).find(
        (option) => option?.label?.trim().toLowerCase() === className.toLowerCase(),
      )
      const nextValue =
        classField.frontend_input === 'select' && matchingOption?.option_id
          ? String(matchingOption.option_id)
          : className

      setValues((current) => ({
        ...current,
        [classField.attribute_code]: nextValue,
      }))
      setStatus(null)
    }

    window.addEventListener('baking-dev:select-class', handleSelectedClass)
    return () => window.removeEventListener('baking-dev:select-class', handleSelectedClass)
  }, [fields])

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setStatus(null)

    try {
      let submissionDefinition = definition
      let submissionFields = fields
      let submissionValues = values

      if (!hasRemoteDefinition) {
        submissionDefinition = await fetchFormDefinition(identifier)
        submissionFields = getVisibleFields(submissionDefinition)
        submissionValues = reconcileValuesForFields(values, fields, submissionFields)
        setDefinition(submissionDefinition)
        setHasRemoteDefinition(true)
        setValues(submissionValues)
      }

      const response = await fetch('/api/alekseon-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          identifier,
          fields: submissionFields.map((field) => ({
            fieldIdentifier: field.attribute_code,
            value: submissionValues[field.attribute_code] ?? '',
          })),
        }),
      })
      const result = (await response.json()) as CustomFormResponse

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || result.message || 'Your booking request could not be sent.',
        )
      }

      setValues((current) => Object.fromEntries(Object.keys(current).map((key) => [key, ''])))
      setStatus({
        type: 'success',
        message:
          submissionDefinition?.widget_setting?.form_submit_success_message ||
          result.message ||
          'Your booking request has been received.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Your booking request could not be sent.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      className={`baking-dev-booking-form${
        status ? ' baking-dev-booking-form--has-status' : ''
      }`}
      data-form-identifier={identifier}
      onSubmit={submitForm}
    >
      {fields.map((field, index) => {
        const code = field.attribute_code
        const label = field.frontend_label || code
        const inputType = field.frontend_input || 'text'
        const modifier = getFieldModifier(field, index)
        const fieldClass = `baking-dev-booking-form__field ${modifier}`.trim()

        return (
          <label className={fieldClass} key={code}>
            <span className='baking-dev-visually-hidden'>{label}</span>
            {inputType === 'textarea' ? (
              <textarea
                name={code}
                aria-label={label}
                placeholder={label}
                required={Boolean(field.is_required)}
                value={values[code] ?? ''}
                onChange={(event) =>
                  setValues((current) => ({ ...current, [code]: event.target.value }))
                }
              />
            ) : inputType === 'select' ? (
              <select
                name={code}
                aria-label={label}
                required={Boolean(field.is_required)}
                value={values[code] ?? ''}
                onChange={(event) =>
                  setValues((current) => ({ ...current, [code]: event.target.value }))
                }
              >
                <option value=''>{label}</option>
                {(field.options ?? [])
                  .filter((option): option is FormOption =>
                    Boolean(option?.option_id && option.label),
                  )
                  .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
                  .map((option) => (
                    <option value={String(option.option_id)} key={option.option_id}>
                      {option.label}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                type={getInputType(field)}
                name={code}
                aria-label={label}
                placeholder={label}
                required={Boolean(field.is_required)}
                min={code.includes('attendee') ? 1 : undefined}
                inputMode={code.includes('attendee') ? 'numeric' : undefined}
                autoComplete={
                  code.includes('name')
                    ? 'name'
                    : code.includes('phone')
                      ? 'tel'
                      : code.includes('email')
                        ? 'email'
                        : 'off'
                }
                value={values[code] ?? ''}
                onChange={(event) =>
                  setValues((current) => ({ ...current, [code]: event.target.value }))
                }
              />
            )}
          </label>
        )
      })}

      <button
        className='baking-dev-booking-form__submit'
        type='submit'
        disabled={loading || submitting || !fields.length}
      >
        {submitting
          ? 'Sending...'
          : definition?.widget_setting?.submit_button_label || 'Send my booking request →'}
      </button>

      {status && (
        <p
          className={`baking-dev-booking-form__status baking-dev-booking-form__status--${status.type}`}
          role={status.type === 'error' ? 'alert' : 'status'}
        >
          {status.message}
        </p>
      )}
    </form>
  )
}
