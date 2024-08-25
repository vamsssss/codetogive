const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Listing = require('./models/Listing');
const app = express();
const cookieParser = require('cookie-parser');



app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());


mongoose.connect('mongodb+srv://sindhura:password%40123@cluster0.ub5nh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


// POST route to add a new listing
app.post("/api/listings", async (req, res) => {
  try {
    const { organization, availableFood, tags, address, pax } = req.body;

    const newListing = new Listing({
      organization,
      availableFood,
      tags,
      address,
      pax,
    });

    const listing = await newListing.save();
    res.status(201).json(listing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/api/listings", async (req, res) => {
    try {
      const listings = await Listing.find();
      res.status(200).json(listings);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
});


app.get("/api/highest", async (req, res) => {
  try {
    const listings = await Listing.find().limit(1);
    res.status(200).json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


app.listen(8080);