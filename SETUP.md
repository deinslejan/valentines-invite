# EmailJS Setup Instructions

To receive emails with her activity choices, you need to set up EmailJS (it's free!):

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. Go to "Email Services" in your dashboard
2. Click "Add New Service"
3. Choose Gmail (or your preferred email provider)
4. Connect your email account
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Template Name:** Valentine Response

**Subject:** 💕 She Said Yes! Valentine's Date Choices

**Content:**
```
New Valentine's Response!

Date & Time: {{date}}

She selected these activities:
{{activities_html}}

---
Full list: {{activities_list}}
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `AbCd1234EfGh5678`)

## Step 5: Update the Code
Open `script.js` and replace these three values:

```javascript
// Line 13 - Replace with your Public Key
emailjs.init('YOUR_PUBLIC_KEY');

// Line 67 - Replace with your email
to_email: 'YOUR_EMAIL@gmail.com',

// Line 74 - Replace with your Service ID and Template ID
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
```

## Example:
```javascript
emailjs.init('AbCd1234EfGh5678');

to_email: 'john@gmail.com',

emailjs.send('service_abc123', 'template_xyz789', emailParams)
```

## Step 6: Test It!
1. Save your changes
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Add EmailJS configuration"
   git push
   ```
3. Wait 1-2 minutes for GitHub Pages to update
4. Test the form and check your email!

## Free Tier Limits
- 200 emails per month (plenty for your use case!)
- No credit card required

## Troubleshooting
- Check browser console for errors (F12)
- Verify all three IDs are correct in script.js
- Make sure your email service is connected in EmailJS dashboard
- Check spam folder for test emails

---

**Note:** If you prefer not to use EmailJS, I can set up alternatives like:
- Google Sheets integration
- Webhook to Discord/Telegram
- Form submission to a backend service
