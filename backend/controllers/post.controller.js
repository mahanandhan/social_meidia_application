import Post from '../models/post.model.js';
import User from '../models/user.model.js';
export const createPost = async (req, res) => {
    try {
        const { title, description, category, image, link } = req.body;
        const userId = req.user._id.toString();
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!title || !description) {
            return res.status(400).json({ error: 'Title, description' });
        }
        const newPost = new Post({
            user: userId,
            title,
            description,
            category: category || 'default',
            image,
            link
        });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost})
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post){
            return res.status(404).json({ error: 'Post not found' });
        }
        if (post.user.toString() !== req.user._id.toString()){
            return res.status(403).json({ error: 'Unauthorized' });
        }
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate({
            path: 'user',
            select: '-password'
        }).populate({
            path: 'comments.user',
            select: '-password'
        })
        if (posts.length === 0){
            return res.status(200).json([]);
        }
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error getting post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getFollowingPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const following = user.following;
        const feedPost = await Post.find({ user: {$in: following}}).sort({ createdAt: -1 }).populate({
            path: 'user',
            select: '-password'
        }).populate({
            path: 'comments.user',
            select: '-password'
        })
        res.status(200).json(feedPost);
    } catch (error) {
        console.error('Error getting post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 }).populate({
            path: 'user',
            select: '-password'
        }).populate({
            path: 'comments.user',
            select: '-password'
        })
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error getting post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id.toString();
        if (!text) {
            return res.status(400).json({ error: 'Comment text is required' });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const comment = { user: userId, text };
        post.comments.push(comment);
        await post.save();
        res.status(201).json({ message: 'Comment added successfully', comment });
    } catch (error) {
        console.error('Error commenting on post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const likeUnlikePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const userId = req.user._id.toString();
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const userLikedPost = post.likes.includes(userId);
        if (userLikedPost) {
            await Post.updateOne({_id: postId}, { $pull: { likes: userId } });
            await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });
            res.status(200).json({ message: 'Post unliked' });
        }else{
            post.likes.push(userId);
            await post.save();
            await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
            res.status(200).json({ message: 'Post liked' });
        }
    } catch (error) {
        console.error('Error liking/unliking post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}