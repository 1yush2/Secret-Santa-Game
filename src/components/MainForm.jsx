import React, { useState, useEffect } from "react";
import { FormData } from "./FormDataTypes";
import "./mainform.css";

//get data from local storage
const getLocalPeopleItems = () => {
  let list = localStorage.getItem("peopleList");
  if (list) {
    return JSON.parse(localStorage.getItem("peopleList"));
  } else {
    return [];
  }
};

export default function MainForm() {
  const [people, setPeople] = useState(getLocalPeopleItems);
  const [newPeople, setNewPeople] = useState([]);
  const [showPeople, setShowPeople] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    var myFormElements = event.target.elements;
    var obj = {};

    // get value from every element inside the form
    for (var i = 0; i < myFormElements.length; i++) {
      var item = myFormElements.item(i);
      if (item.name && item.value) {
        obj[item.name] = item.value;
      }
    }

    setPeople([...people, obj]);
    event.target.reset();
    alert("thanks the form has been submitted");
  };

  useEffect(() => {
    localStorage.setItem("peopleList", JSON.stringify(people));
  }, [people]);

  const handleShow = () => {
    setShowPeople(!showPeople);
  };

  const delAll = () => {
    setPeople([]);
  };

  const del = (id) => {
    const filteredPerson = (e, index) => {
      return index !== id;
    };
    setPeople(people.filter(filteredPerson));
  };

  const randomize = () => {
    let newArray = JSON.stringify(people);
    let otherArray = JSON.parse(newArray);
    const arrayShuffle = (arr) => {
      let temparr = arr;
      let newPos, temp;
      for (let index = temparr.length - 1; index > 0; index--) {
        newPos = Math.floor(Math.random() * (index + 1));
        temp = temparr[index];
        temparr[index] = temparr[newPos];
        temparr[newPos] = temp;
      }
      return temparr;
    };

    const newshuff = arrayShuffle(otherArray);
    setNewPeople(newshuff);
    setShowPeople(true);
  };

  // var randomobjj = {}
  // people.forEach((element) => {
  //   const { name, email } = element;
  //   const peepObject = new Set();
  //   peepObject.add(name)
  //   console.log(peepObject)
  // });
  
  // console.log(randomobjj)

  const ranobjj = Object.assign({},people)
  console.log(ranobjj)

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit} className="peopleBox">
        {FormData.map((data, index) => {
          const { name, type, required } = data;
          return (
            <div key={index}>
              <label htmlFor={name}>{name} : </label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  placeholder="Write a wishlist msg"
                  required={required}
                />
              ) : (
                <input type={type} name={name} required={required} />
              )}
            </div>
          );
        })}
        <div className="btn">
          <button type="submit">Submit</button>
          <button onClick={handleShow}>Show/hide</button>
          <button onClick={delAll}>Restart</button>
          <button onClick={randomize}>randomize nd show</button>
        </div>
      </form>
      <div className="displayedForm">
        <div>
          {people.map((person, index) => {
            const { name, message } = person;
            return (
              <div key={index} className="card">
                <h2>{name}</h2>
                <h4>Wishlist message is:{message}</h4>
                <button onClick={() => del(index)}>Del</button>
              </div>
            );
          })}
        </div>
        <div>
          {showPeople &&
            newPeople.map((person, index) => {
              const { name, message } = person;
              return (
                <div key={index} className="card">
                  <h2>{name}</h2>
                  <h4>Wishlist message is:{message}</h4>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

// {showPeople
//   ? people.map((person, index) => {
//       const { name, email, message } = person;
//       return (
//         <div key={index} className="card">
//           <h2>
//             Person: {index + 1} name is {name}
//           </h2>
//           <h3>The email is {email}</h3>
//           <h4>Wishlist message is:{message}</h4>
//         </div>
//       );
//     })
//   : newPeople.map((person, index) => {
//       const { name, email, message } = person;
//       return (
//         <div key={index} className="card">
//           <h2>
//             Person: {index + 1} name is {name}
//           </h2>
//           <h3>The email is {email}</h3>
//           <h4>Wishlist message is:{message}</h4>
//         </div>
//       );
//     })}
