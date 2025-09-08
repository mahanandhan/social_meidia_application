import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server error' });
    }
}

export const followUnfollowUser = async (req, res) => {
    const { id } = req.params; // ID of the user to follow/unfollow
    try {
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);
        if(id === req.user._id.toString()){
            return res.status(400).json({ message: "You cannot follow/unfollow yourself" });
        }
        if(!userToModify || !currentUser){
            return res.status(404).json({ message: "User not found" });
        }
        const isFollowing = currentUser.following.includes(id);
        if(isFollowing){
            await User.findByIdAndUpdate(id, {$pull: {followers: req.user._id}});
            await User.findByIdAndUpdate(req.user._id, {$pull: {following: id}});
            res.status(200).json({ message: "User unfollowed successfully" });
        }else{
            await User.findByIdAndUpdate(id, {$push: {followers: req.user._id}});
            await User.findByIdAndUpdate(req.user._id, {$push: {following: id}});
            res.status(200).json({ message: "User followed successfully" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server error" });
    }
}
// Developing the algorithem for the suggested users so that when the user follows me and iam following the users then we can get the mutuals
export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const userFollowedByMe = await User.findById(userId).select('following');
        const users = (await User.find({ _id: { $ne: userId, $nin: userFollowedByMe.following } }).select('-password').limit(10)).slice(0, 4);
        res.status(200).json(users);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server error" });
    }
}

export const mutualFollowers = async (req, res) => {
    try {
        const userId = req.user._id;

        // Get your following IDs first
        const currentUser = await User.findById(userId).select('following');
        const followingIds = currentUser.following || [];

        // Aggregate friends-of-friends suggestions
        const suggestions = await User.aggregate([
            { $match: { _id: { $in: followingIds } } },        // your friends
            { $unwind: '$following' },                        // each friend’s following
            { $match: { 
                following: { $nin: [...followingIds, userId] } // exclude you and users you already follow
            }},
            { $group: { _id: '$following' } },                // unique IDs
            { $limit: 10 }                                   // limit to 10 suggestions
        ]);

        // Fetch user details for these IDs
        const suggestedUsers = await User.find({ _id: { $in: suggestions.map(s => s._id) } })
            .select('-password');

        res.status(200).json(suggestedUsers);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server error" });
    }
};
