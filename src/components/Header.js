import styles from "./modules/Header.module.css";
import { AiOutlineInfoCircle } from "react-icons/ai";

function Header({ setShowInstructions }) {
  return (
    <header className={styles.header}>
      <span className={styles.title}>Mastermind</span>
      <button
        className={styles.infoButton}
        onClick={() => setShowInstructions(true)}
      >
        <AiOutlineInfoCircle />
      </button>
    </header>
  );
}

export default Header;
