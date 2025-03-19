import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskModal from '../modals/TaskModal'; // Import the TaskModal component for displaying task details

function Task({ colIndex, taskIndex }) {
  // Retrieve the list of boards from Redux state
  const boards = useSelector((state) => state.boards);

  // Find the active board
  const board = boards.find((board) => board.isActive === true);

  // Get the columns from the active board
  const columns = board.columns;

  // Find the specific column containing the task
  const col = columns.find((col, i) => i === colIndex);

  // Find the specific task within the column
  const task = col.tasks.find((task, i) => i === taskIndex);

  // State to manage the visibility of the TaskModal
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [isDragging, setIsDragging] = useState(false); // Track dragging state

  // Calculate the number of completed subtasks
  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  // Function to handle the drag start event
  const handleOnDragStart = (e) => {
    e.dataTransfer.setData('text', JSON.stringify({ taskIndex, prevColIndex: colIndex }));
    setIsDragging(true); // Set dragging state to true
  };

  // Function to handle the drag end event
  const handleOnDragEnd = () => {
    setIsDragging(false); // Set dragging state to false when drag ends
  };

  return (
    <div>
      {/* Task card, draggable and clickable to open modal */}
      <div
        onClick={() => {
          setIsTaskModalOpen(true); // Open task modal on click
        }}
        draggable
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
        className={`w-[280px] first:my-5 rounded-lg bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a] 
        py-6 px-3 shadow-lg hover:text=[#C98D26] dark:text-white dark:hover:text=[#C98D26] 
        cursor-pointer transition-all duration-200
        ${isDragging ? 'border-2 border-dashed border-[#635fc7]' : ''}`} // Add border only when dragging
      >
        {/* Task Title */}
        <p className="font-bold tracking-wide">{task.title}</p>

        {/* Display completed subtasks count */}
        <p className="font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>

      {/* Task Modal for viewing/editing task details */}
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen} // Pass state setter to modal for closing it
        />
      )}
    </div>
  );
}

export default Task; // Export the Task component for use in other parts of the application
