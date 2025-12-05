// controllers/userController.js

export const getUserData = async (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchedCities = req.user.recentSearchedCities;

    res.json({ success: true, role, recentSearchedCities });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const storeRecentSearchCities = async (req, res) => {
  try {
    const { recentSearchCities } = req.body; // This is the city sent by frontend
    const user = req.user;

    if (!recentSearchCities) {
      return res.json({ success: false, message: "City name required" });
    }

    // 1. Remove duplicates
    user.recentSearchedCities = user.recentSearchedCities.filter(
      (city) => city !== recentSearchCities
    );

    // 2. Add new city
    user.recentSearchedCities.push(recentSearchCities);

    // 3. Keep only last 3
    if (user.recentSearchedCities.length > 3) {
      user.recentSearchedCities.shift();
    }

    await user.save();

    res.json({ success: true, message: "City added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
