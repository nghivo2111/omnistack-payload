import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { getTranslations } from 'next-intl/server'
import { TypedLocale } from 'payload'

function escapeHTML(input: unknown): string {
  if (input === null || input === undefined) return ''
  const str = typeof input === 'string' ? input : String(input)
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function formSubmissionTemplate(
  fieldMap: Record<string, unknown>,
  title: string,
  message?: DefaultTypedEditorState | null,
  locale: TypedLocale = 'en',
) {

  const t = await getTranslations({ locale, namespace: 'form' })

  const messageHTML = message
    ? `
      <div style="padding:20px 24px;border-bottom:1px solid #e5e7eb;">
        <div style="font-size:12px;color:#6b7280;padding-bottom:8px;text-transform:uppercase;">Message</div>
        <div style="font-size:14px;color:#111827;line-height:1.5;">
          ${convertLexicalToHTML({ data: message, disableContainer: true })}
        </div>
      </div>
    `
    : ''

  const rows = Object.entries(fieldMap)
    .map(
      ([k, v]) => `
              <div style="margin-bottom:12px;">
                <div style="font-size:12px;color:#6b7280;padding-bottom:4px;text-transform:uppercase;">${escapeHTML(k)}</div>
                <div style="font-size:16px;color:#111827;font-weight:500">${escapeHTML(v)}</div>
              </div>
            `,
    )
    .join('')

  const html = `
                <!DOCTYPE html>
                <html>
                <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
                  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.08);">

                    <div style="background:#3b82f6;color:#ffffff;padding:20px 24px;">
                      <h2 style="margin:0;font-size:20px;text-align:center"> ${t('email.title')} ${title} Form</h2>
                    </div>

                    ${messageHTML}

                    <div style="padding:24px;">
                      ${rows}
                    </div>

                    <div style="padding:16px 24px;background:#f9fafb;color:#6b7280;font-size:12px;text-align:center;">
                      ${t('footer')}
                    </div>

                  </div>
                </body>
                </html>
                `

  return html
}
