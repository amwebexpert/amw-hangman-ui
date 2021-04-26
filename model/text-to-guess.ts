export class TextToGuess {
    static STATE_NAME: string = 'hangman';
    static MAX_TRIALS: number = 10;

    characters: string;
    chars: string[];
    charsTried: string[] = [];
    badTrialCount: number = 0;

    constructor(characters: string) {
        this.characters = characters;
        this.chars = characters.split('');
    }

    tryChar(c: string): TextToGuess {
        if (!this.charsTried.includes(c)) {
            this.charsTried.push(c);
        }

        const ok = this.chars.includes(c);
        if (!ok) {
            this.badTrialCount++;
        }

        // Return a new instance so React can detect ref changes
        const newInstance = new TextToGuess(this.characters);
        newInstance.charsTried = this.charsTried;
        newInstance.badTrialCount = this.badTrialCount;
        console.log('returning', newInstance);
        return newInstance;
    }

    currentStateImage(): string {
        let stateNumber = this.badTrialCount + 1;
        if (stateNumber > TextToGuess.MAX_TRIALS) {
            stateNumber = TextToGuess.MAX_TRIALS;
        }

        const stateNumberPadded = `${stateNumber}`.padStart(2, '0');
        return `${TextToGuess.STATE_NAME}-${stateNumberPadded}`;
    }

    gameOverImage(): string {
        return this.isGameOverWithSuccess() ? 'success' : 'fail';
    }

    isGameOver(): boolean {
        return this.isGameOverWithFailure() || this.isGameOverWithSuccess();
    }

    isGameOverWithFailure(): boolean {
        return this.badTrialCount >= TextToGuess.MAX_TRIALS - 1;
    }

    isGameOverWithSuccess(): boolean {
        return !this.wordGame().includes('_');
    }

    wordGame(): string {
        const wordGame: string[] = this.characters.split('');

        for (let i = 0; i < wordGame.length; i++) {
            const c: string = wordGame[i];
            if (!this.charsTried.includes(c)) {
                wordGame[i] = '_';
            }
        }

        return wordGame.join('');
    }
}
