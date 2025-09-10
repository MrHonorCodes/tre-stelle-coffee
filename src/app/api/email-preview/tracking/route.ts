import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const productsText = searchParams.get('productsText') || 'Espresso Blend (Qty: 1), Ethiopia Guji (Qty: 2)';
	const trackingNumber = searchParams.get('trackingNumber') || '9400 0000 0000 0000 0000 00';
	const firstName = searchParams.get('firstName') || 'there';
	const uspsTrackingUrl = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${encodeURIComponent(
		trackingNumber
	)}`;

	const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Shipped</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
      line-height: 1.6;
      color: #2E1A13;
      background-color: #f4f4f4;
    }
    a.button {
      display: inline-block;
      padding: 12px 25px;
      background-color: #4a0000;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: 600;
    }
  </style>
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <meta name="robots" content="noindex, nofollow" />
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; line-height: 1.6; color: #333333; background-color: #f4f4f4;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table width="600" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
          <tr>
            <td align="center" style="padding: 18px 20px; background-color: #4a0000; color: #ffffff;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; margin: 0 auto;">
                <tr>
                  <td width="160" align="left" style="vertical-align: middle;">
                    <img src="/images/white-logo.png" alt="Tre Stelle Coffee" width="140" style="display: block; max-width: 140px; height: auto;" />
                  </td>
                  <td align="center" style="vertical-align: middle; color:#e7c583; font-weight: 700; font-size: 18px;">Order Update</td>
                  <td width="160" align="right" style="vertical-align: middle;"></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 10px 20px; background-color: #e7c583; color: #4a0000; font-weight: 600; font-size: 14px;">Your Order Has Shipped</td>
          </tr>
          <tr>
            <td style="padding: 30px 25px;">
              <p style="margin: 0 0 15px; font-size: 16px;">Hi ${firstName},</p>
              <p style="margin: 0 0 15px; font-size: 16px;">Great news! Your Tre Stelle Coffee order containing <strong>${productsText}</strong> has shipped via USPS.</p>
              <p style="margin: 0 0 10px; font-size: 16px;">You can track your package using the following USPS tracking number:</p>
              <p style="margin: 20px 0; text-align: center;">
                <a class="button" href="${uspsTrackingUrl}" target="_blank">
                  <strong>${trackingNumber}</strong>
                </a>
              </p>
              <p style="margin: 0 0 15px; font-size: 16px;">Please allow some time for the tracking information to update.</p>
              <p style="margin: 0 0 15px; font-size: 14px; color: #555555;">If the link above doesn't work, you can also go to <a href="https://www.usps.com/manage/welcome.htm" target="_blank" style="color: #4a0000; text-decoration: underline;">USPS.com</a> and enter the tracking number manually.</p>
              <p style="margin: 25px 0 0; font-size: 16px;">Thanks for your order!</p>
              <p style="margin: 5px 0 0; font-size: 16px;">The Tre Stelle Coffee Team</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px; background-color: #f6efe2; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
              <p style="margin: 0 0 6px; font-size: 12px; color: #2E1A13;">&copy; ${new Date().getFullYear()} Tre Stelle Coffee. All rights reserved.</p>
              <p style="margin: 0; font-size: 12px; color: #6b5a54;">If the tracking button doesn't work, your tracking number is <strong>${trackingNumber}</strong>.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

	return new NextResponse(html, {
		headers: {
			'content-type': 'text/html; charset=utf-8',
			'X-Robots-Tag': 'noindex, nofollow',
		},
	});
}


