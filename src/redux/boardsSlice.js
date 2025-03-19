import { createSlice } from '@reduxjs/toolkit';
import data from '../data.json';

const boardsSlice = createSlice({
  name: 'boards',
  initialState: data.boards, // Initialize state with predefined boards from JSON data
  reducers: {
    // Add a new board to the state
    addBoard: (state, action) => {
      const isActive = state.length > 0 ? false : true; // First board is active by default
      const payload = action.payload;
      const board = {
        name: payload.name,
        isActive, // Determines if the board is currently active
        columns: payload.newColumns, // List of columns associated with the board
      };
      state.push(board); // Add the new board to the state
    },

    // Edit the currently active board by updating its name and columns
    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      if (board) {
        board.name = payload.name; // Update board name
        board.columns = payload.newColumns; // Update board columns
      }
    },

    // Delete the currently active board from the state
    deleteBoard: (state) => {
      const board = state.find((board) => board.isActive);
      if (board) {
        state.splice(state.indexOf(board), 1); // Remove board from the list
      }
    },

    // Set a board as active based on the provided index
    setBoardActive: (state, action) => {
      state.forEach((board, index) => {
        board.isActive = index === action.payload.index; // Activate selected board and deactivate others
      });
    },

    // Add a new task to a specific column in the active board
    addTask: (state, action) => {
      const { title, status, description, subtasks, newColIndex } = action.payload;
      const task = { title, description, subtasks, status }; // Define new task object
      const board = state.find((board) => board.isActive);
      if (board) {
        const column = board.columns[newColIndex];
        if (column) {
          column.tasks.push(task); // Add task to the specified column
        }
      }
    },

    // Edit an existing task, possibly moving it between columns
    editTask: (state, action) => {
      const { title, status, description, subtasks, prevColIndex, newColIndex, taskIndex } =
        action.payload;
      const board = state.find((board) => board.isActive);
      if (board) {
        const prevColumn = board.columns[prevColIndex];
        if (prevColumn) {
          const task = prevColumn.tasks[taskIndex];
          if (task) {
            task.title = title;
            task.status = status;
            task.description = description;
            task.subtasks = subtasks;

            if (prevColIndex !== newColIndex) {
              prevColumn.tasks.splice(taskIndex, 1); // Remove task from previous column
              board.columns[newColIndex].tasks.push(task); // Move task to new column
            }
          }
        }
      }
    },

    // Drag and drop a task between columns
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);
      if (board) {
        const prevCol = board.columns[prevColIndex];
        const newCol = board.columns[colIndex];
        if (prevCol && newCol) {
          const task = prevCol.tasks.splice(taskIndex, 1)[0]; // Remove task from previous column
          newCol.tasks.push(task); // Add task to new column
        }
      }
    },

    // Toggle the completion status of a subtask
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      if (board) {
        const col = board.columns[payload.colIndex];
        if (col) {
          const task = col.tasks[payload.taskIndex];
          if (task) {
            const subtask = task.subtasks[payload.index];
            if (subtask) {
              subtask.isCompleted = !subtask.isCompleted; // Toggle completion status
            }
          }
        }
      }
    },

    // Move a task from one column to another and update its status
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      if (board) {
        const col = board.columns[payload.colIndex];
        if (col && payload.colIndex !== payload.newColIndex) {
          const task = col.tasks.splice(payload.taskIndex, 1)[0]; // Remove task from current column
          if (task) {
            task.status = payload.status; // Update task status
            board.columns[payload.newColIndex].tasks.push(task); // Move task to new column
          }
        }
      }
    },

    // Delete a task from a specific column
    deleteTask: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      if (board) {
        const col = board.columns[payload.colIndex];
        if (col) {
          col.tasks.splice(payload.taskIndex, 1); // Remove task from column
        }
      }
    },
  },
});

export default boardsSlice;
