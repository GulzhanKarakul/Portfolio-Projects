const {
    addToLikedAnime,
    getLikedAnime,
    removeFromLikedAnime,
} = require("../controller/UserController");

const router = require("express").Router();
  
  router.get("/liked/:email", getLikedAnime);
  router.post("/add", addToLikedAnime);
  router.put("/remove", removeFromLikedAnime);
  
  module.exports = router;