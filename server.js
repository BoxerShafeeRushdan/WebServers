
const express = require('express');
const { Restaurant,Menu } = require('./index');
const app = express();
const port = 3000;
const {sequelize} = require('./db');


app.use(express.static('public'));


app.get('/', async (req, res) => {
  res.send('<h1>Hello!</h1>')
})


app.get('/restaurants', async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json({restaurants});
})

app.get('/menus', async (req, res) => {
  const menus = await Menu.findAll();
  res.json({menus});
})




async function seed(){
  await sequelize.sync({ force: true })
  let fogo = await Restaurant.create({name : 'Fogo de Chao', type : 'Steakhouse'})
  let Lunch = await Menu.create({course: 'Lunch Menu', item: 'Filet Mignon'})
  await fogo.addMenu(Lunch)
}
console.log("db seeded!")



app.listen(port, async () => {
  console.log(`Server is listening at http://localhost:${port}`)
  await seed()
})















// app.get("/now", (request, response) => {
//       const date = new Date();
//       response.send(date);
//     });
  
//     app.get("/flipcoin", (request, response) => {
//         let coin = Math.floor(Math.random() * 2);
//         if(coin === 1){
      
//             response.send("Heads");
//           }else{
//               response.send("Tails");
//             }
        