//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import people1 from "./assets/Screenshot 2023-07-05 142051.png";
import people2 from "./assets/Screenshot 2023-07-05 154910.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Tasks from "../Tasks";

function App() {
  const DUMMY_DATA = [
    {
      id: 1,
      title: "Client Review & Feedback",
      description: "crypto wallet Redesign",
      date: "today 10:00 pm - 11:45 pm",
      image: people1,
    },
    {
      id: 2,
      title: "Create Wireframe",
      description: "crypto wallet Redesign",
      date: "today 09:10 pm - 10:00 pm",
      image: people2,
    },
  ];

  return (
    <div className="container-fluid w-50">
      <div className="card mx-auto my-auto w-75 rounded-5">
        <div className="card-header">
          <ul className="nav justify-content-center nav-fill">
            <li className="nav-item navbar-items">
              <a className="nav-link" href="#">
                messages
              </a>
            </li>
            <li className="nav-item navbar-items">
              <a className="nav-link active" href="#">
                todays tasks
              </a>
            </li>
            <li className="nav-item navbar-items">
              <a className="nav-link" href="#">
                last activity
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body rounded-5">
          <div className="row">
            <div className="col-sm-8">
              <h3 className="card-title">Todays Task</h3>
              <p className="lead">wednesday , 11 may</p>
            </div>
            <div className="col-sm-4">
              <button className="btn addbtn mt-3">+ New Task</button>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <ul className="list-group list-group-horizontal test-center">
              <li className="list-group-item">
                <a href="#">
                  All
                  <span className="badge bg-primary rounded-pill pl-1">35</span>
                </a>
              </li>
              <li className="list-group-item">
                <a href="#">
                  Opened
                  <span className="badge bg-secondary rounded-pill">14</span>
                </a>
              </li>
              <li className="list-group-item">
                <a href="#">
                  Closed
                  <span className="badge bg-secondary rounded-pill">19</span>
                </a>
              </li>
              <li className="list-group-item">
                <a href="#">
                  Archived
                  <span className="badge bg-secondary rounded-pill">2</span>
                </a>
              </li>
            </ul>
          </div>
          {DUMMY_DATA.map((person) => {
            return (
              <Tasks
                key={person.id}
                title={person.title}
                description={person.description}
                date={person.date}
                image={person.image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
