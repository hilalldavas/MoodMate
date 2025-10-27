"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const UserInteraction_1 = __importDefault(require("../models/UserInteraction"));
const router = express_1.default.Router();
// Get all interactions for a user, populated with content details
router.get('/my-interactions', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const interactions = yield UserInteraction_1.default.find({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId })
            .populate('contentId'); // Populate the contentId field with Content document
        res.json(interactions);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Add or update an interaction (Frontend now primarily uses PUT for updates and POST for new)
// Keeping this route for backwards compatibility or specific use cases if needed.
router.post('/interact', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { contentType, contentId, rating, comment, isCompleted } = req.body;
        // Check if interaction already exists
        let interaction = yield UserInteraction_1.default.findOne({
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
            contentType,
            contentId // This will now be an ObjectId
        });
        if (interaction) {
            // Update existing interaction
            interaction.rating = rating !== undefined ? rating : interaction.rating;
            interaction.comment = comment !== undefined ? comment : interaction.comment;
            interaction.isCompleted = isCompleted !== undefined ? isCompleted : interaction.isCompleted;
            yield interaction.save();
        }
        else {
            // Create new interaction
            interaction = new UserInteraction_1.default({
                userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId,
                contentType,
                contentId,
                rating,
                comment,
                isCompleted: isCompleted !== undefined ? isCompleted : false
            });
            yield interaction.save();
        }
        // Populate before sending response
        yield interaction.populate('contentId');
        res.json(interaction);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Update an interaction by ID
router.put('/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params; // UserInteraction ID
        const updates = req.body; // Partial updates
        const interaction = yield UserInteraction_1.default.findOneAndUpdate({ _id: id, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId }, // Find by interaction ID and user ID
        { $set: updates }, // Apply partial updates
        { new: true } // Return the updated document
        ).populate('contentId'); // Populate before returning
        if (!interaction) {
            return res.status(404).json({ message: 'Interaction not found or user not authorized' });
        }
        res.json(interaction);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Delete an interaction by ID
router.delete('/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params; // UserInteraction ID
        const interaction = yield UserInteraction_1.default.findOneAndDelete({ _id: id, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId } // Find by interaction ID and user ID
        );
        if (!interaction) {
            return res.status(404).json({ message: 'Interaction not found or user not authorized' });
        }
        res.json({ message: 'Interaction deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Get completed items (populated with content details)
router.get('/completed', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const interactions = yield UserInteraction_1.default.find({
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
            isCompleted: true
        }).populate('contentId'); // Populate content details
        res.json(interactions);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Get user comments (populated with content details)
router.get('/comments', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const interactions = yield UserInteraction_1.default.find({
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
            comment: { $exists: true, $ne: '' }
        }).populate('contentId'); // Populate content details
        res.json(interactions);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
