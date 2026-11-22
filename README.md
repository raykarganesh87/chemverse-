# ChemVerse – Composite Chemistry Tool

Chemistry from School to Master's level (General, Organic, Inorganic, Physical,
Analytical, Medicinal, Environmental, Industrial).

**Created by Mr. Ganesh Raykar**

## Build the APK from GitHub (no software needed on your PC)

1. Create a new repository on GitHub (e.g. `chemverse`).
2. Upload ALL files from this zip (keep the `.github/workflows` folder).
   Easiest: unzip, then drag-and-drop everything into the repo on github.com
   ("Add file" → "Upload files"). Make sure the `.github` folder is included.
3. Open the **Actions** tab. The workflow "Build Android APK" starts
   automatically (or click it → "Run workflow").
4. After ~5–8 minutes, open the finished run and download **ChemVerse-APK**
   from the *Artifacts* section. Unzip it to get `app-debug.apk`.
5. Copy the APK to your Android phone and install it
   (allow "Install unknown apps" when asked).

## Add more content
- Topics: one file per branch, `www/data/content-*.js` (add lines like `T("organic","Masters","Title","Text");`)
- Branch list: `www/data/topics.js`
- Quiz questions: `www/data/quiz-extra.js` (`Q("branch","Question",[options],correctIndex);`)
- Calculators: `www/js/tools.js` and `www/js/app.js`
- Elements: `www/data/elements.js`

## Local test
Just open `www/index.html` in a browser.
