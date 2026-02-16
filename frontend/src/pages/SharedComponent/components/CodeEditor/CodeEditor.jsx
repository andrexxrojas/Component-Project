import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css";
import styles from "./CodeEditor.module.css";

export function CodeEditor({ code, onChange, language, label }) {
    const getHighlighter = (code) => {
        if (!code) return;
        if (language === "html") return highlight(code, languages.markup, "markup");
        if (language === "css") return highlight(code, languages.css, "css");
        if (language === "js" || language === "jsx") return highlight(code, languages.jsx || languages.javascript, "jsx");
        return code;
    };

    return (
        <div className={styles["editor-wrapper"]}>
            <div className={styles["editor-label"]}>
                {label}
            </div>
            <div className={styles["editor-container"]}>
                <Editor
                    value={code}
                    onValueChange={onChange}
                    highlight={getHighlighter}
                    padding={16}
                    className={styles["editor-input"]}
                    style={{
                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                        fontSize: 13,
                        lineHeight: 1.6,
                    }}
                    textareaClassName={styles["editor-textarea"]}
                />
            </div>
        </div>
    );
}