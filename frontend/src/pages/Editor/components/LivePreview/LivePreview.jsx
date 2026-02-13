import { useEffect, useState } from "react";
import styles from "./LivePreview.module.css";

export function LivePreview({ code, css }) {
    const [iframeSrc, setIframeSrc] = useState("");

    useEffect(() => {
        const combinedCode = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
                    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
                    <style>
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        
                        body {
                            font-family: system-ui, -apple-system, sans-serif;
                            background: #f8fafc;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            min-height: 100vh;
                            padding: 2rem;
                        }
                        
                        ${css}
                    </style>
                </head>
                <body>
                    <div id="root"></div>
                    <script type="text/babel">
                        ${code}
                        
                        const rootElement = document.getElementById('root');
                        const root = ReactDOM.createRoot(rootElement);
                        
                        // Find the component (assumes last defined component or default export)
                        const Component = typeof ProductCard !== 'undefined' ? ProductCard : 
                                        typeof App !== 'undefined' ? App : 
                                        (() => <div>No component found</div>);
                        
                        root.render(<Component />);
                    </script>
                </body>
            </html>
        `;

        const blob = new Blob([combinedCode], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        setIframeSrc(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [code, css]);

    return (
        <div className={styles["preview-wrapper"]}>
            <div className={styles["preview-label"]}>
                LIVE PREVIEW
            </div>
            <div className={styles["preview-container"]}>
                <iframe
                    src={iframeSrc}
                    className={styles["preview-iframe"]}
                    title="live-preview"
                    sandbox="allow-scripts allow-forms allow-same-origin"
                />
            </div>
        </div>
    );
}