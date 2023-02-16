import express from 'express'
import fetch from 'node-fetch'


const client_id = "79f978f6465541ef8137126847d2aa33"
const client_secret = "fb025e50cbd549628bb3316a81a5686f"
const redirect_uri = "http://127.0.0.1:3000/callback"
const scope = "user-read-private user-read-email playlist-modify-public playlist-modify-private"





const spotifyUrl = "https://accounts.spotify.com/authorize?"
const url = spotifyUrl+"response_type=code"+"&client_id="+client_id+"&scope="+scope+"&redirect_uri="+redirect_uri



console.log("express is working")

var app = express()

app.get('/login', (req, res)=>{
  res.redirect(url)
})

app.get("/callback", (rec, res) =>{
  const code = rec.query.code
  //res.redirect("http://127.0.0.1:5173/callback")
  const authOptions = {
    url : 'https://accounts.spotify.com/api/token',
    form : {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      "Authorization" : "basic " + (Buffer.from(client_id + ":" + client_secret).toString("base64"))
    },
    json: true
  }
  console.log(authOptions.headers.Authorization)

  fetch(authOptions.url,{
    method: "POST",
    headers: {
      "Authorization": authOptions.headers.Authorization,
      "Content-Type": "application/x-www-form-urlencoded" 
    },
    body : "code=" + authOptions.form.code + "&redirect_uri=" + encodeURIComponent(authOptions.form.redirect_uri) + "&grant_type=" + authOptions.form.grant_type
  })
  .then(response => response.json())
  .then(data=>{
    //console.log(data)
    const access_token = data.access_token
    const refresh_token = data.refresh_token

    res.redirect("http://127.0.0.1:5173/callback#" + "access_token="+access_token+"&refresh_token"+refresh_token)

    fetch("https://api.spotify.com/v1/me",{
      headers: {
        "Authorization" : "Bearer " + access_token
      }
    })
    .then(response => response.json())
    .then(data =>{
      console.log(data)
    })
  })


})



app.listen(3000, () => {
  console.log(`Server running on port 3000`)
})