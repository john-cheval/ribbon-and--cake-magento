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
  form_submit_success_title?: string | null
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

type DecorCelebrationCustomFormProps = {
  identifier: string
}

const fieldClassByCode: Record<string, string> = {
  decor_name: 'decor-form-field--name',
  decor_phone: 'decor-form-field--phone',
  decor_event_type: 'decor-form-field--event',
  decor_event_date: 'decor-form-field--date',
}

const fieldClassByPosition = [
  'decor-form-field--name',
  'decor-form-field--phone',
  'decor-form-field--event',
  'decor-form-field--date',
]

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
        throw new Error(result.error || 'The quote form is currently unavailable.')
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

function getFieldModifier(field: FormField & { attribute_code: string }, index: number) {
  if (fieldClassByCode[field.attribute_code]) return fieldClassByCode[field.attribute_code]

  const label = String(field.frontend_label || '').toLowerCase()
  if (field.frontend_input === 'date' || label.includes('date')) return 'decor-form-field--date'
  if (field.frontend_input === 'select' || label.includes('event type')) {
    return 'decor-form-field--event'
  }
  if (label.includes('phone') || label.includes('mobile')) return 'decor-form-field--phone'
  if (label.includes('name')) return 'decor-form-field--name'

  return fieldClassByPosition[index] || ''
}

function CalendarIcon() {
  return (
    <span className='decor-form-field__icon' aria-hidden='true'>
      <svg viewBox='0 0 20 20' fill='none'>
        <path d='M4 5.5h12v11H4z' stroke='currentColor' strokeWidth='0.8' />
        <path
          d='M7 3.5v4M13 3.5v4M4 8.5h12M7.5 12.5h1'
          stroke='currentColor'
          strokeWidth='0.8'
          strokeLinecap='round'
        />
      </svg>
    </span>
  )
}

function QuoteFeatures() {
  return (
    <div className='decor-quote-features' aria-label='Quote benefits'>
      <span className='decor-quote-feature'>
        <svg viewBox='0 0 22 22' fill='none' aria-hidden='true'>
          <path
            d='M12.7 2.8 5.5 12h5.3l-1.5 7.2 7.2-9.2h-5.1z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinejoin='round'
          />
        </svg>
        Quick Response
      </span>
      <span className='decor-quote-feature'>
        <svg viewBox='0 0 22 22' fill='none' aria-hidden='true'>
          <path
            d='M4 4h8.2L18 9.8 9.8 18 4 12.2z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinejoin='round'
          />
          <path d='M8 7.8h.1' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
        </svg>
        Best Price Guarantee
      </span>
      <span className='decor-quote-feature'>
        <svg viewBox='0 0 22 22' fill='none' aria-hidden='true'>
          <path
            d='M7.3 11.2V5.6a1.2 1.2 0 0 1 2.4 0v5M9.7 10V4.2a1.2 1.2 0 0 1 2.4 0v6M12.1 10.5V5.6a1.2 1.2 0 0 1 2.4 0v6M14.5 12V7.4a1.2 1.2 0 0 1 2.4 0v5.9c0 3.4-2.4 5.8-5.5 5.8H10c-2.1 0-3.5-.9-4.7-2.7L3.8 14a1.3 1.3 0 0 1 2.1-1.5l1.4 1.7'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        Hassle-Free Setup
      </span>
    </div>
  )
}

export default function DecorCelebrationCustomForm({
  identifier,
}: DecorCelebrationCustomFormProps) {
  const [definition, setDefinition] = useState<CustomFormDefinition | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    let isActive = true

    async function loadForm() {
      setLoading(true)
      setStatus(null)

      try {
        const form = await fetchFormDefinition(identifier)

        if (!isActive) return

        setDefinition(form)
        setValues((current) => ({ ...getInitialValues(form), ...current }))
      } catch (error) {
        if (isActive) {
          setStatus({
            type: 'error',
            message:
              error instanceof Error ? error.message : 'The quote form is currently unavailable.',
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
    () =>
      (definition?.formfield ?? [])
        .filter((field): field is FormField & { attribute_code: string } =>
          Boolean(field?.attribute_code && field.input_visibility !== false),
        )
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)),
    [definition],
  )

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setStatus(null)

    try {
      const response = await fetch('/api/alekseon-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          identifier,
          fields: fields.map((field) => ({
            fieldIdentifier: field.attribute_code,
            value: values[field.attribute_code] ?? '',
          })),
        }),
      })
      const result = (await response.json()) as CustomFormResponse

      if (!response.ok || !result.success) {
        throw new Error(result.error || result.message || 'Your quote request could not be sent.')
      }

      setValues((current) => Object.fromEntries(Object.keys(current).map((key) => [key, ''])))
      setStatus({
        type: 'success',
        message:
          definition?.widget_setting?.form_submit_success_message ||
          result.message ||
          'Your quote request has been received.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Your quote request could not be sent.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      className={`decor-quote-form${status ? ' decor-quote-form--has-status' : ''}`}
      data-form-identifier={identifier}
      onSubmit={submitForm}
    >
      {fields.map((field, index) => {
        const code = field.attribute_code
        const label = field.frontend_label || code
        const inputType = field.frontend_input || 'text'
        const modifier = getFieldModifier(field, index)
        const fieldClass = `decor-form-field ${modifier}`.trim()

        return (
          <label className={fieldClass} key={code}>
            <span className='decor-visually-hidden'>{label}</span>
            {inputType === 'select' ? (
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
                type={inputType === 'date' ? 'date' : code === 'decor_phone' ? 'tel' : 'text'}
                className={
                  inputType === 'date' && !values[code] ? 'decor-date-input--empty' : undefined
                }
                name={code}
                aria-label={label}
                placeholder={inputType === 'date' ? undefined : label}
                required={Boolean(field.is_required)}
                autoComplete={
                  code === 'decor_name' ? 'name' : code === 'decor_phone' ? 'tel' : 'off'
                }
                value={values[code] ?? ''}
                onChange={(event) =>
                  setValues((current) => ({ ...current, [code]: event.target.value }))
                }
              />
            )}
            {inputType === 'date' && !values[code] && (
              <span className='decor-date-placeholder' aria-hidden='true'>
                {label}
              </span>
            )}
            {inputType === 'date' && <CalendarIcon />}
          </label>
        )
      })}

      <button
        className='decor-quote-submit'
        type='submit'
        disabled={loading || submitting || !fields.length}
      >
        {submitting
          ? 'Sending...'
          : definition?.widget_setting?.submit_button_label || 'Get My Free Quote'}
      </button>

      {status && (
        <p
          className={`decor-form-status decor-form-status--${status.type}`}
          role={status.type === 'error' ? 'alert' : 'status'}
        >
          {status.message}
        </p>
      )}

      <QuoteFeatures />
    </form>
  )
}
