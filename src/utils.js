import fs from "fs";

export function loadFixtures() {
  const fixtures = fs.readFileSync("src/fixtures.json");
  return JSON.parse(fixtures);
}

export function sortByDate(a, b) {
  return new Date(a.sendingTime).getTime() - new Date(b.sendingTime).getTime();
}
