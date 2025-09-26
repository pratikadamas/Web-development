// You’re basically building a simple CLI To-Do app in Node.js that can:
// ✅ Add tasks
// ✅ List tasks
// ✅ Remove tasks (TODO part)



// fs → Node.js File System module, used to read/write files.
// filePath → Stores all tasks in a file named tasks.json.
const fs = require("fs");
const filePath = "./tasks.json";

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath); // Read file
    const dataJSON = dataBuffer.toString();// Convert buffer → string
    return JSON.parse(dataJSON);   // Convert string → JS array
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);    // Convert array → JSON
  fs.writeFileSync(filePath, dataJSON);  // Overwrite tasks.json
};

const addTask = (task) => {
  const tasks = loadTasks(); // Load current tasks

  tasks.push({ task }); // Add new task
  saveTasks(tasks); // Save updated tasks
  console.log("Task added", task);
};

const listTasks = () => {
  const tasks = loadTasks();
  tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`));
};

// TODO: Remove task by index

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("Command not found!");
}
