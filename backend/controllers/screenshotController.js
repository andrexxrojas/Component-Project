import puppeteer from "puppeteer";
import babel from "@babel/core";

const transformJSX = (jsCode) => {
    // Replace "export default" with "const App ="
    const cleaned = jsCode.replace(/export\s+default\s+/g, "const App = ");

    const {code} = babel.transformSync(cleaned, {
        presets: ["@babel/preset-react"],
        plugins: ["@babel/plugin-transform-modules-umd"], // UMD to wrap
    });

    // Move window.App assignment inside the IIFE
    return code.replace(
        /}\);$/,
        `window.App = App; });`
    );
};

export const generateScreenshot = async (req, res) => {
    const {html, css, js} = req.body;

    if (!html || !js) return res.status(400).json({error: "HTML and JS required"});

    try {
        const compiledJS = transformJSX(js);

        console.log("=== COMPILED JS ===");
        console.log(compiledJS);
        console.log("==================");

        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1920,1080"],
        });

        const page = await browser.newPage();
        await page.setViewport({width: 500, height: 500, deviceScaleFactor: 2});

        // Log console messages
        page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
        page.on("pageerror", (err) => console.error("PAGE ERROR:", err));

        // Load your HTML content (only basic structure; no React scripts)
        await page.setContent(`
      <html>
        <head>
          <style>
            body { background: white; }
            ${css || ""}
          </style>
        </head>
        <body>
          <div id="app"></div>
        </body>
      </html>
    `, {waitUntil: "domcontentloaded"});

        // Inject React and ReactDOM from CDN
        await page.addScriptTag({url: "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.min.js"});
        await page.addScriptTag({url: "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.min.js"});

        // Inject compiled JSX (App)
        await page.addScriptTag({content: compiledJS});

        // Wait for App to be defined
        await page.waitForFunction(() => window.App !== undefined && window.React && window.ReactDOM);

        // Render App
        await page.evaluate(() => {
            const root = ReactDOM.createRoot(document.getElementById("app"));
            root.render(React.createElement(window.App));
        });

        // Wait a little for styles and fonts to apply
        await new Promise(resolve => setTimeout(resolve, 500));

        // Screenshot
        const screenshotBuffer = await page.screenshot({fullPage: true, omitBackground: false});
        await browser.close();

        res.json({imageUrl: `data:image/png;base64,${screenshotBuffer.toString("base64")}`});

    } catch (err) {
        console.error("Puppeteer screenshot error:", err);
        res.status(500).json({error: "Failed to generate screenshot"});
    }
};
