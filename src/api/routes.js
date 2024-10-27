const { Router } = require('express');
const FarmerController = require('../controllers/Farmer');
const FarmController = require('../controllers/Farm');

const router = Router();

router.post('/farmers', FarmerController.createFarmer);
router.get('/farmers', FarmerController.getAllFarmers);
router.get('/farmers/:id', FarmerController.getFarmerById);
router.put('/farmers/:id', FarmerController.updateFarmer);
router.delete('/farmers/:id', FarmerController.deleteFarmer);
router.get('/farmers/:id/farms', FarmerController.getFarmsByFarmerId);

router.post('/farms', FarmController.createFarm);
router.get('/farms', FarmController.getAllFarms);
router.get('/farms/:id', FarmController.getFarmById);
router.put('/farms/:id', FarmController.updateFarm);
router.delete('/farms/:id', FarmController.deleteFarm);


module.exports = router;