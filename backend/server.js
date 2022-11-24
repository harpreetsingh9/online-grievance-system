const { app, db, PORT } = require("./config/config");
const { SERVER_DB_URI } = require("./constants/constants.js");
const bootstrap = async () => {

  try {
    await db.connect(process.env.MONGODB);
    app.listen(PORT, async () => {
      console.log("Server is running");
    });
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
