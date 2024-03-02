import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjected: undefined,
    projects: [],
    tasks: [],
  });

  function handleSelectedProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjected: id,
      };
    });
  }

  function handleAddNewTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        id: taskId,
        text: text,
        projectId: prevState.selectedProjected,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteNewTask(id) {
    console.log("delete new task");
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjected: null,
      };
    });
  }

  //handle cancel add project
  function handleCancelAddProject() {
    console.log("deleted");
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjected: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjected
        ),
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random();

      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjected: projectId,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  const selectProject = projectsState.projects.find((project) => {
    return (project.id = projectsState.selectedProjected);
  });

  let content = (
    <SelectedProject
      project={selectProject}
      OnDelete={handleCancelAddProject}
      onAddTask={handleAddNewTask}
      onDeleteTask={handleDeleteNewTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjected === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjected === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectedProject}
      />

      {content}
    </main>
  );
}

export default App;
