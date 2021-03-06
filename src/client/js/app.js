// get the new trip data and send it to the server where it'll be stored
const postData = async ( url = '', data = {})=>{
    
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

// get the latest trip data from the server
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(request)
    console.log(allData)
    
    }
    catch(error) {
      console.log("error", error);
      
    }
   }






export { postData, retrieveData }
