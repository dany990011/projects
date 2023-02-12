import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


const hash = window.location.hash
const searchParams = new URLSearchParams(hash)
const accessToken = searchParams.get("#access_token")
console.log(accessToken)


const artistId = "6U3ybJ9UHNKEdsH7ktGBZ7"

function App() {
  const [userData ,setUserData] = useState()
  const [topSongs ,setTopSongs] = useState()

  function login(){
    window.location = "http://127.0.0.1:3000/login"
  }
  
  function getUserData(){
    setUserData(
      <h1>loading</h1>)
    fetch("https://api.spotify.com/v1/me",{
      headers: {
        "Authorization" : "Bearer " + accessToken
      }
    })
    .then(response => response.json())
    .then(data =>{
      console.log(data)
      setUserData(
        <dl className="user-info-list">
        <dt>name:</dt><dd>{data.display_name}</dd>
        <dt>email:</dt><dd>{data.email}</dd>
        </dl>
      )
    })
    .catch(error => {
      console.error("Error")
      setUserData(<h1>An error occured</h1>)
    })
  }

  function getTopSongs(){
    fetch("https://api.spotify.com/v1/artists/"+artistId+"/top-tracks?country=US&limit=5",{
      headers: {
        "Authorization" : "Bearer " + accessToken
      }
    })
    .then(response =>response.json())
    .then(data =>{
      console.log(data)
      setTopSongs(<div>
      <p>{data.tracks[0].name}</p>
      <p>{data.tracks[0].preview_url}</p>
      </div>
      )
    })
  }
 

  return (
    <div className="App">
      <div>
        <button onClick={login}>button</button>
        <button onClick={getUserData}>user data</button>
        <button onClick={getTopSongs}>get top songs</button>
        <div className="user-data-div">{userData}</div>
        <div>{topSongs}</div>
        
      </div>
      
    </div>
  )
}

export default App
