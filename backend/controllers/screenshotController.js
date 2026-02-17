import puppeteer from "puppeteer";
import babel from "@babel/core";

const CDN = {
    react: "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js",
    reactDOM: "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js",
};

const transformJSX = (jsCode) => {
    const cleaned = jsCode.replace(/export\s+default\s+/g, '');
    let wrappedCode = cleaned;

    if (!cleaned.includes('=>') || !cleaned.includes('return')) {
        wrappedCode = `const App = () => { return (${cleaned}); };`;
    } else {
        wrappedCode = cleaned.replace(
            /(const|let|var)\s+([A-Z][A-Za-z0-9_]*)\s*=\s*(\(\))?\s*=>/,
            'const App =$3 =>'
        );
    }

    const { code } = babel.transformSync(wrappedCode, {
        presets: ["@babel/preset-react"],
        plugins: ["@babel/plugin-transform-modules-umd"],
    });

    return code.replace(/}\);$/, `window.App = App; });`);
};

export const generateScreenshot = async (req, res) => {
    const { css, js } = req.body;

    if (!js) return res.status(400).json({ error: "JS is required" });

    let browser = null;

    try {
        const compiledJS = transformJSX(js);

        browser = await puppeteer.launch({
            headless: "new",
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--single-process",
            ],
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 500, height: 500, deviceScaleFactor: 2 });

        await page.setContent(
            `<html>
                <head>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { 
                            background: white;
                            min-height: 100vh;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        #app {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        ${css || ""}
                    </style>
                </head>
                <body>
                    <div id="app"></div>
                </body>
            </html>`,
            { waitUntil: "networkidle0" }
        );

        await page.addScriptTag({ url: CDN.react });
        await page.addScriptTag({ url: CDN.reactDOM });
        await page.addScriptTag({ content: compiledJS });

        await page.waitForFunction(
            () => window.App && window.React && window.ReactDOM,
            { timeout: 15000 }
        );

        await page.evaluate(() => {
            const root = ReactDOM.createRoot(document.getElementById("app"));
            root.render(React.createElement(window.App));
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const dimensions = await page.evaluate(() => {
            const app = document.getElementById('app');
            const rect = app.getBoundingClientRect();
            return {
                width: Math.ceil(rect.width),
                height: Math.ceil(rect.height)
            };
        });

        let screenshot;
        if (dimensions.width > 500 || dimensions.height > 500) {
            screenshot = await page.screenshot({ fullPage: true });
        } else {
            screenshot = await page.screenshot({
                clip: {
                    x: Math.max(0, (500 - dimensions.width) / 2),
                    y: Math.max(0, (500 - dimensions.height) / 2),
                    width: dimensions.width,
                    height: dimensions.height
                }
            });
        }

        res.json({ imageUrl: `data:image/png;base64,${screenshot.toString("base64")}` });

    } catch (err) {
        res.status(500).json({ error: "Failed to generate screenshot" });

    } finally {
        await browser?.close();
    }
};