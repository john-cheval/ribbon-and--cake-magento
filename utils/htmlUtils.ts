import { decode } from 'html-entities'

/** Decodes HTML entities in a string. Works in both browser and server environments. */
export function decodeHtmlEntities(htmlString) {
  if (typeof htmlString !== 'string') {
    return ''
  }

  // Use DOMParser in browser
  if (typeof window !== 'undefined' && window.DOMParser) {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlString, 'text/html')
      return doc.body.textContent || ''
    } catch (e) {
      console.warn('DOMParser failed, using html-entities fallback.', e)
      return decode(htmlString)
    }
  } else {
    // Server-side fallback
    return decode(htmlString)
  }
}
