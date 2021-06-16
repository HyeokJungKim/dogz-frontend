import './App.css';
import {useEffect, useState} from 'react'

function App() {

  let [dogs, setDogs] = useState([])

  useEffect(() => {
    fetch("http://localhost:9393/dogs")
      .then(res => res.json())
      .then(dogz => {
        setDogs(dogz)
      })
  }, [])


  let createDog = () => {
    fetch("http://localhost:9393/dogs", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: "ABCDEF",
        age: 12
      })
    })
      .then(res => res.json())
      .then(newDog => {
        setDogs([...dogs, newDog])
      })
  }

  let deleteDog = (id) => {
    fetch(`http://localhost:9393/dogs/${id}`, {
      method: "DELETE"
    })  
      .then(res => res.json())
      .then(delDog => {
        let filteredDogs = dogs.filter(dog => {
          return dog.id !== delDog.id
        })
        setDogs(filteredDogs)
      })

  }



  let updateDog = (id) => {
    fetch(`http://localhost:9393/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: "XYZ"
      })
    })
      .then(res => res.json())
      .then(updatedDog => {
        let updatedArr = dogs.map(dog => {
          if(dog.id === updatedDog.id){
            return updatedDog
          } else {
            return dog
          }
        })
        setDogs(updatedArr)

      }) 
    
    
  }

  return (
    <div className="App">
      {dogs.map(dog => <p key={dog.id}><span onClick={() => {deleteDog(dog.id)}}>{dog.name}</span><button onClick={() => {updateDog(dog.id)}}>Update</button></p>)}
      <button onClick={createDog}>
        Create Dog
      </button>
    </div>
  );
}

export default App;
