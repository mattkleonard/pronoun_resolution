const nStims = 13;
const questions = ['Whose turn was over?', 'Whose turn was next?', 'Who was full?', 'Who was hungry?', 'What is too thick?', 'What is too small?', 'What was too high?', 'What was too tall?', 'What was full?', 'What was empty?', 'Who had given help?', 'Who had received help?', 'Who is going to sleep?', 'Who is going to work?', 'What was made of steel?', 'What was made of styrofoam?', 'What has to be cleaned?', 'What has to be removed?', 'What was tasty?', 'What was hungry?', 'Who was weak?', 'Who was heavy?', 'What is too wide?', 'What is too narrow?', 'What is too small?', 'What is too large?'];

const answers = [['Bill', 'John'], ['Bill', 'John'], ['Bill', 'John'], ['Bill', 'John'], ['that tree', 'that axe'], ['that tree', 'that axe'], ['the shelf', 'the pot'], ['the shelf', 'the pot'], ['the cup', 'the bottle'], ['the cup', 'the bottle'], ['Susan', 'Joan'], ['Susan', 'Joan'], ['Sally', 'Mary'], ['Sally', 'Mary'], ['the ball', 'the table'], ['the ball', 'the table'], ['the drain', 'hair'], ['the drain', 'hair'], ['the worm', 'the fish'], ['the worm', 'the fish'], ['the man', 'his son'], ['the man', 'his son'], ['the table', 'the doorway'], ['the table', 'the doorway'], ['the suitcase', 'the trophy'], ['the suitcase', 'the trophy']];

function loadStims(stimDir, nStims) {
    const stims = [];
    for (let i = 1; i <= nStims; i++) {
        const audioA = new Audio(stimDir + '/stim' + i + 'a.wav');
        const audioB = new Audio(stimDir + '/stim' + i + 'b.wav');
        stims.push(audioA, audioB);
    }
    return stims;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getInput(prompt) {
    return prompt; // Mocked input, replace with actual user input function
}

const stimDir = '/pronoun_resolution/pilot_stims';

function displayText(text) {
    const promptDiv = document.createElement('div');
    promptDiv.textContent = text;
    document.body.appendChild(promptDiv);
}

async function startExperiment() {
    const out = {};

    // Ask for subject initials
    out.SID = getInput('Subject initials: ');

    // Ask if the user is a native English speaker
    out.lang = getInput('Are you a native English speaker? (y/n)');
    
    const stims = loadStims(stimDir, nStims);
    const shuffledIndices = shuffleArray(Array.from({ length: nStims }, (_, i) => i));

    for (let i = 0; i < nStims; i++) {
        const index = shuffledIndices[i];
        const question = questions[index];
        const answer1 = answers[index][0];
        const answer2 = answers[index][1];

        // Play audio
        await playAudioAndWait(stims[index]);

        // Display question and answers
        displayText(question);
        displayText(`[1] ${answer1}`);
        displayText(`[2] ${answer2}`);

        let response;
        while (response !== '1' && response !== '2') {
            response = await waitForButtonPress();
        }
        console.log(`Trial ${i + 1} response: ${response}`);

        // Clear the screen
        clearScreen();
    }

    console.log(out);
}

function clearScreen() {
    document.body.innerHTML = '';
}

function playAudioAndWait(audio) {
    return new Promise((resolve, reject) => {
        audio.play().catch(error => reject(error));
        audio.addEventListener('ended', () => resolve());
    });
}

function waitForButtonPress() {
    return new Promise(resolve => {
        window.addEventListener('keydown', function listener(event) {
            window.removeEventListener('keydown', listener);
            resolve(event.key);
        });
    });
}

document.getElementById('startButton').addEventListener('click', startExperiment);

startExperiment();
