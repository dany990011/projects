import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


const hash = window.location.hash
const searchParams = new URLSearchParams(hash)
const accessToken = searchParams.get("#access_token")
console.log(accessToken)

let topSongsAmount = 3
const includedArtists = []


function App() {
  const [userData ,setUserData] = useState()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchData, setSearchData] = useState("")
  const [artistsArray, setArtistsArray] = useState([])
  const [topSongs, setTopSongs] = useState([])


  
  

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


  useEffect(()=>{
    if(searchTerm != ""){
    console.log("USEHOOK")
    fetch("https://api.spotify.com/v1/search?q="+searchTerm+"&type=artist&limit=5",{
      headers: {
        "Authorization" : "Bearer " + accessToken
      }
    })
    .then(response => response.json())
    .then(data =>{
      //console.log(data.artists)
      setSearchData(data)
    })
  }else null
  },[searchTerm])

  useEffect(()=>{
    if(searchTerm != ""){
    console.log("USEHOOK")
    
    // fetch("https://api.spotify.com/v1/search?q="+searchTerm+"&type=artist&limit=5",{
    //   headers: {
    //     "Authorization" : "Bearer " + accessToken
    //   }
    // })
    // .then(response => response.json())
    // .then(data =>{
    //   console.log(data.artists)
    //   setSearchData(data)
    // })
  }else null
  },[artistsArray])


  function artistChosen(index){
    if(artistsArray.includes(searchData.artists.items[index])){
      console.log("artist already in list")
      return
    }
    setArtistsArray([...artistsArray, searchData.artists.items[index]])
    //console.log(artistsArray)
  }

  function createPlaylist(){
    artistsArray.map((artist,index)=>{
      const artistId = artist.id
      fetch("https://api.spotify.com/v1/artists/"+artistId+"/top-tracks?country=US&limit=3",{
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => response.json())
      .then(data => { 
        console.log(data)
      })

    })
    
  }

  function handleChange(event){
    setSearchTerm(event.target.value)
    
  }


  function getTopSongs(){
     artistsArray.map((artist,index)=>{
      const artistId = artist.id
      if(!includedArtists.includes(artistId)){
        
      
      includedArtists.push(artistId)
      console.log("here are the includedArtists")
      console.log(includedArtists)
      fetch("https://api.spotify.com/v1/artists/"+artistId+"/top-tracks?country=US&limit=3",{
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => response.json())
      .then(data => { 
        data.tracks.splice(topSongsAmount)
        console.log("data.tracks: ")
        console.log(data.tracks)
        setTopSongs(prevSongs => [...prevSongs, ...data.tracks])
      })
      }
    })
  }
  function ShowTopSongs(){
    if(topSongs){
      console.log("topSongs here: ")
      console.log(topSongs)
      return topSongs.map((data,index)=>{
        //console.log(data.name)
        return(
          <div className='top-songs'>
          <p>{data.name}</p>
          </div>
          )
      })
    }
  }
  

  function ShowSearchResults(){
   //console.log(searchData)
    if (searchTerm === "") {
      return <div></div>
    }
   if(searchData.artists){
    return searchData.artists.items.map((artist,index)=>{
      return(
      <div className='results-div'>
        {console.log(searchData.artists.items[index].name)}
        <p onClick={()=>{artistChosen(index)} }>{searchData.artists.items[index].name}</p>

      </div>
      )
   })}

  }

  function ArtistList(){
    return artistsArray.map((artist,index)=>{
      return(
        <div>
          <p>{artist.name}</p>
        </div>
      )
    })
    
  }

  return (
  <div className='App'>
    <div className='buttons-div'>
      <button onClick={login}>button</button>
      <button onClick={getUserData}>user data</button>
      <button onClick={createPlaylist}>create plalist</button>
      <button onClick={getTopSongs}>show top songs</button>
    </div>
      <div className="main">
        <div className='search-div'>
        <input onChange={handleChange}></input>
        <ShowSearchResults/>
        </div>
        <div className='side-div'>
        <div className="artist-list-div"><ArtistList/></div>
        <div className='top-songs-div'><ShowTopSongs/></div>
        </div>
        
      </div>
      <div className="user-data-div">{userData}</div>
  </div>
  )
}



export default App
