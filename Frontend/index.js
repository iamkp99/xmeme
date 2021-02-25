//var url='https://xmemekp-backend.herokuapp.com/'

var url='http://localhost:8081/memes'

function deleteMeme(input){
    const memeid =input.getAttribute('data-id');
    if(confirm("Clicking on ok will delete this meme" )){
      fetch(url+memeid, {
        method: 'DELETE'
      }).then(function(response) {
        if(response.ok) alert("meme succesfully deleted")
      })
    }
    else return;
  }
  function changeURL(input){
    const memeid =input.getAttribute('data-id');
    var new_url = prompt("Please enter your new url:");
    if(new_url== null) return;
    if(new_url=="") {
      alert("again enter url")
      return;
    }
    if(!checkURL(new_url)) {
      alert("url given is not an image url")
      return
    }
    const body={
      url : new_url
    }
    fetch(url+'memes/'+memeid,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(body)
    }).then(function(response) {
      if(response.ok) alert("meme updated succesfully")
    })

  }
  function changeCaption(input){
    const memeid =input.getAttribute('data-id');
    console.log(memeid);
    var new_caption = prompt("Please enter your new caption:");
    if(new_caption==null) return ;
    if(new_caption=="") {
      alert("again enter caption")
      return;
    }
    const body={
      caption : new_caption
    }
    fetch(url+'memes/'+memeid,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(body)
    }).then(function(response) {
      if(response.ok) alert("meme updated succesfully")
    })

  }
  mem()
  formId.onsubmit = async (e) => {
      e.preventDefault();
      let fData = new FormData(formId);
      if(!checkURL(fData.get('url'))){
        alert("url given is not an image url")
        return
      } 
      const body = {
          name: fData.get('name'),
          url: fData.get('url'),
          caption: fData.get('caption')
      };
      
      console.log(typeof(JSON.stringify(body)));
      
       fetch(url+'memes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(function(response) {
        if(response.ok) alert("Meme Submitted")
        return response.json()
      }).then((result)=>{
        console.log(result)
      })
      .catch((error)=> console.log(error));
  }
  function mem(){
    fetch(url+'memes', {
        method: 'GET'
      }).then(function(response) {
        return response.json()
      }).then((result)=>{
        let row=null;
        for(let i=0;i<=result.length-1;i++){
          row=document.getElementById("showmemes");
          row.innerHTML+=`<div>
          <h2>${result[i]['name']}</h2>
          <p>${result[i]['caption']}</p>
          <p>
          <input  onclick="changeURL(this)" type="button" id="editurl" style="background-color: lightgrey;color:blue" data-id=${result[i]['_id']} value="ChangeUrl">
          <input onclick="changeCaption(this)" type="button" id="editcaption"  style="background-color: lightgrey;color:blue" data-id=${result[i]['_id'] } value="ChangeCaption">
          <input onclick="deleteMeme(this)" type="button" data-id=${result[i]['_id']}  value="Delete" style="background-color: lightgrey;color:blue" >
          </p>
          <img src="${result[i]['url']}" height= "400px"
          width="400px" style="border:5px solid black">
        </div>`
        }
      })
      .catch((error)=> console.log(error));
    }
    function checkURL(url) {
      return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }