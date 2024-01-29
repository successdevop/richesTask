const fs = require("fs");
// List all the filenames before renaming
getCurrentFilenames();

// Rename the file
fs.rename("initialName.txt", "newFile.txt", () => {
  console.log("\nFile Renamed!\n");
  // List all the filenames after renaming
  getCurrentFilenames();
});

// Function to get current filenames
// in directory
function getCurrentFilenames() {
  console.log("Current filenames:");
  fs.readdirSync(__dirname).forEach((file) => {
    console.log(file);
  });
}
