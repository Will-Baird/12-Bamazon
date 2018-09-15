var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "",
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome To Bamazon!");
    showProducts();
});

function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("```````````````````````````````````");
        console.log("");
        for (var i = 0; i < res.length; i++) {
            console.log("ID ==> " + res[i].id);
            console.log("Name ==> " + res[i].product_name);
            console.log("Price ==> " + res[i].price);
            console.log("");
        }
        console.log("```````````````````````````````````");
        ask();
    });
}

function ask() {
    inquirer.prompt([
        {
            name: "item",
            message: "Please Select The Item ID You Would Like To Purchase",
            type: "number"
        },
        {
            name: "quantity",
            message: "How Many Would You Like To Purchase",
            type: "number"
        }
    ]).then(function (answer) {
        if (answer.item && answer.quantity) {
            var item = answer.item;
            var quantity = answer.quantity;
            checkItem(item, quantity);
        } else {
            ask();
        }
    });
}

function checkItem(item, quantity) {
    connection.query("Select * From products WHERE ?", { id: item }, function (err, res) {
        if (err) {
            console.log("Please Try Again");
            ask();
        }
        if (res[0].stock_quantity >= parseInt(quantity)) {
            console.log("");
            console.log("Perfect!");
            console.log("");
            var q = res[0].stock_quantity;
            update(item, quantity, q);
        } else {
            console.log("Insufficient quantity!");
            console.log("Please come back when we have more in stock!");
            connection.end();
        }
    });
}

function update(item, quantity, q) {
    var newQuantity = q - quantity;
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newQuantity
            },
            {
                id: item
            }
        ], function (err, res) {
            if (err) throw err;
            pay(item, quantity);
        });
}

function pay(item, quantity) {
    var total = 0;
    connection.query("SELECT * FROM products WHERE ?", { id: item }, function (err, res) {
        if (err) throw err;
        total = res[0].price * quantity;
        console.log("```````````````````````````````````");
        console.log("");
        console.log("Your Total Is $" + total);
        console.log("Thank You!");
        console.log("");
        console.log("```````````````````````````````````");
        sales(item, total);
    });
}

function sales(item, total) {
    connection.query("SELECT * FROM products WHERE ?", { id: item }, function (err, res) {
        if (err) throw err;
        var sales = res[0].product_sales + total;
        salesUpdate(item, sales);
    });
}

function salesUpdate(item, sales) {
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                product_sales: sales
            },
            {
                id: item
            }
        ], function (err, res) {
            if (err) throw err;
            connection.end();
        });
}