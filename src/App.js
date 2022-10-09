import React, { useState,useEffect } from 'react';
import Lists from './components/Lists';
import Alert from './components/Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  }
  else {
    return [];
  }
}

function App() {

  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Enter a value");
    }
    else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item;
        })
      )
      setName("");
      setIsEditing(false);
      setEditID(null);
      setAlert(true, "success", "Value is edited");
    }
    else {
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem]);
      showAlert(true, "success", "Value is entered");
      setName("");
    }
  }

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id))
    showAlert(true, "success", "Item is deleted");
  }

  const clearList = () => {
    setList([]);
    showAlert(true, "success", "List is cleared");
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <main>
      <section className="section-center">

        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} />}
          <h1>To Do List Application</h1>
          <div className="form-control">
            <input type="text" className="grocery" placeholder="Enter your data" value={name} onChange={(e) => setName(e.target.value)} />
            <button className="submit-btn">{isEditing ? "Edit" : "Submit"}</button>
          </div>
        </form>

        <br></br>

        {list.length > 0 && (
          <div className="grocery-container">
            <Lists items={list} removeItem={removeItem} editItem={editItem} />
            <button className="clear-btn" onClick={clearList}>Clear All</button>
          </div>
        )}

      </section>
    </main>
  );
}

export default App;
