import {User} from '../Models/accountSchema.js'
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id); // Find user by ID stored in the token

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next(); // If user is admin, proceed to the next middleware or route handler
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};
export {isAdmin};