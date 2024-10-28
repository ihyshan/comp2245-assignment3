// Wait for the page to load before running any JavaScript
document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll("#board div");  // Select all the squares on the board
    let currentPlayer = "X";  // Start with player X

    // Step 1: Add 'square' class to each square
    squares.forEach(square => {
        square.classList.add("square");
    });


    // Step 2: Add an "X" or "O" when a square is clicked
    squares.forEach(square => {
        square.addEventListener("click", () => {
            // Only add a mark if the square is empty
            if (square.textContent === "") {
                square.textContent = currentPlayer;  
                square.classList.add(currentPlayer);  
                checkWinner();  
                currentPlayer = currentPlayer === "X" ? "O" : "X";  

            }
        });
    });

    // Step 3: Add hover effect
    squares.forEach(square => {
        square.addEventListener("mouseover", () => {
            square.classList.add("hover");  
        });
        square.addEventListener("mouseout", () => {
            square.classList.remove("hover");  

        });
    });

    // Step 4: Check for a winner
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  
            [0, 4, 8], [2, 4, 6]              

        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (
                squares[a].textContent &&
                squares[a].textContent === squares[b].textContent && 
                squares[a].textContent === squares[c].textContent
            ) {
                const winner = squares[a].textContent;  
                const status = document.getElementById("status");  
                status.classList.add("you-won");  
                status.textContent = `Congratulations! ${winner} is the Winner!`;  
                return;  

            }
        }
    }

    // Step 5: Reset the game when "New Game" button is clicked
    const newGameButton = document.getElementById("new-game"); // Check for "New Game" button

    if (newGameButton) {  // Only add event listener if button exists
        newGameButton.addEventListener("click", () => {
            squares.forEach(square => {
                square.textContent = "";           // Clear each square's text
                square.classList.remove("X", "O"); // Remove both X and O classes from each square
            });
            const status = document.getElementById("status");  // Get the status div
            status.classList.remove("you-won");     // Remove winning style
            status.textContent = "Move your mouse over a square and click to play an X or an O."; // Reset status text
            currentPlayer = "X";                    // Reset player to X
        });
    } else {
        console.error("New Game button not found! Ensure it has the correct id."); // Log error if button not found
    }

});
