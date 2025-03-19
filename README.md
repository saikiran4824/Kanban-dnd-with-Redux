# Kanban Board

A simple and intuitive Kanban board for task management built with React, Redux, and TailwindCSS. This project allows users to organize tasks into columns, providing an efficient way to manage projects.

## Technologies Used

- **React**: The JavaScript library for building user interfaces.
- **Redux Toolkit**: A set of tools to simplify Redux usage.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **Lodash**: A modern JavaScript utility library.
- **Prettier**: Code formatter to ensure consistent code style.
- **Headless UI**: A set of completely unstyled, fully accessible UI components, designed to integrate well with TailwindCSS.
- **UUID**: A library to generate unique identifiers for tasks.

## How Redux is Used

Now, let's dive into how Redux is used specifically in the project:

### 1. Centralized State Management

Redux allows us to manage the state of tasks, columns, and user interactions in a centralized manner. By centralizing all this data in Redux, we ensure that components don't need to manage their own local state for these items. They can simply read from Redux, making it easier to manage and sync the app's state across components.

For example, the current state of tasks is stored in Redux, and any component that needs to display tasks can access this state directly from the Redux store.

- **Tasks**: The task's ID, description, and status.
- **Columns**: Each column and the tasks that belong to it.
- **User Interactions**: Things like drag-and-drop actions or editing a task.

### 2. Slices

The Redux store is divided into **slices**, where each slice represents a part of the application state. Each slice contains:

- **State**: The data you want to store.
- **Reducers**: Functions that define how to update the state when actions are dispatched.

In the **Kanban Task Manager**, we define slices for different parts of the app, such as:

- **tasksSlice**: Manages the state of tasks (task descriptions, statuses, etc.).
- **columnsSlice**: Manages the state of columns (which tasks belong to which columns, etc.).

Here’s an example of a `tasksSlice`:

```javascript
// tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);  // Adds a new task
    },
    updateTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.content = action.payload.content; // Updates task content
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload.id); // Removes a task
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
```

3. Dispatching Actions
Actions are dispatched to modify the state. An action is just an object describing the change you want to make. Actions are typically dispatched from components when the user interacts with the UI.

For example, when a user adds a new task, you dispatch the addTask action:

```javascript

import { useDispatch } from 'react-redux';
import { addTask } from './tasksSlice';

const TaskForm = () => {
  const dispatch = useDispatch();

  const handleAddTask = () => {
    const newTask = { id: Date.now(), content: 'New Task' };
    dispatch(addTask(newTask)); // Dispatching the action to add a task
  };

  return (
    <button onClick={handleAddTask}>Add Task</button>
  );
}; 
```
4. React-Redux: Connecting Redux with React
The react-redux library helps connect the Redux store with React components.

useSelector(): This hook is used to access the state from the Redux store. It's similar to mapStateToProps in traditional Redux.

useDispatch(): This hook is used to dispatch actions from within components.

Using useSelector(), components can read the state. For example, to display a list of tasks

```javascript
import { useSelector } from 'react-redux';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks); // Accessing the tasks from Redux store

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>{task.content}</div>
      ))}
    </div>
  );
};
```
And using useDispatch(), components can dispatch actions to modify the store (like adding, updating, or deleting tasks).

Summary of Redux Flow
User Interactions trigger actions (like adding or deleting tasks).

Dispatching Actions: The actions are dispatched to Redux.

Reducers: The dispatched action is handled by reducers, which update the state in the Redux store.

State Updates: Components subscribe to the Redux store using useSelector() to read the updated state.

UI Re-render: Once the state is updated, React re-renders the UI with the new state.

This process of centralized state management ensures that the UI remains consistent across different parts of the application, and it's easier to handle complex features like asynchronous data fetching or state persistence.