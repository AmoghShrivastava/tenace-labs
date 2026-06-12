# Tenace Labs Email DNS Security

Tenace Labs currently does not send email from `@tenacelabs.com`. The website
uses a personal Gmail address and FormSubmit for inbound contact messages.

Because the domain is not used for outbound mail, publish strict DNS records
that tell receivers to reject mail claiming to come from `tenacelabs.com`.

## Current finding

Checked on 2026-06-11:

- `tenacelabs.com` uses Cloudflare nameservers:
  - `cortney.ns.cloudflare.com`
  - `matteo.ns.cloudflare.com`
- `_dmarc.tenacelabs.com` does not exist.
- No TXT SPF record was found at `tenacelabs.com`.
- No MX record was found for `tenacelabs.com`.

## Required Cloudflare DNS records

Add these records in Cloudflare DNS for `tenacelabs.com`.

### SPF

```txt
Type: TXT
Name: @
Content: v=spf1 -all
TTL: Auto
Proxy status: DNS only
```

This declares that no server is authorized to send mail for the root domain.

### DMARC

```txt
Type: TXT
Name: _dmarc
Content: v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s; pct=100
TTL: Auto
Proxy status: DNS only
```

This asks receiving mail systems to reject unauthenticated mail claiming to come
from `tenacelabs.com` or any subdomain.

### Optional null MX

Only add this if Tenace Labs does not receive email at `@tenacelabs.com`.

```txt
Type: MX
Name: @
Mail server: .
Priority: 0
TTL: Auto
Proxy status: DNS only
```

This declares that the domain accepts no inbound mail.

## If Tenace Labs starts sending mail later

Do not use `v=spf1 -all` unchanged if sending from `@tenacelabs.com` is added
later. First add the provider's SPF include and DKIM records, then keep DMARC
strict after confirming SPF or DKIM alignment passes.

Common examples:

- Google Workspace: add Google SPF include and DKIM selector records.
- Microsoft 365: add Microsoft SPF include and DKIM CNAME records.
- Transactional mail providers: add the provider's SPF and DKIM records.

After legitimate senders are configured, the DMARC policy can remain `p=reject`
as long as those senders pass aligned SPF or DKIM.

## Verification commands

Run these after the Cloudflare records propagate:

```powershell
Resolve-DnsName -Type TXT tenacelabs.com
Resolve-DnsName -Type TXT _dmarc.tenacelabs.com
Resolve-DnsName -Type MX tenacelabs.com
```

Expected TXT values:

```txt
tenacelabs.com TXT "v=spf1 -all"
_dmarc.tenacelabs.com TXT "v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s; pct=100"
```
