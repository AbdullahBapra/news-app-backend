import express from 'express';

const router = express.Router();


router.post('/:id', async (req, res) => {
    const { intrsests } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.intrests = intrsests;
        await user.save();
        res.status(200).json({ message: "Intrests updated successfully", intrests: user.intrests });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update intrests", error: error.message });
    }
});

export default router;