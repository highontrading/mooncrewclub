# Mooncrew Club website

The one-page website for **mooncrewclub.com**: private crews for the world's best nights.

It is plain HTML and CSS with a little JavaScript. There is no build step and nothing to install.

```
index.html   the whole page
img/         the photos used on the page
```

## Before going live

Open `index.html`, scroll to the bottom and fill in `CONFIG`:

```js
var CONFIG = {
  whatsapp: '',   // WhatsApp number with country code, digits only, e.g. 919876543210
  instagram: '',  // Instagram handle without @, e.g. mooncrewclub
  email: ''       // e.g. hello@mooncrewclub.com
};
```

The apply form sends applications to the WhatsApp number. Without a number, the WhatsApp button stays hidden.

## Deploy on Netlify (free)

1. Sign in at [netlify.com](https://www.netlify.com) with GitHub.
2. **Add new project → Import an existing project → GitHub**, then pick `mooncrewclub`.
3. Leave the build command empty and set the publish directory to `/` (the repo root). Deploy.
4. In **Domain management**, add `mooncrewclub.com` (or buy it there). HTTPS is set up automatically.

Every push to `main` then updates the live site on its own.
