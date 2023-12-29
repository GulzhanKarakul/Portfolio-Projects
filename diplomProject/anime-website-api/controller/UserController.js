const User = require("../model/UserModel");

module.exports.addToLikedAnime = async (req, res) => {
    try {
      const { email, data } = req.body;
      console.log(data)
      console.log(email)
      const user = await User.findOne({ email });
      if (user) {
        const { likedAnime } = user;
        const animeAlreadyLiked = likedAnime.find(({ mal_id }) => mal_id === data.mal_id);
        if (!animeAlreadyLiked) {

          await User.findByIdAndUpdate(
            user._id,
            {
              likedAnime: [...user.likedAnime, data],
            },
            { new: true }
          );
        } else return res.json({ msg: "Movie already added to the liked list." });
      } else await User.create({ email, likedAnime: [data] });
      return res.json({ msg: "Movie successfully added to liked list." });
    } catch (error) {
      return res.json({ msg: "Error adding movie to the liked list" });
    }
};

module.exports.getLikedAnime = async (req, res) => {
    try {
        const { email } = req.params;
        console.log(email);
        const user = await User.findOne({ email });

  
        console.log(user.likedAnime);
        console.log("likedAnime");
        if(user) {
            return res.json({ msg: "success", anime: user.likedAnime});
        } else return res.json({ msg: "User with given email not found." });
    } catch(err) {
        return res.json({ msg: "Error fetching movie" });
    }
};

module.exports.removeFromLikedAnime = async (req, res) => {
  try {
    const { email, animeId } = req.body;
    console.log("remove");
    console.log(email);
    console.log(animeId);
    const user = await User.findOne({ email });
    if (user) {
      const myAnime = user.likedAnime;
      const animeIndex = myAnime.findIndex(({ mal_id }) => mal_id === animeId);
      if (!animeIndex) {
        res.status(400).send({ msg: "Anime not found." });
      }
      myAnime.splice(animeIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          likedAnime: myAnime,
        },
        { new: true }
      );
      return res.json({ msg: "Anime successfully removed.", anime });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
}