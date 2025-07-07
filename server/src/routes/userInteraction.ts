import express from 'express';
import { auth } from '../middleware/auth';
import UserInteraction from '../models/UserInteraction';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all interactions for a user, populated with content details
router.get('/my-interactions', auth, async (req: AuthRequest, res) => {
  try {
    const interactions = await UserInteraction.find({ userId: req.user?.userId })
      .populate('contentId'); // Populate the contentId field with Content document
    res.json(interactions);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Add or update an interaction (Frontend now primarily uses PUT for updates and POST for new)
// Keeping this route for backwards compatibility or specific use cases if needed.
router.post('/interact', auth, async (req: AuthRequest, res) => {
  try {
    const { contentType, contentId, rating, comment, isCompleted } = req.body;
    
    // Check if interaction already exists
    let interaction = await UserInteraction.findOne({
      userId: req.user?.userId,
      contentType,
      contentId // This will now be an ObjectId
    });

    if (interaction) {
      // Update existing interaction
      interaction.rating = rating !== undefined ? rating : interaction.rating;
      interaction.comment = comment !== undefined ? comment : interaction.comment;
      interaction.isCompleted = isCompleted !== undefined ? isCompleted : interaction.isCompleted;
      await interaction.save();
    } else {
      // Create new interaction
      interaction = new UserInteraction({
        userId: req.user?.userId,
        contentType,
        contentId,
        rating,
        comment,
        isCompleted: isCompleted !== undefined ? isCompleted : false
      });
      await interaction.save();
    }

    // Populate before sending response
    await interaction.populate('contentId');

    res.json(interaction);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Update an interaction by ID
router.put('/:id', auth, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params; // UserInteraction ID
    const updates = req.body; // Partial updates

    const interaction = await UserInteraction.findOneAndUpdate(
      { _id: id, userId: req.user?.userId }, // Find by interaction ID and user ID
      { $set: updates }, // Apply partial updates
      { new: true } // Return the updated document
    ).populate('contentId'); // Populate before returning

    if (!interaction) {
      return res.status(404).json({ message: 'Interaction not found or user not authorized' });
    }

    res.json(interaction);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an interaction by ID
router.delete('/:id', auth, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params; // UserInteraction ID

    const interaction = await UserInteraction.findOneAndDelete(
      { _id: id, userId: req.user?.userId } // Find by interaction ID and user ID
    );

    if (!interaction) {
      return res.status(404).json({ message: 'Interaction not found or user not authorized' });
    }

    res.json({ message: 'Interaction deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get completed items (populated with content details)
router.get('/completed', auth, async (req: AuthRequest, res) => {
  try {
    const interactions = await UserInteraction.find({
      userId: req.user?.userId,
      isCompleted: true
    }).populate('contentId'); // Populate content details
    res.json(interactions);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get user comments (populated with content details)
router.get('/comments', auth, async (req: AuthRequest, res) => {
  try {
    const interactions = await UserInteraction.find({
      userId: req.user?.userId,
      comment: { $exists: true, $ne: '' }
    }).populate('contentId'); // Populate content details
    res.json(interactions);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 