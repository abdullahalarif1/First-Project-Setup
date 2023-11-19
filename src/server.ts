// all connection needed apply here.
import app from "./app";
import config from "./app/config";




// getting-started.js
import mongoose from "mongoose"; // apply import syntax

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  }
   catch (err) {
    console.log(err);
  }
}
main()
