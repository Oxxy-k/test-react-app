import React, { useEffect, useState } from "react";

import "./employees.css";

const getData = async () => {
  const data = await fetch("https://reqres.in/api/users?per_page=12");
  if (!data.ok) {
    throw new Error(`Could not fetch, recieved ${data.status}`);
  }
  const jsonData = await data.json();
  return jsonData.data;
};

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [maxId, setMaxId] = useState();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await getData();
        setEmployees(data);
        const sortData = data.sort((next, prev) => prev.id - next.id);
        setMaxId(sortData[0].id);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    })();
  }, []);

  const addNewEmployee = () => {
    if (!name.length) return;
    const newMaxId = maxId + 1;
    const newEmployee = { first_name: name, id: newMaxId };
    setMaxId(newMaxId);
    setEmployees([...employees, newEmployee]);
    setName("");
  };

  const deleteEmployee = (id) => {
    const employeeId = employees.findIndex((employee) => employee.id === id);
    if (employeeId < 0) return;
    const newEmployees = employees.slice();
    newEmployees.splice(employeeId, 1);
    setEmployees(newEmployees);
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <ul>
        {employees.map(({ id, first_name }) => (
          <li key={id}>
            <div className="employee-item">
              {first_name}
              <button className="button" onClick={() => deleteEmployee(id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
      />
      <button className="button" onClick={addNewEmployee}>
        Add
      </button>
    </div>
  );
}
