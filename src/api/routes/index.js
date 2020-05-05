var express = require('express');
var router = express.Router();
const fs = require('fs')

const INVENTORY_PATH = "../data/INVENTORY.json"
const SHOPPING_LIST_PATH = "../data/SHOPPING_LIST.json"
const SHOPPING_TRIPS_PATH = "../data/SHOPPING_TRIPS.json"

router.get('/api/inventory', function(req, res, next) {
  const raw_inventory = fs.readFileSync(__dirname + "/" + INVENTORY_PATH) 
  const inventory = JSON.parse(raw_inventory)
  res.send(inventory);
});

router.get('/api/shopping_list', function(req, res, next) {
  const raw_shopping_list = fs.readFileSync(__dirname + "/" + SHOPPING_LIST_PATH) 
  const shopping_list = JSON.parse(raw_shopping_list)
  res.send(shopping_list);
});

router.get('/api/shopping_trips', function(req, res, next) {
  const raw_shopping_trips = fs.readFileSync(__dirname + "/" + SHOPPING_TRIPS_PATH) 
  const shopping_trips = JSON.parse(raw_shopping_trips)
  res.send(shopping_trips);
});

router.post('/api/inventory', function(req, res){
  console.log(req.body)
  fs.writeFileSync(__dirname + "/" + INVENTORY_PATH, JSON.stringify(req.body), "utf8")
  res.send(req.body)
});

router.post('/api/shopping_list', function(req, res){
  console.log(req.body)
  fs.writeFileSync(__dirname + "/" + SHOPPING_LIST_PATH, JSON.stringify(req.body), "utf8")
  res.send(req.body)
});

router.post('/api/shopping_trips', function(req, res){
  console.log(req.body)
  fs.writeFileSync(__dirname + "/" + SHOPPING_TRIPS_PATH, JSON.stringify(req.body), "utf8")
  res.send(req.body)
});

module.exports = router;
