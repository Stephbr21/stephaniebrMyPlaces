//console.log('pls work');

//Dependencias
var http = require('http');
var url = require('url');
var fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');

//Variables
var port = 3000;
var localhost = 'localhost';


var server = http.createServer((request, response) => {
    var parseUrl = url.parse(request.url, true);
    var path = parseUrl.pathname;
    path = path.replace(/^\/+|\/+$/g, '');
    var method = request.method;

    var query = parseUrl.query;
    var headers = request.headers;

    switch (path) {
        case 'data':
            switch (method) {
                case 'OPTIONS':
                    respondToOptions(request, response);
                    break;
                case 'GET':
                    getData(request, response);
                    break;
                case 'POST':
                    postNewVenue(request, response);
                    break;
                case 'PUT':
                    newCategory(request, response);
                    break;
                default:
                    send404(request, response);
                    break;
            }
            break;
    }

});



server.listen(port, localhost, function () {
    console.log('Run Forest Run');
});


function loadData() {
    return new Promise(loadDataPromiseExecuter);
}


function loadDataPromiseExecuter(resolve, reject) {
    fs.readFile(path.resolve(process.cwd(), './data/data.json'), function (err, data) {
        if (err) {
            reject();
        } else {
            var data = JSON.parse(data);
            resolve(data);
        }
    });
}

function getData(request, response) {
    setResponseHeaders(request, response);
    loadData().then(function (data) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(data));
        response.end();
    }).catch(function () {
        send404(request, response)
    });
}

function saveNewVenue(venue) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path.resolve(process.cwd(), './data/venues.json'), JSON.stringify(venue), function (err) {
            if (err) {
                reject();
            } else {
                resolve();
            }
        })
    });
}

function postNewVenue(request, response) {
    setResponseHeaders(request, response);

    let buffer = [];
    let venue = null;

    request.on('data', function (chunk) {
        buffer.push(chunk);
    });

    request.on('end', function () {
        buffer = Buffer.concat(buffer).toString();
        venue = JSON.parse(buffer);
        console.log(venue);
        saveNewVenue(venue).then(function () {
            response.writeHead(200);
            response.end();
        }).catch(function () {
            send404(request, response);
        });
    });
}

function saveCategory(category) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path.resolve(process.cwd(), './data/categories.json'), JSON.stringify(category), function (err) {
            if (err) {
                reject();
            } else {
                resolve();
            }
        })
    });
}

function newCategory(request, response) {
    setResponseHeaders(request, response);

    let buffer = [];
    let category = null;

    request.on('data', function (chunk) {
        buffer.push(chunk);
    });

    request.on('end', function () {
        buffer = Buffer.concat(buffer).toString();
        category = JSON.parse(buffer);
        console.log(category);

        saveCategory(category).then(function () {
            response.writeHead(200);
            response.end();
        }).catch(function () {
            send404(request, response);
        });
    });
}

function respondToOptions(request, response) {
    setResponseHeaders(request, response);
    response.writeHead(200);
    response.end();
}

function setResponseHeaders(request, response) {

    var origin = '*';
    if (request.headers['origin']) {
        origin = request.headers['origin'];
    }

    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    if (request.headers['content-type']) {
        response.setHeader('Content-Type', request.headers['content-type'])
    }
    response.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Access-Control-Allow-Methods, Content-Type');
}

function send404(request, response) {
    setResponseHeaders(request, response);
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end();
}


