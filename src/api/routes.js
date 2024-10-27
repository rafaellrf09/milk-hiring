const { Router } = require('express');
const FarmerController = require('../controllers/Farmer');
const FarmController = require('../controllers/Farm');
const MilkProductionController = require('../controllers/MilkProduction');

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

router.post('/milk-productions', MilkProductionController.create);
router.get('/milk-productions/:farmId', MilkProductionController.getByFarm);
router.get('/milk-productions/:farmId/month', MilkProductionController.getByFarmAndMonth);
router.put('/milk-productions/:id', MilkProductionController.update);
router.delete('/milk-productions/:id', MilkProductionController.delete);


module.exports = router;