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
  app.patch("/api/user/:id/edit", userController.update);
  // delete

  app.get("/api/user/:id/hives", hiveController.filteredHives);
  app.post("/api/hive/new", hiveController.create);
  app.get("/api/hive/:id", hiveController.show);
  app.patch("/api/hive/:id/edit", hiveController.update);
  // delete path

  app.get("/api/hive/:id/weather", hiveController.getWeather);

  app.get("/api/hive/:id/records", recordController.filteredRecords);
  app.post("/api/records/", recordController.create);
};
