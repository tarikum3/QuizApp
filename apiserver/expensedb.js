var store = require("nedb");
var fs = require("fs");
var expenses = new store({ filename: "expense.db", autoload: true });
expenses.find({}, function (err, docs) {
  if (docs.length == 0) {
    loadExpenses();
  }
});
function loadExpenses() {
  readCsv("data.json", function (data) {
    //console.log(data);
    data.questions.forEach(function (rec, idx) {
      item = rec;

      expenses.insert(rec, function (err, doc) {
        // console.log("Inserted", doc.item_name, "with ID", doc._id);
      });
    });
  });
}
function readCsv(file, callback) {
  fs.readFile(file, "utf-8", function (err, data) {
    if (err) throw err;

    var result = JSON.parse(data);
    callback(result);
  });
}
module.exports = expenses;
