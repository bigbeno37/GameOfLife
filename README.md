# Game of Life
A React implementation of the popular [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life),
using React + Typescript + Vite + Redux + TailwindCSS.

## What is Conway's Game of Life?
Conway's Game of Life is a set of rules that create an algorithm that simulates simple life on a two-dimensional board.
This board is made up of either dead or alive cells, and each generation produces new cells based on the following
restrictions:

1. Any live cell with two or three live neighbours survives.
2. Any dead cell with three live neighbours becomes a live cell.
3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

## Developer Setup
### Prerequisites
 - NodeJS 14+

### Running the application locally
Clone the repository and navigate into it inside a terminal. Run `npm i` to install all necessary dependencies, and 
afterwards simply run `npm run dev` to start a Vite dev server. By default, this will open a server listening 
at `http://localhost:3000/GameOfLife`.

### Running tests

To run the automated tests (located in the `tests` directory), run `npm run test`, which will load `vitest` and
run through the various React Testing Library tests.

### Running the linter

This project uses ESLint as an automated styling / linting tool. To ensure the project meets expected code guidelines
and quality, run `npm run lint`. If the program terminates and nothing is logged, no issues were found.

## Contributions
Contributions are welcome! If you spot a typo or a subtle bug, please open a pull request, ensure that all tests pass
and the linter detects no issues, and we'll go from there.