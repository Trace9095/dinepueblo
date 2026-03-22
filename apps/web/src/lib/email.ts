import { Resend } from 'resend'

let _resend: Resend | null = null

export function getResend(): Resend {
  if (!_resend) {
    const key = process.env['RESEND_API_KEY']
    if (!key) throw new Error('RESEND_API_KEY is not set')
    _resend = new Resend(key)
  }
  return _resend
}

const FROM = process.env['AUTH_FROM_EMAIL'] ?? 'noreply@dinepueblo.com'
const NOTIFY = process.env['NOTIFICATION_EMAIL'] ?? 'CEO@epicai.ai'

export async function notifyClaim(data: {
  restaurantName: string; contactName: string; contactEmail: string; tier: string; stripeSessionId?: string
}) {
  const r = getResend()
  await r.emails.send({
    from: FROM, to: NOTIFY,
    subject: `[DinePueblo] New Claim — ${data.restaurantName} (${data.tier})`,
    html: `<div style="font-family:sans-serif;background:#0D1117;color:#E6EDF3;padding:32px;max-width:600px">
      <h2 style="color:#D4A853">New Listing Claim</h2>
      <p><strong>Restaurant:</strong> ${data.restaurantName}</p>
      <p><strong>Contact:</strong> ${data.contactName} — ${data.contactEmail}</p>
      <p><strong>Tier:</strong> <span style="color:#D4A853">${data.tier.toUpperCase()}</span></p>
      ${data.stripeSessionId ? `<p style="font-size:12px;color:#8B949E">Session: ${data.stripeSessionId}</p>` : ''}
      <a href="https://dinepueblo.com/admin/claims" style="display:inline-block;margin-top:16px;background:#D4A853;color:#0D1117;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600">View in Admin</a>
    </div>`,
  })
}

export async function notifyListingRequest(data: {
  restaurantName: string; contactName: string; contactEmail: string; address?: string; message?: string
}) {
  const r = getResend()
  await r.emails.send({
    from: FROM, to: NOTIFY,
    subject: `[DinePueblo] New Listing Request — ${data.restaurantName}`,
    html: `<div style="font-family:sans-serif;background:#0D1117;color:#E6EDF3;padding:32px;max-width:600px">
      <h2 style="color:#D4A853">New Listing Request</h2>
      <p><strong>Restaurant:</strong> ${data.restaurantName}</p>
      <p><strong>Contact:</strong> ${data.contactName} — ${data.contactEmail}</p>
      ${data.address ? `<p><strong>Address:</strong> ${data.address}</p>` : ''}
      ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
      <a href="https://dinepueblo.com/admin/requests" style="display:inline-block;margin-top:16px;background:#D4A853;color:#0D1117;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600">View in Admin</a>
    </div>`,
  })
}

export async function sendClaimConfirmation(data: {
  contactName: string; contactEmail: string; restaurantName: string; tier: string
}) {
  const r = getResend()
  await r.emails.send({
    from: FROM, to: data.contactEmail,
    subject: `Your claim for ${data.restaurantName} is received`,
    html: `<div style="font-family:sans-serif;background:#0D1117;color:#E6EDF3;padding:32px;max-width:600px">
      <h2 style="color:#D4A853">Claim Received</h2>
      <p>Hi ${data.contactName},</p>
      <p style="color:#8B949E">We've received your <strong style="color:#D4A853">${data.tier}</strong> listing claim for <strong style="color:#E6EDF3">${data.restaurantName}</strong>. Our team will activate your listing within 1-2 business days.</p>
      <p style="color:#8B949E;font-size:12px;margin-top:32px">Dine Pueblo — Pueblo, CO's dining directory</p>
    </div>`,
  })
}
