# EmailJS Setup Guide for Contact Form

## Overview
Your ContactPage now uses EmailJS to send emails directly from the frontend without needing a backend API. Follow these steps to set it up.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Connect Your Gmail Account

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail**
4. Connect your Gmail account (`nishus877@gmail.com`)
5. Copy the **Service ID** (you'll need this)

## Step 3: Create Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Set up your template with these variables:
   ```
   Subject: New Contact Form Submission - {{subject}}
   
   From: {{from_name}} <{{from_email}}>
   Company: {{company}}
   Phone: {{phone}}
   Inquiry Type: {{inquiry_type}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   
   ---
   This email was sent from your website contact form.
   ```
4. Copy the **Template ID**

## Step 4: Get Public Key

1. In EmailJS dashboard, go to **Account** → **General**
2. Copy your **Public Key**

## Step 5: Update ContactPage.tsx

Replace these placeholders in your ContactPage.tsx:

```typescript
// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_xxxxxxx';      // Your Gmail service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx';    // Your email template ID  
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxxx';      // Your EmailJS public key
```

## Step 6: Test Your Contact Form

1. Fill out the contact form on your website
2. Submit the form
3. Check your Gmail inbox for the email
4. You should see a success toast: "Your query has been sent successfully! Our sales and tech team will resolve your query within 12 hours."

## EmailJS Free Plan Limits

- **200 emails/month** for free
- **No credit card required**
- Perfect for contact forms and small websites

## Troubleshooting

### Common Issues:

1. **Template not found** - Make sure Template ID is correct
2. **Service not found** - Make sure Service ID is correct  
3. **Unauthorized** - Make sure Public Key is correct
4. **Rate limited** - You've exceeded 200 emails/month

### Error Handling:

The contact form includes error handling:
- ✅ **Success**: Green toast with confirmation message
- ❌ **Error**: Red toast asking to try again
- ✅ **Validation**: Checks required fields before sending

## Security Notes

- ✅ **Public Key is safe** to expose in frontend code
- ✅ **No backend required** - EmailJS handles everything
- ✅ **Spam protection** built-in with EmailJS
- ✅ **Rate limiting** prevents abuse

## Alternative: Newer EmailJS Package

If you want to use the newer package (recommended for new projects):

```bash
npm uninstall emailjs-com
npm install @emailjs/browser
```

Then update the import:
```typescript
import emailjs from '@emailjs/browser';
```

The rest of the code remains the same!

---

## Your Current Setup Status:

- ✅ EmailJS package installed
- ✅ Contact form updated with EmailJS integration  
- ✅ Toast notifications working
- ✅ Form validation included
- ✅ Error handling implemented
- ⏳ **Next: Configure your EmailJS credentials**

Once you add your EmailJS credentials, your contact form will be fully functional! 🎉