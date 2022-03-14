const express = require("express");
const router = express.Router();

const {
  create,
  find,
  update,
  remove,
  findById,
  findByGdod,
} = require("../../controllers/general/equipmentAndMaterialsPeriodicInspections");

// find spec
router.get("/equipmentAndMaterialsPeriodicInspections/:id", findById);

router.get("/equipmentAndMaterialsPeriodicInspections/bygdod/:gdod", findByGdod);
//find all
router.get("/equipmentAndMaterialsPeriodicInspections", find);
//add
router.post("/equipmentAndMaterialsPeriodicInspections", create); /**/
//update
router.put("/equipmentAndMaterialsPeriodicInspections/:id", update);
//delete
router.delete("/equipmentAndMaterialsPeriodicInspections/:id", remove);

module.exports = router;
