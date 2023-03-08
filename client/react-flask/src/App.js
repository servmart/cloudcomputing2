/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

const [userList, setUserList] = useState([{}])
const [serviceList, setServiceList] = useState([])
const [selectedUser, setSelectedUser] = useState("Select the user")
const [selectedService, setSelectedService]= useState("Please select a user")

function onUserSelection(e) {
  setSelectedUser(e.target.value);
  getServiceList(e.target.value)
}
function onServiceSelection(e) {
  setSelectedService(e.target.value);
  createDynamoTable()
}

function createDynamoTable() {
  fetch("http://localhost:5000/createDB").then(
    res => res.json()
  ).then(
    data =>{
      console.log(data)
    }
  )
}

function getServiceList(serviceTitle) {
  fetch("http://localhost:5000/services").then(
    res => res.json()
  ).then(
    data =>{
      console.log(data)
      const userTask = (data.services.filter(service => service.serviceTitle === serviceTitle)[0].tasks);
      setServiceList(userTask)
    }
  )
}


useEffect(() => {
  fetch("http://localhost:5000/members").then(
    res => res.json()
  ).then(
    data =>{
      setUserList(data)
      console.log(data)
    }
  )
  }, [])


  return (
    <div className="App">
      <div className='app-header'>
          <div>Cloud Computing Project 2</div>
      </div>
      <div className="app-container">
        <div className='member-selection'>
          <div>List of members</div>
          {(typeof userList.members === 'undefined') ? (
            <p>Loading</p>
          ) : (
            <select
              name="users"
              onChange={onUserSelection}
              value={selectedUser}
            >
              <option value="">Select the user</option>
              {userList.members.map((member, i) => (
                <option key={i} value={member.serviceTitle}>
                  {member.serviceTitle}
                </option>
              ))}
            </select>   
          )}
        </div>
        <div className='service-selection'>
          { typeof userList.members !== 'undefined' &&  selectedUser && selectedUser !== "Select the user" && 
            <div>Select a Service
              <select
                name="services"
                onChange={onServiceSelection}
                value={selectedService}
              >
                <option value="">Select the service</option>
                {serviceList.map((task, i) => (
                  <option key={i} value={task}>
                    {task}
                  </option>
                ))}
              </select>
            </div>
          }
        </div>
      </div>  
    </div>
  );
}

export default App;
