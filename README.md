# PingPongProject
# Ping Pong Game

This is a simple ping pong game built using **JavaScript**, **HTML**, and **CSS**. The game allows a player to compete against a basic AI opponent. It includes sound effects, score tracking, and collision detection.

## Overview

I developed this game with guidance from my instructor, **Guillerme Lima**, at **Alura**. This was an exciting project as it helped me better understand game mechanics like positioning, collision detection, and user input handling.

The player controls the left paddle using the **up** and **down arrow keys**, while the opponent automatically follows the ball. The game only starts when the player moves their paddle.

## Features

- Player vs. AI ping pong gameplay
- Score tracking for both the player and the opponent
- Dynamic ball movement and collision detection
- Paddle movement with arrow keys
- The game only starts after the player moves their paddle
- Sound effects for ball collisions (optional)
- Resetting the ball after a point is scored

## How to Play

- Use the **Up Arrow** and **Down Arrow** keys to move your paddle up and down.
- The game will start as soon as you move your paddle.
- The ball will bounce off the top, bottom, and paddles, and if it goes past a paddle, the other player scores a point.
- The game will reset the ball to the center after each point.

## Running the Game

1. Clone or download this repository.
2. Open the `index.html` file in your browser to play the game.

### Files

- `index.html` – The main HTML file that contains the structure of the game.
- `style.css` – A simple CSS file for styling the game board.
- `sketch.js` – The JavaScript file where the game logic is implemented.

## Code Breakdown

### Ball and Paddle Mechanics

The ball starts at a central position on the screen and moves in both the X and Y directions. The speed and direction of the ball are affected by paddle collisions and screen borders. Player movement is controlled using the arrow keys.

The opponent AI follows the ball’s Y position but moves slower than the ball, giving the player an advantage.

### Scoring

Each time the ball crosses a paddle, the other player gets a point. The ball is then reset to the center, and the game continues.

## Future Improvements

- Adding difficulty levels for the opponent AI
- Implementing different ball speeds based on the current score
- Adding a win condition (e.g., first to 10 points)
- Enhancing the UI and adding more sound effects

## Credits

- Developed with the guidance of **Guillerme Lima** at **Alura**
