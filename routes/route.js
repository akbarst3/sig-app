const express = require('express');
const router = express.Router();
const { index, create, logout } = require('../controllers/authenticationController');
const { getDashboard, indexDashboard, addPlace, places, addExcel, editPlace, deletePlace } = require('../controllers/adminController');
const { refreshToken } = require('../controllers/refreshTokenController');
const validateTokenHandler = require('../middleware/validateTokenHandler');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }).single('file');

router.route("/login").get(index).post(create);
router.route("/token").get(refreshToken);
router.route("/dashboard").get(indexDashboard);

router.use(validateTokenHandler);

router.route("/logout").post(logout);
router.route("/dashboard-page").get(getDashboard);
router.route("/places").get(places);
router.route("/add-place").post(addPlace);
router.route("/edit-place").put(editPlace);
router.route("/delete-place").delete(deletePlace);
router.route("/excel").post(upload, addExcel);

module.exports = router;