require("dotenv").config();
const logger = require("./logger/logger");
const schedule = require('node-schedule');
const DISBINPROCESSController = require("./controllers/DISBINPROCESSController");
const NorekLessThn15Controller = require("./controllers/NorekLessThn15Controller");
const GetNorekLessThn15Controller = require("./controllers/GetNorekLessThn15Controller");
const GetDISBINPROCESSController = require("./controllers/GetDISBINPROCESSController");


// GetNorekLessThn15Controller.runJob()
// GetDISBINPROCESSController.runJob()

// DISBINPROCESSController.runJob();
// NorekLessThn15Controller.runJob();