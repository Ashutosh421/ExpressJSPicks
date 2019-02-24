const router = require('express').Router();

router.get('/', (req, res) => res.render('Home', { title: 'Home' }));
router.get('/home', (req, res) => res.render('Home', { title: 'Home' }));

module.exports = router;
