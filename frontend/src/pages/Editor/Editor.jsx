import styles from "./Editor.module.css";
import Nav from "./components/Nav/Nav.jsx";
import EditorGrid from "./components/EditorGrid/EditorGrid.jsx";
import { useState } from "react";

export default function Editor() {
    const [code, setCode] = useState(`const ProductCard = () => {
  return (
    <div className="product-card">
      <h3>Product Name</h3>
      <p>$99.99</p>
    </div>
  );
};`);

    const [css, setCss] = useState(`.product-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  max-width: 300px;
}`);

    return (
        <div className={styles["editor-wrapper"]}>
            <Nav title="Product Card"/>
            <div className={styles["editor-container"]}>
                <EditorGrid
                    code={code}
                    css={css}
                    onCodeChange={setCode}
                    onCssChange={setCss}
                />
            </div>
        </div>
    );
}