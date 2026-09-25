# Blue Zone

Parking-disc helper for Swiss Blue Zone spots. Shows if you can park, which time to set on the disc, and when you must leave.

## Run it

Open `index.html` in a browser.

For location and “Add to Home Screen”, serve the folder:

```
python3 -m http.server
```

Then open the address it prints (usually `http://localhost:8000`).

## GitLab Pages

1. Create a GitLab project.
2. Put **these files at the repository root** — `index.html` must not sit inside a subfolder.
3. Push to `main` (or your default branch). The included `.gitlab-ci.yml` publishes the site.
4. Wait for the pipeline to pass, then open **Deploy → Pages** for the URL.

If Pages says *“does not contain the requested file”*, `index.html` is nested. Move everything up one level so the repo looks like:

```
index.html
.gitlab-ci.yml
manifest.webmanifest
sw.js
icons/
README.md
```

Push again and wait for the pipeline.
