import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from 'cloudinary';
import { z } from 'zod';

//get user profile
export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(`Error in getUserProfile: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

//follow or unfollow user
export const followUnfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user._id;

    const userToModify = await User.findById(userId);
    const currentUser = await User.findById(followerId);

    if (userId === followerId.toString()) {
      return res
        .status(400)
        .json({ error: "You can't follow or unfollow yourself." });
    }
    if (!userToModify || !currentUser) {
      return res.status(400).json({ error: "User not found." });
    }
    const isFollowing = currentUser.following.includes(userId);
    if (isFollowing) {
      //unfollow the user
      await User.findByIdAndUpdate(userId, {
        $pull: { followers: followerId },
      });
      await User.findByIdAndUpdate(followerId, {
        $pull: { following: userId },
      });
      return res.status(200).json({ message: "User unfollowed successfully." });
    } else {
      //Follow the user
      await User.findByIdAndUpdate(userId, {
        $push: { followers: followerId },
      });
      await User.findByIdAndUpdate(followerId, {
        $push: { following: userId },
      });

      //send notification
      const newNotification = await Notification.create({
        type: "follow",
        from: req.user._id,
        to: userId,
      });

      return res.status(200).json({
        message: "User followed successfully.",
        newNotification: newNotification,
      });
    }
  } catch (error) {
    console.log(`Error in followUnfollowUser: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

//getSuggestedUsers
export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const usersFollowedByMe = await User.findById(userId).select("following");
    const users = await User.aggregate([
      {
        $match: {
          $and: [
            { _id: { $ne: userId } }, // Exclude current user
            { _id: { $nin: usersFollowedByMe.following } } // Exclude users the current user is following
          ]
        }
      },
      { $sample: { size: 10 } } 
    ]);
  
    const suggestedUsers = users.slice(0, 4);
    console.log(suggestedUsers)
    suggestedUsers.forEach((user) => (user.password = undefined));
    return res.status(200).json(suggestedUsers);
  } catch (error) {
    console.log(`Error in getSuggestedUsers: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};


//update user
// export const updateUser = async (req, res) => {
//   let { username, fullName, email, currentPassword, newPassword, bio, link } = req.body;
//   let { profileImg, coverImg } = req.body;

//   const userId = req.user._id;
//   try {
//     let user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found." });
//     }

//     if((!newPassword && currentPassword) ||(!currentPassword && newPassword) ){
//       return res.status(400).json({ error: "Please provide both current password and new password." });
//     }

//     if (currentPassword && newPassword) {
//       const isMatch = await bcryptjs.compare(currentPassword, user.password);

//       if (!isMatch) {
//         return res.status(400).json({ error: "Current password is incorrect." });
//       }
//       if (newPassword.length < 6) {
// 				return res.status(400).json({ error: "Password must be at least 6 characters long" });
// 			}
//       user.password = await bcryptjs.hash(newPassword, 10);
//     }
 
//     if (profileImg) {
//      //destroy exisiting img in cloudinary
//       if (user.profileImg) {
//         await cloudinary.uploader.destroy(user.profileImg.split("/").pop.split(".")[0]);
//       }
//       const uploadedResponse = await cloudinary.uploader.upload(profileImg);
//       profileImg = uploadedResponse.secure_url;
//     }

//     if (coverImg) {
//       if (user.coverImg) {
//         await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
//       }
//       const uploadedResponse = await cloudinary.uploader.upload(coverImg);
//       coverImg = uploadedResponse.secure_url;
//     }


//     user.fullName = fullName || user.fullName;
//     user.email = email || user.email;
//     user.username = username || user.username;
//     user.bio = bio || user.bio;
//     user.link =   link || user.link;
//     user.profileImg = profileImg || user.profileImg;
//     user.coverImg = coverImg || user.coverImg;


//     user = await user.save();


//     return res.status(200).json({ user: user.password=undefined, ...user._doc });

//   } catch (error) {

//      console.log(`Error in updateUser: ${error.message}`);
//     return res.status(500).json({ error: error.message });
    
    
//   }
// }

export const updateUser = async (req, res) => {
	const { fullName, email, username, currentPassword, newPassword, bio, link } = req.body;
	let { profileImg, coverImg } = req.body;

	const userId = req.user._id;

	try {
		let user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
			return res.status(400).json({ error: "Please provide both current password and new password" });
		}

		if (currentPassword && newPassword) {
			const isMatch = await bcrypt.compare(currentPassword, user.password);
			if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });
			if (newPassword.length < 6) {
				return res.status(400).json({ error: "Password must be at least 6 characters long" });
			}

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(newPassword, salt);
		}

		if (profileImg) {
			if (user.profileImg) {
				// https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
				await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(profileImg);
			profileImg = uploadedResponse.secure_url;
		}

		if (coverImg) {
			if (user.coverImg) {
				await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(coverImg);
			coverImg = uploadedResponse.secure_url;
		}

		user.fullName = fullName || user.fullName;
		user.email = email || user.email;
		user.username = username || user.username;
		user.bio = bio || user.bio;
		user.link = link || user.link;
		user.profileImg = profileImg || user.profileImg;
		user.coverImg = coverImg || user.coverImg;

		user = await user.save();

		// password should be null in response
		user.password = null;

		return res.status(200).json(user);
	} catch (error) {
		console.log("Error in updateUser: ", error.message);
		res.status(500).json({ error: error.message });
	}
};