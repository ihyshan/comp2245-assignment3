// Wait for the page to load before running any JavaScript
document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll("#board div");  // Select all the squares on the board

    // Step 1: Add 'square' class to each square
    squares.forEach(square => {
        square.classList.add("square");  // Apply the "square" style to each div
    });

    let currentPlayer = "X";  // Start with player X

    // Step 2: Add an "X" or "O" when a square is clicked
    squares.forEach(square => {
        square.addEventListener("click", () => {
            // Only add a mark if the square is empty
            if (square.textContent === "") {
                square.textContent = currentPlayer;  // Place "X" or "O" in the square
                square.classList.add(currentPlayer);  // Add class to style the square with X or O's color
                checkWinner();  // Check if this move wins the game
                currentPlayer = currentPlayer === "X" ? "O" : "X";  // Switch turns between X and O
            }
        });
    });

    // Step 3: Add hover effect
    squares.forEach(square => {
        square.addEventListener("mouseover", () => {
            square.classList.add("hover");  // Add the hover class when mouse is over
        });
        square.addEventListener("mouseout", () => {
            square.classList.remove("hover");  // Remove the hover class when mouse leaves
        });
    });

    // Step 4: Check for a winner
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (
                squares[a].textContent &&                      // Check if square a is not empty
                squares[a].textContent === squares[b].textContent && // Check if a, b, and c are the same
                squares[a].textContent === squares[c].textContent
            ) {
                const winner = squares[a].textContent;  // Winner is either X or O
                const status = document.getElementById("status");  // Get the status div
                status.classList.add("you-won");  // Add winning style
                status.textContent = `Congratulations! ${winner} is the Winner!`;  // Show winner message
                return;  // Stop checking further as we found a winner
            }
        }
    }

    // Step 5: Reset the game when "New Game" button is clicked
    document.getElementById("new-game").addEventListener("click", () => {
        squares.forEach(square => {
            square.textContent = "";            // Clear each square's text
            square.classList.remove("X", "O");   // Remove both X and O classes from each square
        });
        const status = document.getElementById("status");  // Get the status div
        status.classList.remove("you-won");     // Remove winning style
        status.textContent = "Move your mouse over a square and click to play an X or an O."; // Reset status text
        currentPlayer = "X";                    // Reset player to X
    });
});
