import express from 'express';

const router = express.Router();
export default router;

//instantiate an object of type index controller
import { DisplayHomePage } from '../Controller';

/* GET home page. */
router.get('/', DisplayHomePage);

module.exports = router;
