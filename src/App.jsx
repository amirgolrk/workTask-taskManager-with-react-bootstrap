//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import people1 from './assets/Screenshot 2023-07-05 142051.png'
import people2 from './assets/Screenshot 2023-07-05 154910.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
 

  return (
      <div className="container-fluid w-50">
      <div className="card mx-auto my-auto w-75 rounded-5">
        <div className="card-header">
          <ul className="nav justify-content-center nav-fill">
            <li className="nav-item navbar-items">
              <a className="nav-link" href="#">messages</a>
            </li>
            <li className="nav-item navbar-items">
              <a className="nav-link active" href="#">todays tasks</a>
            </li>
            <li className="nav-item navbar-items">
              <a className="nav-link" href="#">last activity</a>
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
            <ul className="list-group list-group-horizontal test-center secondnav">
              <li className="list-group-item">
                <a href="#">
                  All
                  <span className="badge bg-primary rounded-pill">35</span>
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
          <div className="card rounded-5 shadow-sm mt-4">
            <div className="card body rounded-4">
              <div className="row mt-2 ms-2">
                <div className="clearfix">
                  <div className="float-start">
                    <s className="card-title tasktitle">Client Review & Feedback</s>
                    <p className="lead tasklead">Crypto Wallet Redesign</p>
                  </div>
                  <div className="float-end pe-4 pt-3">
                    <div className="cntr">
                      <input
                        checked=""
                        type="checkbox"
                        id="cbx"
                        className="hidden-xs-up"
                      />
                      <label htmlFor="cbx" className="cbx"></label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-9 ps-5">
                  <p className="lead taskdate">Today 10:00 pm - 11:45 pm</p>
                </div>
                <div className="col-sm-3">
                  <img
                    src={people1}
                    className="float-end me-4 pb-2"
                    width="57px"
                    height="40px"
                    alt="people"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card rounded-5 shadow-sm mt-4">
            <div className="card body rounded-4">
              <div className="row mt-2 ms-2">
                <div className="clearfix">
                  <div className="float-start">
                    <s className="card-title tasktitle">create Wireframe</s>
                    <p className="lead tasklead">Crypto Wallet Redesign</p>
                  </div>
                  <div className="float-end pe-4 pt-3">
                    <div className="cntr">
                      <input
                        checked=""
                        type="checkbox"
                        id="cbx"
                        className="hidden-xs-up"
                      />
                      <label htmlFor="cbx" className="cbx"></label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-9 ps-5">
                  <p className="lead taskdate">Today 09:15 pm - 10:00 pm</p>
                </div>
                <div className="col-sm-3">
                  <img
                    src={people2}
                    className="float-end me-4 pb-2"
                    width="110px"
                    height="40px"
                    alt="people"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
