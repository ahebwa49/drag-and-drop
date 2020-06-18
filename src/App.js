import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { name: "Learn Angular", category: "wip", bgcolor: "yellow" },
        { name: "React", category: "wip", bgcolor: "pink" },
        { name: "Vue", category: "complete", bgcolor: "skyblue" }
      ]
    };
  }

  onDragStart = (e, id) => {
    console.log("dragstart:", id);
    e.dataTransfer.setData("id", id);
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDrop = (e, cat) => {
    let id = e.dataTransfer.getData("id");

    let tasks = this.state.tasks.map(task => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    });

    this.setState({
      tasks
    });
  };

  render() {
    var tasks = {
      wip: [],
      complete: []
    };

    this.state.tasks.forEach(task => {
      tasks[task.category].push(
        <div
          key={task.name}
          draggable
          onDragStart={e => this.onDragStart(e, task.name)}
          className="draggable"
          style={{ backgroundColor: task.bgcolor }}
        >
          {task.name}
        </div>
      );
    });
    return (
      <div className="container-drag" style={{ textAlign: "center" }}>
        <h2>Drag and drop demo</h2>
        <div
          className="wip"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, "wip")}
        >
          <span className="task-header">WIP</span>
          {tasks.wip}
        </div>
        <div
          className="droppable"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, "complete")}
        />
        <span clasName="task-header">COMPLETED</span>
        {tasks.complete}
      </div>
    );
  }
}

export default App;
