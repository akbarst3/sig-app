const Place = require("../models/place")
const asyncHandler = require("express-async-handler")
const xlsx = require("xlsx")
const fs = require("fs")

/**
 * @desc    Get dashboard data
 * @route   GET /dashboard
 * @access  Private
 */
const getDashboard = (req, res) => {
    res.json(
        req.user
    )
}

/**
 * @desc    Render dashboard page
 * @route   GET /dashboard-page
 * @access  Public
 */
const indexDashboard = (req, res) => {
    res.render("dashboard")
}

/**
 * @desc    Add a new place
 * @route   POST /add-place
 * @access  Private
 */
const addPlace = asyncHandler(async (req, res) => {
    const { name, lat, lng } = req.body;

    if (!name || !lat || !lng) {
        res.status(400);
        throw new Error('Please provide name, latitude, and longitude');
    }

    const newPlace = new Place({
        name,
        lat,
        lng,
    });

    await newPlace.save();

    res.status(201).json({ message: "Place added successfully" });
});

/**
 * @desc    Get all places
 * @route   GET /places
 * @access  Private
 */
const places = asyncHandler(async (req, res) => {
    const places = await Place.find();
    res.json(places);
});

/**
 * @desc    Add places from Excel file
 * @route   POST /excel
 * @access  Private
 */
const addExcel = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Tidak ada file yang diunggah.' });
    }

    try {
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        const expectedHeaders = ['Name', 'Latitude', 'Longitude'];
        const actualHeaders = Object.keys(data[0]);

        const isValid = expectedHeaders.every(header => actualHeaders.includes(header));
        if (!isValid) {
            return res.status(400).json({ success: false, message: 'Format file Excel tidak valid.' });
        }

        for (const row of data) {
            if (!row.Name || isNaN(row.Latitude) || isNaN(row.Longitude)) {
                console.warn('Data tidak valid:', row);
                continue;
            }

            const place = new Place({
                name: row.Name,
                lat: parseFloat(row.Latitude),
                lng: parseFloat(row.Longitude),
            });
            await place.save();
        }

        fs.unlinkSync(req.file.path);

        res.json({ success: true, message: 'Data dari file excel sudah disimpan.' });
    } catch (error) {
        console.error('Error processing file:', error);
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({ success: false, message: 'Terjadi kesalahan saat memproses file.', error: error.message });
    }
});

/**
 * @desc    Edit a place
 * @route   PUT /edit-place
 * @access  Private
 */
const editPlace = asyncHandler(async (req, res) => {
    const { name, lat, lng } = req.body;
    if (!name || !lat || !lng) {
        res.status(400);
        throw new Error('Please provide name, latitude, and longitude');
    }
    const place = await Place.findOne({ name });
    place.lat = lat;
    place.lng = lng;
    await place.save();
    res.status(201).json({ message: "Place updated successfully" });
})

/**
 * @desc    Delete a place
 * @route   DELETE /delete-place
 * @access  Private
 */
const deletePlace = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error('Please provide name');
    }
    await Place.findOneAndDelete({ name });
    res.status(201).json({ message: 'Place deleted' });
})

module.exports = { getDashboard, indexDashboard, addPlace, places, addExcel, editPlace, deletePlace }