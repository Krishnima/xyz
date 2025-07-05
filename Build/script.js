const candidates = ["Alice", "Bob", "Charlie", "David"];
let voteHistory = []; // Stack to store the votes
let votes = new Map(); // HashMap to store votes

// Initialize the candidate list in the UI
window.onload = () => {
    loadCandidates();
};

// Load candidates dynamically into the HTML
function loadCandidates() {
    const candidatesContainer = document.getElementById("candidates");
    candidates.forEach((candidate, index) => {
        const candidateDiv = document.createElement("div");
        candidateDiv.innerHTML = `
            <input type="radio" id="candidate-${index}" name="candidate" value="${candidate}">
            <label for="candidate-${index}">${candidate}</label>
        `;
        candidatesContainer.appendChild(candidateDiv);
    });

    // Enable submit button when a vote is selected
    const radioButtons = document.querySelectorAll('input[name="candidate"]');
    radioButtons.forEach(button => {
        button.addEventListener('change', () => {
            document.getElementById("submitVoteBtn").disabled = false;
        });
    });

    // Handle submit vote button click
    document.getElementById("submitVoteBtn").addEventListener("click", submitVote);
}

// Handle vote submission
function submitVote() {
    const selectedCandidate = document.querySelector('input[name="candidate"]:checked').value;

    // Store the vote
    if (!votes.has(selectedCandidate)) {
        votes.set(selectedCandidate, 1);
    } else {
        votes.set(selectedCandidate, votes.get(selectedCandidate) + 1);
    }

    // Push vote to history stack
    voteHistory.push(selectedCandidate);

    // Disable the vote button after voting
    document.getElementById("submitVoteBtn").disabled = true;

    // Enable the "Show Results" button after voting
    document.getElementById("showResultsBtn").style.display = "block";
}

// Sorting function to display results
function displayResults() {
    const resultsSection = document.getElementById("results");
    const sortedVotes = sortVotes(votes);
    
    // Clear previous results
    resultsSection.innerHTML = '';
    
    // Display sorted results
    sortedVotes.forEach(candidate => {
        const resultDiv = document.createElement("div");
        resultDiv.innerText = `${candidate[0]}: ${candidate[1]} votes`;
        resultsSection.appendChild(resultDiv);
    });

    // Show the results section
    document.getElementById("results-section").style.display = "block";

    // Disable the "Show Results" button after displaying results
    document.getElementById("showResultsBtn").disabled = true;
}

// Sorting algorithm to sort candidates by votes
function sortVotes(votes) {
    // Convert Map to an array of [candidate, votes]
    const voteArray = Array.from(votes);
    // Sort by the number of votes in descending order
    return voteArray.sort((a, b) => b[1] - a[1]);
}
