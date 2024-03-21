const nStims = 13;
const questions = ['Whose turn was over?', 'Whose turn was next?', 'Who was full?', 'Who was hungry?', 'What is too thick?', 'What is too small?', 'What was too high?', 'What was too tall?', 'What was full?', 'What was empty?', 'Who had given help?', 'Who had received help?', 'Who is going to sleep?', 'Who is going to work?', 'What was made of steel?', 'What was made of styrofoam?', 'What has to be cleaned?', 'What has to be removed?', 'What was tasty?', 'What was hungry?', 'Who was weak?', 'Who was heavy?', 'What is too wide?', 'What is too narrow?', 'What is too small?', 'What is too large?'];

const answers = [['Bill', 'John'], ['Bill', 'John'], ['Bill', 'John'], ['Bill', 'John'], ['that tree', 'that axe'], ['that tree', 'that axe'], ['the shelf', 'the pot'], ['the shelf', 'the pot'], ['the cup', 'the bottle'], ['the cup', 'the bottle'], ['Susan', 'Joan'], ['Susan', 'Joan'], ['Sally', 'Mary'], ['Sally', 'Mary'], ['the ball', 'the table'], ['the ball', 'the table'], ['the drain', 'hair'], ['the drain', 'hair'], ['the worm', 'the fish'], ['the worm', 'the fish'], ['the man', 'his son'], ['the man', 'his son'], ['the table', 'the doorway'], ['the table', 'the doorway'], ['the suitcase', 'the trophy'], ['the suitcase', 'the trophy']];

function loadStims(stimDir, nStims) {
    const stims = [];
    const aud_fs = 48000; // Assuming sample rate
    for (let i = 1; i <= nStims; i++) {
        const audioA = new Audio(stimDir + '/stim' + i + 'a.wav');
        const audioB = new Audio(stimDir + '/stim' + i + 'b.wav');
        stims.push(audioA, audioB);
    }
    return { stims, aud_fs };
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

async function startExperiment() {
    const out = {
        SID: getInput('Subject initials: '),
        lang: getInput('Are you a native English speaker? (y/n)')
    };

    const stimDir = '/pronoun_resolution/pilot_stims';

    const { stims, aud_fs } = loadStims(stimDir, nStims);

    const stimOrder = shuffleArray(Array.from({ length: stims.length }, (_, i) => i));
    const stimsOrder = stimOrder.map(index => stims[index]);
    const questOrder = stimOrder.map(index => questions[index]);
    const ansOrder = stimOrder.map(index => answers[index]);

    for (let i = 0; i < stimsOrder.length; i++) {
        const response = prompt(questOrder[i] + '\n[1] ' + ansOrder[i][0] + '\n[2] ' + ansOrder[i][1]);
        // Record response
        console.log(`Trial ${i+1} response: ${response}`);
        
        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second between trials
    }

    console.log(out);
}

startExperiment();
