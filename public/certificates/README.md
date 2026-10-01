Drop your certificate image files in this folder (e.g. `postman-api.webp`,
`cypress-course.jpg`), then add an entry in `src/data/certificates.js`
(there's a copy-paste template at the top of that file) with `title`,
`organization`, `url` (where the card should link to), and `image` set to
`/certificates/your-file.webp`. `year` is optional.

**Keep images small.** The cards display them at about 300px wide, so a
1200px-wide WebP or JPEG under ~200 KB is plenty and keeps the page fast.
To convert a big PNG: https://squoosh.app (free, runs in your browser).

This README also keeps the folder tracked in git even if it were ever
empty (git doesn't track empty folders) — feel free to delete it, it's
just documentation.
