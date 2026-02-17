import styles from "./EditorGrid.module.css";
import { CodeEditor } from "../CodeEditor/CodeEditor.jsx";
import { LivePreview } from "../LivePreview/LivePreview.jsx"

export default function EditorGrid({ code, css, onCodeChange, onCssChange }) {
    return (
        <div className={styles["editor-grid"]}>
            {/* Left side - Code Editors */}
            <div className={styles["editors-section"]}>
                <CodeEditor
                    code={code}
                    onChange={onCodeChange}
                    language="jsx"
                    label="JSX (REACT COMPONENT)"
                />
                <CodeEditor
                    code={css}
                    onChange={onCssChange}
                    language="css"
                    label="CSS"
                />
            </div>

            {/* Right side - Live Preview */}
            <div className={styles["preview-section"]}>
                <LivePreview
                    code={code}
                    css={css}
                />
            </div>
        </div>
    );
}