# VisaMotion File Box
Premium mobile-first admin workspace for visa agency document preparation.

## Deploy to Vercel
Set the Vercel Project Root Directory to `visamotion-file-box`. Set `GEMINI_API_KEY` in Project Settings → Environment Variables to enable Gemini chat.

## Local development
Run `npm install`, set `GEMINI_API_KEY`, then run `npm run dev`.

## Current functional boundaries
- Uploaded files currently remain in the browser session; durable private storage and secure admin authentication must be configured before real client data is used.
- Chat attachments currently pass filenames/metadata only; OCR and document text extraction are not enabled.
- Browser Agent is a task-preview UI until Browser Use credentials and a server-side browser session are configured.
- PDF Studio generates an editable checklist preview and uses the browser print dialog to save a new PDF; it does not rewrite arbitrary existing PDF text.
- Visa checklists are drafts, not official forms or a guarantee of eligibility or approval.