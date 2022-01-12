const express = require('express')

const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})

app.get("/now", (request, response) => {
    const date = new Date();
    response.send(date);
  });

  app.get("/flipcoin", (request, response) => {
    let coin = Math.floor(Math.random() * 2);
    if(coin === 1){
      
      response.send("Heads");
    }else{
      response.send("Tails");
    }
    
  });