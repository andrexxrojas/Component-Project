import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import babel from "@babel/core";

const CDN = {
    react: "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js",
    reactDOM: "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js",
};

const transformJSX = (jsCode) => {
    try {
        console.log('Transforming JSX...');

        let cleaned = jsCode.replace(/export\s+default\s+/g, '');

        let wrappedCode = cleaned;

        const hasComponentDefinition = cleaned.includes('=>') ||
            cleaned.includes('function') ||
            cleaned.includes('return');

        if (!hasComponentDefinition) {
            wrappedCode = `const App = () => { return (${cleaned}); };`;
        } else {
            wrappedCode = cleaned.replace(
                /(const|let|var)\s+([A-Za-z0-9_]+)\s*=\s*(\(\))?\s*=>/,
                'const App =$3 =>'
            );

            wrappedCode = wrappedCode.replace(
                /function\s+([A-Za-z0-9_]+)\s*\(/,
                'function App('
            );
        }

        const result = babel.transformSync(wrappedCode, {
            presets: ["@babel/preset-react"],
            plugins: ["@babel/plugin-transform-modules-umd"],
        });

        let finalCode = result.code;

        if (finalCode.includes('});')) {
            finalCode = finalCode.replace(/}\);$/, 'window.App = App; });');
        } else {
            finalCode += '\nwindow.App = App;';
        }

        return finalCode;
    } catch (error) {
        console.error('JSX Transformation Error:', error);
        throw new Error(`Failed to transform JSX: ${error.message}`);
    }
};

const getBrowserLaunchOptions = async () => {
    const isVercel = process.env.VERCEL === "1";
    const isProduction = process.env.NODE_ENV === "production";
    const isAwsLambda = !!process.env.AWS_LAMBDA_FUNCTION_NAME;

    if (isVercel || isProduction || isAwsLambda) {

        const executablePath = await chromium.executablePath();

        return {
            args: [
                ...chromium.args,
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--single-process',
            ],
            executablePath,
            headless: chromium.headless,
            defaultViewport: {
                width: 500,
                height: 500,
                deviceScaleFactor: 2
            }
        };
    }
    else {
        console.log('Using local Puppeteer configuration');

        const fullPuppeteer = await import('puppeteer');

        return {
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
            ],
            headless: 'new',
            defaultViewport: {
                width: 500,
                height: 500,
                deviceScaleFactor: 2
            }
        };
    }
};

export const generateScreenshot = async (req, res) => {
    const { css, js } = req.body;

    if (!js) {
        return res.status(400).json({ error: "JS is required" });
    }

    let browser = null;

    try {
        console.log('=== Starting Screenshot Generation ===');

        console.log('Step 1: Transforming JSX...');
        const compiledJS = transformJSX(js);
        console.log('✓ JSX transformed successfully');

        console.log('Step 2: Configuring browser...');
        const launchOptions = await getBrowserLaunchOptions();
        console.log('Environment:', process.env.NODE_ENV || 'development');
        console.log('Launch options:', JSON.stringify({
            ...launchOptions,
            executablePath: launchOptions.executablePath || 'default'
        }, null, 2));

        console.log('Step 3: Launching browser...');
        browser = await puppeteer.launch(launchOptions);
        console.log('✓ Browser launched');

        console.log('Step 4: Creating page...');
        const page = await browser.newPage();

        const timeout = process.env.NODE_ENV === 'production' ? 10000 : 30000;
        page.setDefaultTimeout(timeout);

        await page.setViewport({ width: 500, height: 500, deviceScaleFactor: 2 });
        console.log('✓ Page created and viewport set');

        console.log('Step 5: Preparing HTML content...');
        const htmlContent = `
            <!DOCTYPE html>
            <html>
                <head>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { 
                            background: white;
                            min-height: 100vh;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-family: system-ui, -apple-system, sans-serif;
                        }
                        #root {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 100%;
                        }
                        ${css || ""}
                    </style>
                </head>
                <body>
                    <div id="root"></div>

                    <script src="${CDN.react}"></script>
                    <script src="${CDN.reactDOM}"></script>

                    <script>
                        ${compiledJS}

                        window.addEventListener('load', function() {
                            console.log('Window loaded');
                            if (window.App && window.ReactDOM && window.React) {
                                try {
                                    const root = ReactDOM.createRoot(document.getElementById('root'));
                                    root.render(React.createElement(window.App));
                                    console.log('✓ Component rendered');
                                } catch (err) {
                                    console.error('Render error:', err);
                                    document.getElementById('root').innerHTML = 'Render Error: ' + err.message;
                                }
                            } else {
                                console.error('Missing dependencies:', {
                                    App: !!window.App,
                                    ReactDOM: !!window.ReactDOM,
                                    React: !!window.React
                                });
                            }
                        });
                    </script>
                </body>
            </html>
        `;

        console.log('Step 6: Setting page content...');
        await page.setContent(htmlContent, {
            waitUntil: ["load", "networkidle0"],
            timeout
        });
        console.log('✓ Page content set');

        console.log('Step 7: Waiting for component to render...');
        await page.waitForFunction(
            () => {
                const root = document.getElementById('root');
                return root && root.children.length > 0;
            },
            { timeout, polling: 100 }
        );
        console.log('✓ Component rendered');

        console.log('Step 8: Calculating dimensions...');
        const dimensions = await page.evaluate(() => {
            const root = document.getElementById('root');
            const firstChild = root?.children[0];
            if (firstChild) {
                const rect = firstChild.getBoundingClientRect();
                return {
                    width: Math.max(1, Math.ceil(rect.width)),
                    height: Math.max(1, Math.ceil(rect.height))
                };
            }
            return { width: 500, height: 500 };
        });
        console.log('Dimensions:', dimensions);

        console.log('Step 9: Taking screenshot...');
        let screenshotBuffer;
        if (dimensions.width > 500 || dimensions.height > 500) {
            screenshotBuffer = await page.screenshot({
                fullPage: true,
                type: 'png',
                encoding: 'binary'
            });
        } else {
            screenshotBuffer = await page.screenshot({
                clip: {
                    x: Math.max(0, (500 - dimensions.width) / 2),
                    y: Math.max(0, (500 - dimensions.height) / 2),
                    width: dimensions.width,
                    height: dimensions.height
                },
                type: 'png',
                encoding: 'binary'
            });
        }
        console.log('✓ Screenshot taken, size:', screenshotBuffer.length, 'bytes');

        const base64Image = screenshotBuffer.toString('base64');

        console.log('=== Screenshot Generation Complete ===');

        res.json({
            success: true,
            imageUrl: `data:image/png;base64,${base64Image}`
        });

    } catch (err) {
        console.error('❌ Screenshot generation failed:', {
            message: err.message,
            stack: err.stack,
            name: err.name
        });

        const errorResponse = {
            error: "Failed to generate screenshot",
            details: err.message
        };

        if (process.env.NODE_ENV !== 'production') {
            errorResponse.stack = err.stack;
        }

        res.status(500).json(errorResponse);

    } finally {
        if (browser) {
            try {
                await browser.close();
                console.log('✓ Browser closed');
            } catch (closeError) {
                console.error('Error closing browser:', closeError);
            }
        }
    }
};