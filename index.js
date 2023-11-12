const http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
// define port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}

const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ massage: "wellCome!" });
});

app.post("/api/v1", (req, res) => {
  url = req.body.link;
  console.log(url);
  const request = http.get(url, (rsp) => {
    res.status(rsp.statusCode).json({ status: `${rsp.statusCode}`, url: url });
    //   console.log('headers:', res.headers);
  });
  request.on("socket", (s) => {
    s.setTimeout(4000, () => {
      s.destroy();
    });
  });

  request.on("error", (e) => {
    res.json(e);
  });
});

app.listen(port, console.log("working...", port));
