const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.route('/concerts').get(ConcertController.getAll);
router.route('/concerts/random').get(ConcertController.getRandom);
router.route('/concerts/:id').get(ConcertController.getById);
router.route('/concerts').post(ConcertController.post);
router.route('/concerts/:id').delete(ConcertController.delete);
router.route('/concerts/:id').put(ConcertController.put);

router.route('/concerts/performer/:performer').get(ConcertController.getPerformer);
router.route('/concerts/genre/:genre').get(ConcertController.getGenre);
router.route('/concerts/price/:price_min/:price_max').get(ConcertController.getPrice);
router.route('/concerts/day/:day').get(ConcertController.getDay);

module.exports = router;
