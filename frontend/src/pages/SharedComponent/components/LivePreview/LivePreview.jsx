import { useEffect, useState, useRef } from "react";
import styles from "./LivePreview.module.css";

export function LivePreview({ code, css }) {
    const [iframeSrc, setIframeSrc] = useState("");
    const [debouncedCode, setDebouncedCode] = useState(code);
    const [debouncedCss, setDebouncedCss] = useState(css);
    const timeoutRef = useRef(null);

    // Debounce effect
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setDebouncedCode(code);
            setDebouncedCss(css);
        }, 500);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [code, css]);

    // Preview effect
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
                        
                        ${debouncedCss}
                    </style>
                </head>
                <body>
                    <div id="root"></div>
                    <script type="text/babel">
                        // User's component code
                        ${debouncedCode}
                        
                        // Find the last defined component (function starting with capital letter)
                        const componentKeys = Object.keys(window).filter(key => 
                            typeof window[key] === 'function' && 
                            key[0] === key[0].toUpperCase() &&
                            !key.includes('React') && 
                            !key.includes('Promise')
                        );
                        
                        // Use the last component defined (usually the main one)
                        const Component = componentKeys.length > 0 
                            ? window[componentKeys[componentKeys.length - 1]]
                            : () => <div style={{padding: '20px', color: '#666'}}>No component found. Make sure your component name starts with a capital letter.</div>;
                        
                        const root = ReactDOM.createRoot(document.getElementById('root'));
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
    }, [debouncedCode, debouncedCss]);

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