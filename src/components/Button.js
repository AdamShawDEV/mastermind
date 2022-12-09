import styles from "./modules/Button.module.css";

function Button({ children, onClick, style = {} }) {
  return (
    <button className={styles.buttonStyles} style={style} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
