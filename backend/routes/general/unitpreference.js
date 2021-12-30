const express = require('express');
const router = express.Router()

const { create, find, update, remove, findById,unitpreferencebyjobid} = require('../../controllers/general/unitpreference');

// find spec 
router.get('/unitpreference/:id', findById)
//find all
router.get('/unitpreference', find)
//add 
router.post('/unitpreference',create); /**/ 
//update 
router.put('/unitpreference/:unitpreferenceId', update)
//delete 
router.delete('/unitpreference/:id', remove )

router.get('/unitpreferencebyjobid/:jobid', unitpreferencebyjobid )

module.exports = router;