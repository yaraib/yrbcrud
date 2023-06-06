const express = require("express");
const app = express();
const bp = require("body-parser");
var mysql = require("mysql");
var cors = require("cors");

app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "webdblab2",
});

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get(
  "/data/:id/:myname/:age/:del/:ins/:oiname/:oiage/:upd/:srch",
  function (req, res) {
    var fnamee = req.params.myname;
    var fnameesq = mysql.escape(fnamee);

    var oiname = req.params.oiname;
    var uinameesq = mysql.escape(oiname);

    var oiage = req.params.oiage;
    // var uiage = mysql.escape(oiage);
    var ins = req.params.ins;
    var id = req.params.id;
    var del = req.params.del;
    var age = req.params.age;
    var upd = req.params.upd;
    var srch = req.params.srch;
    var dataop12 = 0;
    var msg = 0;
    const queryy = `SELECT count(fname) FROM labtbl6 where fname=${uinameesq}`;

    //DELETE
    if (id != 0 && del != 0 && upd == 0 && ins == 0 && srch == 0) {
      var sql1 = `delete from labtbl6 where id=${id}`;
    } else {
      var sql1 = `SELECT * FROM labtbl6`;
    }

    con.query(sql1, function (err, data, fields) {
      if (err) throw err;
    });

    //INSERT
    if (
      oiname != 0 &&
      oiage != 0 &&
      oiname != "" &&
      oiage != "" &&
      oiname != " " &&
      oiage != " " &&
      del == 0 &&
      ins == 1 &&
      upd == 0 &&
      srch == 0
    )
      var sql0 = `insert into labtbl6 (fname,age)values(${uinameesq},${oiage})`;
    else var sql0 = "SELECT * FROM labtbl6";

    con.query(sql0, function (err, data, fields) {
      if (err && err.code === "ER_DUP_ENTRY") {
        msg = 1;
      }

      //UPDATE
      if (
        id != 0 &&
        fnameesq != 0 &&
        fnameesq != "" &&
        fnameesq != "undefined" &&
        age != 0 &&
        age != "undefined" &&
        del == 0 &&
        upd == 1 &&
        ins == 0 &&
        srch == 0
      )
        var sql10 = `update labtbl6 set fname=${fnameesq}, age=${age} where id=${id}`;
      else var sql10 = `SELECT * FROM labtbl6`;

      con.query(sql10, function (err, data, fields) {
        if (err) throw err;
      });

      //SEARCH
      if (
        oiname != 0 &&
        oiage != "" &&
        oiname != " " &&
        oiage != " " &&
        (oiname != "undefined" || oiage != "undefined") &&
        del == 0 &&
        upd == 0 &&
        ins == 0 &&
        srch == 1
      ) {
        if (oiname != "undefined" && oiage == "undefined")
          var sqls = `select * from labtbl6 where fname=${uinameesq}`;
        if (oiname != "undefined" && oiage != "undefined")
          var sqls = `select * from labtbl6 where fname=${uinameesq} OR age=${oiage}`;
        if (oiname == "undefined" && oiage != "undefined")
          var sqls = `select * from labtbl6 where age=${oiage}`;
      } else {
        var sqls = `SELECT * FROM labtbl6`;
      }

      con.query(sqls, function (err, data, fields) {
        if (err) throw err;
        res.send({ userData: data, msg: msg });
      });
    });
    con.query("SELECT * FROM labtbl6", function (err, data, fields) {
      if (err) throw err;
    });
  }
);

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(2002);
