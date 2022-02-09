const express = require("express");
const router = express.Router();

const Story = require("../models/story");
const User = require("../models/user");
const Attraction = require("../models/attraction");
const { isValidObjectId } = require("mongoose");

const { isLoggedIn } = require("../middleware");

router.post("/stories", isLoggedIn, async (req, res) => {
  try {
    let author = req.user._id;
    let story = await Story.create({ ...req.body, author });
    let user = await User.findOne({ _id: author });
    user.stories.push(story._id);
    await user.save();

    let attraction = await Attraction.findOne({ _id: req.body.locationId });
    attraction.stories.push(story._id);
    await attraction.save();
    res.send(story);
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

router.get("/stories/search", async (req, res) => {
  try {
    console.log('here')
    let { q } = req.query;
    if (q) {
      let stories = await Story.find({
        title: { $regex: q, $options: "i" },
        published: true,
      });
      return res.send(stories);
    }
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

router.get("/stories", async (req, res) => {
  try {
    let stories = await Story.find({ published: true });
    res.send(stories);
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

router.get("/stories/tag/:tag", async (req, res) => {
  try {
    let tag = req.params.tag;
    let stories = await Story.find({ tags: { $elemMatch: { $eq: tag } } });
    res.send(stories);
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

router.get("/user/stories", isLoggedIn, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user._id });
    let { stories } = await user.populate("stories");
    res.send(stories);
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

router.get("/user/:id/stories", async (req, res) => {
  try {
    let userId = req.params.id;
    if (!isValidObjectId(userId)) return res.send("INVDALID ID");
    let stories = await Story.find({ author: userId, published: true });
    res.send(stories);
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

router.get("/stories/:id", async (req, res) => {
  try {
    let storyId = req.params.id;
    if (!isValidObjectId(storyId)) return res.send("INVDALID ID");

    let story = await Story.findOne({ published: true, _id: req.params.id });
    if (!story) res.send("STORY NOT FOUND");
    await story.populate("locationId");
    await story.populate("author", "username");
    res.send(story);
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

router.get("/user/stories/:id", isLoggedIn, async (req, res) => {
  try {
    let storyId = req.params.id;
    if (!isValidObjectId(storyId)) return res.send("INVDALID ID");

    let user = await User.findOne({ _id: req.user._id });
    let { stories } = await user.populate("stories");

    let story = stories.find((story) => story._id.equals(storyId));
    if (!story) return res.send("STORY NOT FOUND");
    res.send(story);
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

router.delete("/user/stories/:id", isLoggedIn, async (req, res) => {
  try {
    let storyId = req.params.id;
    if (!isValidObjectId(storyId)) return res.send("INVDALID ID");

    let user = await User.findOne({ _id: req.user._id });
    let { stories } = await user.populate("stories");
    let newStories = stories.filter((story) => {
      story._id !== storyId;
    });
    user.stories = newStories;
    await user.save();
    await Story.findOneAndDelete({ _id: storyId });
    res.send(user.stories);
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

router.put("/user/stories/:id", isLoggedIn, async (req, res) => {
  try {
    let storyId = req.params.id;
    if (!isValidObjectId(storyId)) return res.send("INVDALID ID");
    let { title, body, tags, published, locationId } = req.body;
    let story = await Story.findOneAndUpdate(
      { _id: storyId },
      { title, body, tags, published, locationId },
      { new: true }
    );

    if (!story) return res.send("STORY NOT FOUND");
    await story.populate("author", "username");
    res.send(story);
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

router.patch("/user/stories/:id/status", isLoggedIn, async (req, res) => {
  try {
    let storyId = req.params.id;
    if (!isValidObjectId(storyId)) return res.send("INVDALID ID");

    let user = await User.findOne({ _id: req.user._id });
    let { stories } = await user.populate("stories");
    let story = stories.find((story) => story._id.equals(storyId));

    if (!story) return res.send("STORY NOT FOUND");

    let updatedStory = await Story.findByIdAndUpdate(
      { _id: storyId },
      { published: !story.published },
      { new: true }
    );

    res.send(updatedStory);
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

router.patch("/stories/:id/likes", isLoggedIn, async (req, res) => {
  try {
    let storyId = req.params.id;
    if (!isValidObjectId(storyId)) return res.send("INVDALID ID");

    let story = await Story.findOne({ _id: storyId, published: true });
    if (!story) return res.send("STORY NOT FOUND");
    let userId = req.user._id;
    if (!story.likes.includes(userId)) {
      story.likes.push(userId);
      let dislikes = story.dislikes.filter((id) => {
        id !== userId;
      });
      story.dislikes = dislikes;
      await story.save();
    }
    await story.populate("author", "username");
    res.send(story);
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

router.get("/stories/:id/likes", async (req, res) => {
  try {
    let storyId = req.params.id;
    if (!isValidObjectId(storyId)) return res.send("INVDALID ID");

    let story = await Story.findOne({ _id: storyId, published: true });
    if (!story) return res.send("STORY NOT FOUND");

    res.send(story.likes);
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

router.patch("/stories/:id/dislikes", isLoggedIn, async (req, res) => {
  try {
    let storyId = req.params.id;
    if (!isValidObjectId(storyId)) return res.send("INVDALID ID");

    let story = await Story.findOne({ _id: storyId, published: true });
    if (!story) return res.send("STORY NOT FOUND");
    let userId = req.user._id;
    if (!story.dislikes.includes(userId)) {
      story.dislikes.push(userId);

      let likes = story.likes.filter((id) => {
        id !== userId;
      });
      story.likes = likes;
      await story.save();
    }
    await story.populate("author", "username");
    res.send(story);
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

router.get("/stories/:id/dislikes", async (req, res) => {
  try {
    let storyId = req.params.id;
    if (!isValidObjectId(storyId)) return res.send("INVDALID ID");

    let story = await Story.findOne({ _id: storyId, published: true });
    if (!story) return res.send("STORY NOT FOUND");
    res.send(story.dislikes);
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

router.post("/stories/:id/comments", isLoggedIn, async (req, res) => {
  try {
    let storyId = req.params.id;
    let { comment } = req.body;
    if (!isValidObjectId(storyId)) return res.send("INVDALID ID");

    let story = await Story.findOne({ _id: storyId, published: true });
    if (!story) return res.send("STORY NOT FOUND");
    let userId = req.user._id;
    story.comments.push({ author: userId, content: comment });
    await story.save();
    res.send(story);
  } catch (error) {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

module.exports = router;
