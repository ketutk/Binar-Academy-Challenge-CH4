require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routing
const mainRoute = "/api/v1";
const authRouter = require("./routes/users.route");
const accountRouter = require("./routes/accounts.route");
const transactionRouter = require("./routes/transactions.route");

app.use(`${mainRoute}/users`, authRouter);
app.use(`${mainRoute}/accounts`, accountRouter);
app.use(`${mainRoute}/transactions`, transactionRouter);

// ERROR HANDLING MIDDLEWARE FOR INTERNAL SERVER ERROR
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: 500,
    message: err.message,
    data: null,
  });
});
// ERROR HANDLING MIDDLEWARE FOR SERVER NOT FOUND
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    error: `Server not found. There is no endpoint on ${req.url}`,
    data: null,
  });
});

// PORT SETTING
const PORT = process.env.PORT || 5555;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
