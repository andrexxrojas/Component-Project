import styles from "./Landing.module.css";
import TopNav from "./components/TopNav/TopNav.jsx";
import {useNavigate} from "react-router-dom";
import {ArrowRightIcon} from "@phosphor-icons/react";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className={styles["landing-wrapper"]}>
            <TopNav />
            <section className={styles["hero-container"]}>
                <h1 className={styles["hero-title"]}>Build components. <br/>Share instantly.</h1>
                <p className={styles["hero-subtitle"]}>
                    The modern playground for frontend developers. <br/>
                    Create, test, and document your UI components.
                </p>
                <button
                    className={styles['btn']}
                    onClick={() => navigate("/auth?type=register")}
                >
                    <span className={styles["btn-txt"]}>Start Building</span>
                    <ArrowRightIcon size={15} weight="bold"/>
                </button>
            </section>
        </div>
    )
}