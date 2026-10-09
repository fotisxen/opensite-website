# Own lead endpoint (not deployed)

`lead.php` is a PHP endpoint that emails form submissions to info@opensite.gr
without a third-party service. It is NOT in `public/`, so it is not published.

On 9 October 2026 the live server turned out not to run PHP (the site is served
by a Node static server: a POST to /api/lead.php answers 405, and a GET returns
the PHP source as text). Until the hosting can run PHP, or another server-side
endpoint exists, the forms go through FormSubmit (see `src/lib/sendLead.ts`).

To switch: put `lead.php` under `public/api/` on a host that executes PHP, and
set `LEAD_ENDPOINT` in `src/lib/sendLead.ts` to "/api/lead.php".
