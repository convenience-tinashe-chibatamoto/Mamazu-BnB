# Contact Form Setup Guide for Hostinger

This guide will help you set up the contact form on your Hostinger Business Plan.

## 📋 What Was Added

1. **Contact Form UI** - Added a beautiful contact form above "Visit Us Today" section with:
   - Name and Email fields (required)
   - Phone number field (optional)
   - Preferred contact method dropdown (Email/Phone/WhatsApp)
   - Message textarea (required)
   - Loading state with spinner animation
   - Success/Error message display

2. **PHP Backend** - Created `contact.php` file that:
   - Validates form data
   - Sends email to mamazu@gmail.com
   - Sends auto-reply confirmation to the user
   - Returns JSON responses for success/error states

## ⚠️ Important Note About Development

**The contact form will NOT work in local development** (when running `npm run dev`) because:
- Vite dev server doesn't execute PHP
- PHP requires a server like Apache/Nginx

**To test the form:**
1. Build and deploy to Hostinger, OR
2. Use a local PHP server (see "Local Testing with PHP" section below)

## 🚀 Deployment Steps

### Step 1: Build Your React App
```bash
npm run build
```
This creates a `dist` folder with your production-ready files.

### Step 2: Upload to Hostinger

1. **Connect to your Hostinger hosting** via:
   - File Manager (in hPanel), or
   - FTP/SFTP client (like FileZilla)

2. **Upload files to public_html** (or your domain's root directory):
   - Upload ALL files from the `dist` folder
   - Upload `contact.php` to the same directory

3. **Set proper permissions**:
   - Files: 644
   - Folders: 755
   - contact.php: 644

### Step 3: Configure Email Settings

Open `contact.php` and update line 60:
```php
$to = 'mamazu@gmail.com'; // Replace with your actual email
```

**Important Email Settings:**
- Make sure the email address you use is configured in your Hostinger account
- For better deliverability, use an email with your domain (e.g., info@yourdomain.com)

### Step 4: Test the Form

1. Visit your website
2. Scroll to the "Get in Touch" section
3. Fill out and submit the contact form
4. Check your email inbox (and spam folder)

## 🔧 Troubleshooting

### Email Not Sending?

1. **Check Hostinger Email Settings**:
   - Go to hPanel → Email Accounts
   - Ensure you have an email account created
   - Update the `$to` variable in contact.php with this email

2. **Check PHP mail() function**:
   - Hostinger supports PHP mail() by default
   - No additional SMTP configuration needed for basic functionality

3. **Alternative: Use SMTP (More Reliable)**:
   If you want better email deliverability, you can modify contact.php to use SMTP instead of PHP mail(). Consider using PHPMailer library.

### Form Not Submitting?

1. **Check browser console** for errors (F12 → Console tab)
2. **Verify contact.php location** - should be in the same directory as index.html
3. **Check file permissions** - contact.php should be readable (644)

### CORS Issues?

The contact.php file includes CORS headers. If you still have issues:
1. Update line 9 in contact.php:
```php
header('Access-Control-Allow-Origin: https://yourdomain.com');
```

## 📧 Email Customization

### Change Recipient Email
Line 60 in `contact.php`:
```php
$to = 'your-email@domain.com';
```

### Customize Email Template
Edit the HTML templates in contact.php (lines 84-133 and 154-187) to match your branding.

### Change Auto-Reply Settings
To disable auto-reply, comment out lines 154-192 in contact.php.

## 🎨 Form Customization

The form styling uses Tailwind CSS and matches your site's design. To customize:
- Colors are controlled by the `primary-*` classes (cyan theme)
- Form is fully responsive (mobile-friendly)
- Located in `src/App.jsx` around line 407

## ✅ Checklist

- [ ] Built the React app (`npm run build`)
- [ ] Uploaded dist folder contents to Hostinger
- [ ] Uploaded contact.php to the same directory
- [ ] Updated email address in contact.php
- [ ] Set proper file permissions (644 for files, 755 for folders)
- [ ] Tested form submission
- [ ] Verified email delivery
- [ ] Checked auto-reply functionality

## 📞 Support

If you need help:
- Check Hostinger Knowledge Base: https://support.hostinger.com
- Contact Hostinger support (they have great 24/7 support)
- Check browser console for JavaScript errors
- Check server error logs in hPanel

## 🔐 Security Notes

- Form includes basic XSS protection (strip_tags)
- Email validation is performed server-side
- CORS headers can be restricted to your domain for production
- Consider adding rate limiting to prevent spam
- Consider adding Google reCAPTCHA for additional spam protection

## 🧪 Local Testing with PHP (Optional)

If you want to test the form locally before deploying:

### Option 1: Using PHP Built-in Server
1. Build your app: `npm run build`
2. Navigate to dist folder: `cd dist`
3. Copy contact.php to dist: `copy ..\contact.php .`
4. Start PHP server: `php -S localhost:8000`
5. Open browser: `http://localhost:8000`

### Option 2: Using XAMPP/WAMP
1. Install XAMPP (Windows) or MAMP (Mac)
2. Build your app: `npm run build`
3. Copy dist folder contents to htdocs
4. Copy contact.php to the same location
5. Access via `http://localhost/your-folder-name`

**Note:** Email sending may not work locally unless you configure SMTP properly.

---

**Your contact form is now ready to go! 🎉**

The form will send emails to mamazu@gmail.com (or whatever email you configure) and will automatically send a confirmation email to your visitors.
