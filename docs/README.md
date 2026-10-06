# Blue Zone

Shows if you can park in a Swiss Blue Zone, which time to set on the disc, and when you must leave.

**Live:** [seniormuffinman.github.io/bluedisk](https://seniormuffinman.github.io/bluedisk/)

## Run

Open `index.html` in a browser. That is enough for the clock and the rules.

To use location, notifications, or “Add to Home Screen”, the files must be served as a site (GitHub or GitLab Pages below).

## GitHub Pages

Repo: [seniormuffinman/bluedisk](https://github.com/seniormuffinman/bluedisk)

The address is always `https://<user>.github.io/<repo-name>/`. This project’s repo is named **bluedisk**, so the site is:

https://seniormuffinman.github.io/bluedisk/

If you see *“The site configured at this address does not contain the requested file”*, the URL is wrong (for example `…/blue-zone-parking/` or a repo that has no `index.html` at the root).

Settings → Pages → Deploy from a branch → `main` / `/ (root)`.

## GitLab Pages

1. New GitLab project.
2. Put **these files at the project root** (`index.html` must not sit in a subfolder).
3. Push to the default branch. `.gitlab-ci.yml` copies them into `public/` and publishes the site.
4. Open **Deploy → Pages** for the URL (`https://<user>.gitlab.io/<project>/`).

Same 404 if `index.html` is nested, e.g. `blue-zone-parking/index.html`. Move everything up one level and push again.

## Phone

Open the Pages URL → browser menu → **Add to Home Screen**.
