const router = require("express").Router();
// Bring in the User Registration function
const {
 userLogin,
userRegister,
} = require("../utils/auth");

// Registration Route
router.post("/register", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// Login Route
router.post("/", async (req, res) => {
  await userLogin(req.body,res);
});



module.exports = router;
