# Tenace Labs

Minimal static website for Tenace Labs.

## Local preview

Open `index.html` in a browser. No build step is required.

For this workspace, a local preview server is also running at `http://localhost:8001`.

## Contact form

The inquiry form posts to FormSubmit at `amoghshri1601@gmail.com`. The first real submission may trigger a one-time email confirmation before messages start forwarding.

## Email DNS security

Tenace Labs does not currently send email from `@tenacelabs.com`. Publish strict
SPF and DMARC records in Cloudflare so spoofed mail is rejected. See
`DNS_EMAIL_SECURITY.md` for the exact DNS records and verification commands.

## Fast, cheap deployment

Best current path for this site:

1. Create a GitHub repository and push these files.
2. Deploy on Cloudflare Pages, Netlify, or Vercel.
3. Set the build command to blank and the output directory to `/`.
4. Add a custom domain when ready.

For a plain static site like this, Cloudflare Pages or Netlify are usually the fastest free options.
