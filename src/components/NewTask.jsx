import { useRef, useState } from "react";

export default function NewTask({ onAdd, onDelete }) {
  const [newTitle, setNewTitle] = useState(null);
  const title = useRef();
  const modal = useRef();

  function handleAddTask() {
    const enteredTitle = title.current.value;
    onAdd(enteredTitle);
    setNewTitle(enteredTitle);
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        ref={title}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
}
