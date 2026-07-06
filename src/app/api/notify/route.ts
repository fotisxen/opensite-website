import { NextResponse } from "next/server";

// Contentful calls this URL when a blog post is published.
// Set it up in: Contentful > Settings > Webhooks > Add webhook
// URL: https://yourdomain.com/api/notify
// Trigger: Entry > Publish
// Filter: Content type = blogPost (your content type ID)

export async function POST(req: Request) {
  // Optional: verify Contentful webhook secret
  const secret = req.headers.get("x-contentful-webhook-secret");
  if (secret !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();
  const title =
    payload?.fields?.title?.["en-US"] ?? "New article from OpenSite";
  const slug = payload?.fields?.slug?.["en-US"] ?? "";

  const API_KEY = process.env.MAILCHIMP_API_KEY!;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID!;
  const DC = API_KEY.split("-").at(-1);
  const FROM_EMAIL = process.env.MAILCHIMP_FROM_EMAIL!; // e.g. info@opensite.gr
  const FROM_NAME = process.env.MAILCHIMP_FROM_NAME ?? "OpenSite";

  // 1. Create a campaign
  const campaignRes = await fetch(
    `https://${DC}.api.mailchimp.com/3.0/campaigns`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "regular",
        recipients: { list_id: LIST_ID },
        settings: {
          subject_line: `📖 New read: ${title}`,
          from_name: FROM_NAME,
          reply_to: FROM_EMAIL,
        },
      }),
    },
  );

  if (!campaignRes.ok) {
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 },
    );
  }

  const campaign = await campaignRes.json();
  const campaignId = campaign.id;

  // 2. Set the email content
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://opensite.gr";
  const articleUrl = `${siteUrl}/insights/${slug}/`;

  await fetch(
    `https://${DC}.api.mailchimp.com/3.0/campaigns/${campaignId}/content`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#1a56db;padding:32px 40px;">
            <p style="margin:0;color:rgba(255,255,255,0.7);font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">OpenSite Insights</p>
            <p style="margin:8px 0 0;color:#ffffff;font-size:13px;">New article just dropped 👇</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <h1 style="margin:0 0 16px;font-size:26px;font-weight:700;line-height:1.25;color:#111827;">${title}</h1>
            <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#4b5563;">
              Most businesses are sitting on untapped growth — and this article breaks down exactly how to find it. 
              It's a quick read, but the kind that makes you rethink your current approach.
            </p>
            <p style="margin:0 0 32px;font-size:16px;line-height:1.7;color:#4b5563;">
              If you've been wondering why your digital presence isn't converting the way it should, 
              this one's worth 10 minutes of your time.
            </p>

            <!-- CTA button -->
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#1a56db;border-radius:10px;">
                  <a href="${articleUrl}" style="display:inline-block;padding:16px 32px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
                    Read the Article →
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:24px 0 0;font-size:14px;color:#9ca3af;">
              Or paste this link in your browser:<br>
              <a href="${articleUrl}" style="color:#1a56db;">${articleUrl}</a>
            </p>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;"></td></tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px 32px;">
            <p style="margin:0 0 4px;font-size:13px;color:#9ca3af;">
              You're receiving this because you subscribed to OpenSite Insights.
            </p>
            <p style="margin:0;font-size:13px;color:#9ca3af;">
              <a href="*|UNSUB|*" style="color:#9ca3af;">Unsubscribe</a> · 
              <a href="https://opensite.gr" style="color:#9ca3af;">opensite.gr</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
      `,
      }),
    },
  );

  // 3. Send it
  await fetch(
    `https://${DC}.api.mailchimp.com/3.0/campaigns/${campaignId}/actions/send`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${API_KEY}` },
    },
  );

  return NextResponse.json({ ok: true });
}
