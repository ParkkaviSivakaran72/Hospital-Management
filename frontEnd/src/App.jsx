import React,{useEffect}from 'react'

function App() {
  // const [data,setData]=useState([])
  useEffect(()=>{
    fetch('http://localhost:8081/patients')
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err));
  },[])
  return (
    <div>

    </div>
  )
}

export default App