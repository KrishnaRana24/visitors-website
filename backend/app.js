"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var adminRoute = require("../routes/admin_router");

var mongodb_url = "mongodb://localhost:27017/visitorVaultdb";
var app = (0, express_1.default)();
var port = process.env.PORT || 8000;

mongoose_1.default
  .connect(mongodb_url)
  .then(function () {
    return console.log("MongoDB connected");
  })
  .catch(function (err) {
    return console.error("MongoDB connection error:", err);
  });

app.use(express_1.default.json());
app.use(adminRoute);
app.listen(port, function () {
  console.log("App is running on ".concat(port));
});
