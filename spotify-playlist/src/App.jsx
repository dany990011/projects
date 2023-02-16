import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


const hash = window.location.hash
const searchParams = new URLSearchParams(hash)
const accessToken = searchParams.get("#access_token")
console.log(accessToken)


let topSongsAmount = 3
let userId
const includedArtists = []
const songIds = []


function App() {
  const [userData ,setUserData] = useState()
  const [loginStatus , setLoginStatus] = useState()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchData, setSearchData] = useState("")
  const [artistsArray, setArtistsArray] = useState([])
  const [topSongs, setTopSongs] = useState([])



  

  function login(){
    window.location = "http://5.29.1.154:3000/login"
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
      userId = data.id
      setUserData(
        <dl className="user-info-list">
        <dt>name:</dt><dd>{data.display_name}</dd>
        <dt>email:</dt><dd>{data.email}</dd>
        <dt>id:</dt><dd>{data.id}</dd>
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
    
  }else null
  },[artistsArray])


  function artistChosen(index){
    if(artistsArray.includes(searchData.artists.items[index])){
      console.log("artist already in list")
      return
    }
    setArtistsArray([...artistsArray, searchData.artists.items[index]])
    
  }

  useEffect(()=>{
    getTopSongs()
  },[artistsArray])

  function createPlaylist(){
    topSongs.map((song,index)=>{
      songIds.push(song.uri)
      console.log("this is SongIds:")
      console.log(songIds)
    })
    fetch("https://api.spotify.com/v1/me",{
      headers: {
        "Authorization" : "Bearer " + accessToken
      }
    })
    .then(response => response.json())
    .then(data =>{
      userId = data.id
      fetch("https://api.spotify.com/v1/users/"+userId+"/playlists",{
      method: "POST",
      headers: {
        "Authorization" : "Bearer " + accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "PlaceHolderName",
        public: true
      })
      })
        .then(response => response.json())
        .then(data => {console.log("plalist id is " + data.id)
          fetch("https://api.spotify.com/v1/playlists/"+data.id+"/tracks", {
            method: 'POST',
            headers: {
              "Authorization": "Bearer " + accessToken,
              "Content-Type": "application/json"
            },
              body: JSON.stringify({
                uris: songIds
            })
          })
          .then(response => response.json)
          .then(data => {
            console.log ("tracks added to playlist !")
            console.log(data)
          })
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
  function ShowLoginStatus(){
    if(!accessToken){
      return(
        <h2 style={{color:"red"}}>Please log in to use the site</h2>
      )
    }
  }


  function ShowTopSongs(){
    if(topSongs){
      console.log("topSongs here: ")
      console.log(topSongs)
      return topSongs.map((data,index)=>{
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
      <div onClick={()=>{artistChosen(index)} } className='results-div'>
        {console.log(searchData.artists.items[index].name)}
        <p className='results-text' >{searchData.artists.items[index].name}</p>

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
      <button onClick={login}>Log In</button>
      <button onClick={getUserData}>User Data</button>
      <button onClick={getTopSongs}>show top songs</button>
    </div>
      <ShowLoginStatus/>
      <div className="main">
        <div className='search-div'>
        <input onChange={handleChange}></input>
        <ShowSearchResults/>
        </div>
        <div className='side-div'>
          <div className="artist-list-div"><ArtistList/></div>
          <div className='playlist-div'>
            <div className='top-songs-div'><ShowTopSongs/></div>
            <button className='create-playlist-button' onClick={createPlaylist}>Create Playlist</button>
          </div>
        </div>
        
      </div>
      <div className="user-data-div">{userData}</div>
  </div>
  )
}



export default App
