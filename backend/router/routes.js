const recordController = require("../controllers/recordController");
const hiveController = require("../controllers/hiveController");
const userController = require("../controllers/userController");
const Authentication = require("../controllers/authentication");

const passport = require("../services/passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = app => {
  app.post("/api/user/signup", Authentication.signup);
  app.post("/api/user/signin", requireSignin, Authentication.signin);

  app.get("/api/users", userController.index);
  app.get("/api/user/:id", userController.show);
  //edit, delete

  app.get("/api/user/:id/hives", hiveController.filteredHives);
  app.get("/api/user/:id/hive/new", hiveController.create);
  app.get("/api/hive/:id", hiveController.show);
  //edit, delete

  app.get("/api/hive/:id/records", recordController.filteredRecords);
  //edit (add note, which is attribute of record)
  app.post("/api/records/", recordController.create);
};
