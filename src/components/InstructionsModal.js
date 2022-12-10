import styles from "./modules/InstructionsModal.module.css";
import Modal from "./Modal";
import Button from "./Button";
import { IoCloseSharp } from "react-icons/io5";

function InstructionsModal({ close }) {
  return (
    <Modal>
      <div className={styles.instructions}>
        <button className={styles.closeButton} onClick={close}>
          <IoCloseSharp />
        </button>
        <h1>Instructions</h1>
        <section>
          <h2>Object of the Game</h2>
          <p>
            The object of the game is to guess a secret code consisting of a
            series of 4 colors. Each guess results in feedback narrowing down
            the possibilities of the secret code. To win solve the code within
            10 guesses.
          </p>
        </section>
        <section>
          <h2>Layout</h2>
          <img src="/images/gameBoard.png" alt="game board" />
          <ol>
            <li>Game Board</li>
            <li>Color Keypad</li>
          </ol>
        </section>
        <section>
          <h2>Gameplay</h2>
          <p>The game goes as follows:</p>
          <ol>
            <li>The player uses the keypad to input a series of colors.</li>
            <li>
              The game responds with 0-4 colored pegs.
              <ul>
                <li>
                  <p>
                    A yellow peg indicats the right color in the wrong position
                  </p>
                  <img src="/images/yellowPeg.png" alt="yellow peg" />
                </li>
                <li>
                  <p>A green peg indicates a color in the correct position.</p>
                  <img src="/images/greenPeg.png" alt="green peg" />
                </li>
                <li>
                  <p>No peg indicates a color does not appear in the code.</p>
                  <img src="/images/noPeg.png" alt="no peg" />
                </li>
              </ul>
            </li>
            <li>
              <p>
                The player continues to place rows of colors and receive
                feedback until either the code is broken, or the player runs out
                of guesses.
              </p>
            </li>
          </ol>
        </section>
        <section className={styles.examplesContainer}>
          <h2>Examples</h2>
          <ul>
            <li>
              <img
                src="/images/oneGreenOneYellow.png"
                alt="one green one yellow"
              />
              <p>
                One colour in the right place, one color in the wrong place.
              </p>
            </li>
            <li>
              <img src="/images/threeGreen.png" alt="threeGreen" />
              <p>Three colors in the write place.</p>
            </li>
            <li>
              <img src="/images/fourGreen.png" alt="four green" />
              <p>All colors in the right place.</p>
            </li>
          </ul>
        </section>
        <Button onClick={close}>close</Button>
      </div>
    </Modal>
  );
}

export default InstructionsModal;
