#! /usr/bin/env node

console.log(
  'This script populates some test books, brands, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");
const Brand = require("./models/brand");

const categories = [];
const brands = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createBrands();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function brandCreate(index, name, desc) {
  const brand = new Brand({ name: name, desc: desc });
  await brand.save();
  brands[index] = brand;
  console.log(`Added brand: ${name}`);
}

async function itemCreate(index, name, desc, category, stock, brand) {
  const itemdetail = {
    name: name,
    desc: desc,
    category: category,
    stock: stock,
    brand: brand,
  };
  if (category != false) itemdetail.category = category;

  const item = new Item(itemdetail);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "1 person"),
    categoryCreate(1, "2 person"),
    categoryCreate(2, "3+ person"),
    categoryCreate(3, "2 season"),
    categoryCreate(4, "3 season"),
    categoryCreate(5, "4 season"),
  ]);
}

async function createBrands() {
  console.log("Adding brands");
  await Promise.all([
    brandCreate(
      0,
      "Big Agnes",
      "Big Agnes is one of our favourite brands, we've stocked their gear for years and we love that they constantly innovate with their products, seeing things differently than the mainstream. In tents the Copper Spur series is a true hero product. In 2022 they produced their first backpacks, 'light' rather than 'ultralight' they combine comfort, durability and a rich feature-set."
    ),
    brandCreate(
      1,
      "Nemo Equipment",
      "We've worked with Nemo tents, mats and sleeping bags for years. We love how innovative their designs are and how light their tent range has become. Its a great company to be in touch with, we look forward to meeting with them each year to see what new ideas they've come up with and incorporated into their product line."
    ),
    brandCreate(
      2,
      "MSR",
      "MSR was founded in the 1960's with a mission to improve the safety of climbing hardwear. Since achieving its goal its gone onto create some of the worlds favourite gear, from the iconic Dragonfly stove and Hubba series of Tents to the more recent MSR Guardian, a leading edge water purifier developed for the US Military."
    ),
    brandCreate(
      3,
      "Sierra Designs",
      "We've lusted after Sierra Designs gear for years but it has only been sporadically available in the UK. A few years ago they setup their current distribution arrangement and we were a natural early partner for their innovative range of everything backpacking."
    ),
    brandCreate(
      4,
      "Sea to Summit",
      "Founded in 1983 by Roland Tyson and later with Penny Sanderson Sea to Summit has grown into a global brand, largely due to their passion for the Outdoors, Travel, Innovation and Design, their products stand out from the crowd. Always a focus on weight and durability they are a perfect fit for what we love to do."
    ),
  ]);
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    itemCreate(
      0,
      "Tiger Wall 2 Platinum Tent",
      "The Big Agnes Tiger Wall 2 Platinum is an ultralight, three season, free standing tent. It blends two of their best backpacking designs (the popular Copper Spur and Fly Creek) into one intriguing ultralight package.",
      [categories[1], categories[4]],
      12,
      brands[0]
    ),
    itemCreate(
      1,
      "Copper Spur HV UL 1 Tent",
      "Big Agnes Copper Spur HV UL 1 and 2 Tent - supremely versatile free-standing design. Big Agnes have updated their hugely popular Copper Spur HV UL series with new materials that are lighter and stronger.",
      [categories[0], categories[4]],
      20,
      brands[0]
    ),
    itemCreate(
      2,
      "Copper Spur HV UL 4 Tent",
      "Big Agnes have updated their hugely popular Copper Spur HV UL series with new materials that are lighter and stronger while adding a great new awning-style vestibule opening.",
      [categories[2], categories[4]],
      5,
      brands[0]
    ),
    itemCreate(
      3,
      "Hornet Elite OSMO 1P Tent",
      "Nemo Hornet Osmo Elite tent series - best in class weight for a freestanding tent combined with a polyester/nylon blend fabric for superb performance wet or dry.",
      [categories[0], categories[4]],
      13,
      brands[1]
    ),
    itemCreate(
      4,
      "Dagger OSMO 3P Tent",
      "Light enough for backpacking but large enough for comfort. The new Dagger OSMO incorporates NEMO’s new OSMO fabric, whilst drawing inspiration from NEMOs classic dragonfly tent.",
      [categories[2], categories[4]],
      2,
      brands[1]
    ),
    itemCreate(
      5,
      "Remote 2 Tent",
      "The Remote is a serious tent designed to withstand the most demanding conditions. Excellent poles matched with quality materials for the inner and outer provide strength and confidence.",
      [categories[1], categories[5]],
      2,
      brands[2]
    ),
    itemCreate(
      6,
      "Hubba NX Tent",
      "MSR Hubba NX tent series  - Popular design but MSR apply technology to the fabrics and coating to enhance durability and performance.",
      [categories[0], categories[4]],
      9,
      brands[2]
    ),
    itemCreate(
      7,
      "Alto TR2 Tent",
      "The Alto is the new flag ship design for a practical, ultralight tent from Sea to Summit. Packed with innovative features this lightweight tent has a good amount of space and is designed to be user friendly.",
      [categories[1], categories[4]],
      9,
      brands[4]
    ),
  ]);
}
