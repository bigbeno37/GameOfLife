/**
 * Represents an individual Cell on the board. This is either Dead (false) or Alive (true).
 */
export type Cell = boolean;

/**
 * Represents a row on the Board, containing many Cells.
 */
export type Row = Cell[];

/**
 * Represents an entire Board, which consists of multiple Rows of Cells.
 */
export type Board = Row[];