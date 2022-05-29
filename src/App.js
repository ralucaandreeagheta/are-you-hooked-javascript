import { useState } from "react";
import users from "./fake_data";

const App = () => {
  const [filteredEmployees, setFilteredEmployees] = useState(users);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [matchingError, setMatchingError] = useState("");

  function verify() {
    if (password === cPassword) {
      setMatchingError("All good");
    } else {
      setMatchingError("Password do not match");
    }
  }

  function handleSearch(filterName) {
    let normalizeName = filterName.toLowerCase();
    let result = [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].name.toLowerCase().includes(normalizeName)) {
        result.push(users[i]);
      }
    }
    setFilteredEmployees(result); //filteredEmployees = result;
  }

  function decreaseEmployeeSalary(employee) {
    let result = users.concat(); // let result = [...users];
    for (let i = 0; i < result.length; i++) {
      if (result[i].id === employee.id) {
        result[i].salary = result[i].salary - 100;
      }
    }
    setFilteredEmployees(result);
  }

  function increaseEmployeeSalary(employee) {
    let result = users.concat(); // let result = [...users];
    for (let i = 0; i < result.length; i++) {
      if (result[i].id === employee.id) {
        result[i].salary = result[i].salary + 100;
      }
    }
    setFilteredEmployees(result);
  }

  return (
    <>
      <header>
        <div className="container">
          <h1 className="logo">Are you Hooked?</h1>
        </div>
      </header>

      <section>
        <div className="container">
          <p className="error">{matchingError}</p>
          {/* <p className="error">Password needs to be more complex</p> */}
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            onBlur={() => verify()}
            type="password"
            placeholder="Verify your password"
            value={cPassword}
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
          />
        </div>
      </section>

      <section>
        <div className="container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>
                  <input
                    type="text"
                    placeholder="Name..."
                    onInput={(e) => handleSearch(e.target.value)}
                  />
                </th>
                <th>Age</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <th>{employee.id}</th>
                  <td>{employee.name}</td>
                  <td>{employee.age}</td>
                  <td>
                    <button
                      onClick={() => {
                        decreaseEmployeeSalary(employee);
                      }}
                    >
                      -
                    </button>
                    <span>{employee.salary}</span>
                    <button
                      onClick={() => {
                        increaseEmployeeSalary(employee);
                      }}
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>
            API provided by{" "}
            <a href="http://www.dummy.restapiexample.com/">
              Dummy sample REST API
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default App;
