# Saving RSVPs to a Google Sheet

When a guest submits the RSVP form, the site posts their reply to a Google Apps Script. The script adds one row to your Google Sheet. You don't need a database, and Google doesn't charge for this.

## 1. Create the Sheet and script

1. Create a new Google Sheet, for example "Wedding RSVPs".
2. In the Sheet, open **Extensions → Apps Script**.
3. Replace everything in `Code.gs` with the code below.
4. Change `SECRET` to a long random string of your own.

```js
const SECRET = "change-me-to-a-long-random-string";
const SHEET_NAME = "RSVP";

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: "bad-json" });
  }
  if (data.secret !== SECRET) return json({ ok: false, error: "unauthorized" });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Submitted at", "Name", "Attending", "Guests", "Invited as", "Language"]);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(data.submittedAt || Date.now()),
      data.name,
      data.attending === "yes" ? "Yes" : "No",
      Number(data.guests) || 0,
      data.invitedAs || "",
      data.lang || "",
    ]);
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true });
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
```

## 2. Deploy it as a web app

1. Click **Deploy → New deployment**, choose the type **Web app**, and set:
   - **Execute as:** Me
   - **Who has access:** Anyone
2. Click **Deploy** and authorize the script when Google asks.
3. Copy the **Web app URL**. It ends in `/exec`.

> If you edit the script later, deploy it again with **Deploy → Manage deployments → Edit → New version**. Otherwise the URL keeps running the old code.

## 3. Connect the site

Set these environment variables in `.env.local` for local testing, and in your hosting provider's settings (for example Vercel → Project → Settings → Environment Variables) for the live site:

```
RSVP_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXXX/exec
RSVP_WEBHOOK_SECRET=the same string you put in SECRET
```

Then restart `npm run dev` or redeploy, submit a test RSVP, and check that a row appears in the **RSVP** tab of the Sheet.

## Notes

- **"Invited as"** is the `?to=` name from the guest's link. It tells you which invitation a reply came from, even when the guest typed their name differently.
- **Without `RSVP_WEBHOOK_URL`:**
  - In development, replies are only printed to the terminal, not saved.
  - In production, the form shows an error message instead of pretending to succeed.
- **Spam protection:**
  - Submissions that fill the hidden honeypot field are dropped.
  - Values starting with `=`, `+`, `-` or `@` are escaped, so they can't run as formulas in the Sheet.
