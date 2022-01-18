
const express = require('express');
const { Restaurant,Menu } = require('./public/models/index');
const app = express();
const port = 3000;
const {sequelize} = require('./db');
const { body, check, validationResult } = require('express-validator');

const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const handlebars = expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));





app.listen(port, async () => {
  console.log(`Server is listening at http://localhost:${port}`)
  await seed()
})

app.get('/', async (req, res) => {
  res.send('<h1>Hello!</h1>')
})


app.get('/restaurants', async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.render('restaurants',{restaurants});
})

app.get('/menus', async (req, res) => {
  const menus = await Menu.findAll();
  res.render('menus',{menus});
})

app.get('/restaurants/:id', async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id)
  res.render('restaurant',{restaurant});})

app.get('/menus/:id', async (req, res) => {
  const menu = await Menu.findByPk(req.params.id, {include: Restaurant})
  res.render('menus',{menu});
})

app.post('/menus', async (req, res) => {
  const newMenu = await Menu.create(req.body);
  res.send('Created!')
})

app.post('/restaurants', async (req, res) => {
  const newRestaurant = await Restaurant.create(req.body);
  res.send('Created!')
})

app.delete('/menus/:id', async (req, res) => {
  await Menu.destroy({
      where: {id: req.params.id}
  })
  res.send('Deleted!')
})

app.delete('/restaurants/:id', async (req, res) => {
  const newRestaurant  = await Restaurant.create(req.body);
  res.send('Deleted!')
})

app.put('/menus/:id', async (req, res) => {
  await Menu.update(req.body, {
      where: {id: req.params.id}
  })
  res.send("Updated!")
})

app.put('/restaurants/:id', async (req, res) => {
    await Restaurant.update(req.body, {
      where: {id: req.params.id}
    })
    res.send("Updated!")
})

///////////////////////////////////////////////////////Validations

app.post('/newrestaurant',
body('name').isLength({max: 50}),
body('type'),
body('image'), 
(req,res) => {

const errors = validationResult(req)

if(!errors.isEmpty()){
  res.send('INVALID')
  }else{
    const newRestaurant = {
      name: req.body.username,
      type: req.body.type,
      image: req.body.image
    }
  }
})



app.post('/restaurants', [
  check('name').not().isEmpty().trim().escape()
  ], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })}})


app.post('/restaurants', [
  check('name').not("Arby's")
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
}) 

app.post('/restaurants', [
  check('image').isURL()
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.arrray()})
  }
})
  
app.post('/restaurants', [
  check('name').isLength(0,50)
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.arrray()})
  }
})
///////////////////////////////////////////////////////Validations


async function seed(){
  await sequelize.sync({ force: true })
  let fogo = await Restaurant.create({name : 'Fogo de Chao', type : 'Brazillian Steakhouse'})
  let lunch = await Menu.create({course: 'Lunch Menu', item: 'Filet Mignon'})
  
  let sequoia = await Restaurant.create({name: 'Sequoia', type: 'American Restaurant'})
  let brunch = await Menu.create({course: 'Brunch Menu', item: 'Grilled Asparagus'})

  let blueducktavern = await Restaurant.create({name: 'Blue Duck Tavern', type: 'New American Restaurant'})
  let dinner = await Menu.create({course: 'Dinner Menu', item: 'Roasted Duck'})
  
  await fogo.addMenu(lunch)
  await sequoia.addMenu(brunch)
  await blueducktavern.addMenu(dinner)
}
console.log("db seeded!")


















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
        