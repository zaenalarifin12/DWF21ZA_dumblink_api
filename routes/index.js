const express = require("express");
const router = express.Router();

const { authenticated } = require("../middleware/auth");
const { uploadFile } = require("../middleware/upload");

const AuthController = require("../controller/auth");
const LinkController = require("../controller/link");
const UserController = require("../controller/user");

// auth
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/check-auth", authenticated, AuthController.checkAuth);

router.get("/links", authenticated, LinkController.myLink);

router.post(
  "/link",
  authenticated,
  uploadFile("image"),
  LinkController.postLink
);

router.post(
  "/imageLink",
  authenticated,
  uploadFile("imageLink"),
  LinkController.uploadImageLink
);
router.get("/link/:id", authenticated, LinkController.detailLink);

router.put("/link/:id/active", authenticated, LinkController.activeLink);
router.put("/link/:id/nonaktif", authenticated, LinkController.nonaktifLink);


router.get("/link/show/:uniqueLink", LinkController.showLink);
router.put(
  "/link/:id",
  authenticated,
  uploadFile("image"),
  LinkController.editLink
);


router.delete("/link/:uniqueLink", LinkController.deleteLink);

router.put("/user", authenticated, UserController.editUser);
router.delete("/user", authenticated, UserController.deleteUser);

module.exports = router;
