require("dotenv").config();
const logger = require("./logger/logger");
const schedule = require('node-schedule');
const DISBINPROCESSController = require("./controllers/DISBINPROCESSController");
const NorekLessThn15Controller = require("./controllers/NorekLessThn15Controller");
const GetNorekLessThn15Controller = require("./controllers/GetNorekLessThn15Controller");
const GetDISBINPROCESSController = require("./controllers/GetDISBINPROCESSController");
const GetJobCPITnullController = require("./controllers/GetCPITnullController");
const CPITnullController = require("./controllers/CPITnullController");


// GetNorekLessThn15Controller.runJob()
// GetDISBINPROCESSController.runJob()
// GetJobCPITnullController.runJob()

// DISBINPROCESSController.runJob();
// NorekLessThn15Controller.runJob();

CPITnullController.runJob()