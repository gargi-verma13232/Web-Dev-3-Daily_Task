# Web Dev III – Line-by-Line Code & Module Mastery Guide (Days 1 to 9)

Welcome to the ultimate technical reference guide for the **Web Dev III Coursework**. This document provides an **exhaustive, line-by-line explanation of every piece of code** across all 9 days, as well as deep-dive explanations of all Node.js core modules and Express components used.

---

## 🧰 Comprehensive Module Directory

Before reading the code line-by-line, understand the core modules and functions powering our applications:

### 1. Built-in Core Modules (No `npm` install required)
* **`http`**: Node.js core module for creating HTTP servers (`http.createServer()`), handling request objects (`req`), and sending response headers/payloads (`res.writeHead()`, `res.end()`).
* **`fs` (File System)**: Core module for interacting with the local file system.
  * `fs.readFileSync(path, encoding)`: Reads a file synchronously and returns text/buffer.
  * `fs.writeFileSync(path, data, encoding)`: Overwrites/creates a file synchronously.
  * `fs.appendFile(path, data, callback)`: Asynchronously appends data to a file.
  * `fs.unlink(path, callback)`: Asynchronously deletes a file.
* **`path`**: Core module for handling cross-platform file directory paths.
  * `path.join(...paths)`: Joins path segments into a normalized path string using platform-specific separators (`/` on Unix, `\` on Windows).
  * `__dirname`: Global Node.js variable storing the absolute path of the current directory.
* **`process`**: Global object providing information about the running Node process.
  * `process.argv`: Array containing command-line arguments. `argv[0]` is node binary path, `argv[1]` is file path, `argv[2...]` are user arguments.
  * `process.env`: Key-value map of system and environment variables.

### 2. Third-Party Modules (Installed via `npm`)
* **`express`**: Fast, unopinionated Web Framework for Node.js.
  * `const app = express()`: Factory function instantiating the Express server application.
  * `app.use(middleware)`: Mounts global middleware (e.g., `express.json()`).
  * `express.Router()`: Creates modular, isolated mini-router instances for sub-paths (e.g., `/tours`, `/users`).
* **`dotenv`**: Loads environment variables from a `.env` file into `process.env`.

---

## 1️⃣ Day-1-06_08_2026: Node.js Foundation

### 📄 Code (`Day-1-06_08_2026/app.js`)
```javascript
1: console.log("Hello Node.js Environment!");
```

### 💡 Line-by-Line Explanation:
* **Line 1 (`console.log(...)`)**: Calls the global `console` object's `log` method to print the string `"Hello Node.js Environment!"` directly to the standard output (stdout) terminal stream. Executed by passing the file to the Node.js V8 runtime engine: `node app.js`.

---

## 2️⃣ Day-2-07_08_2026: Core Modules & Module Systems

### 📄 Code File 1: `Day-2-07_08_2026/commonJs/app.js`
```javascript
1: const fs = require("fs");
2: const myData = require("../data/myData");
3: 
4: console.log("Imported Data:", myData);
5: fs.writeFileSync("output.txt", "Writing file using fs core module.");
```

### 💡 Line-by-Line Explanation:
* **Line 1 (`const fs = require("fs")`)**: Uses the CommonJS `require()` function to load Node's built-in `fs` module and bind its methods to the variable `fs`.
* **Line 2 (`const myData = require(...)`)**: Imports the local file `myData.js` using relative path syntax (`../data/myData`). Reads the object exported via `module.exports`.
* **Line 4 (`console.log(...)`)**: Prints the imported data object to the console terminal.
* **Line 5 (`fs.writeFileSync(...)`)**: Synchronously writes the text string `"Writing file using fs core module."` to a file named `output.txt`. If `output.txt` does not exist, Node creates it; if it exists, Node overwrites it.

---

## 3️⃣ Day-3-10_08_2026: Native HTTP Server & Manual Routing

### 📄 Code (`Day-3-10_08_2026/app.js`)
```javascript
1: const http = require('http');
2: 
3: const server = http.createServer((req, res) => {
4:     if (req.url === '/') {
5:         res.writeHead(200, { 'Content-Type': 'text/html' });
6:         res.end('<h1>Home Page</h1>');
7:     } else {
8:         res.writeHead(404, { 'Content-Type': 'application/json' });
9:         res.end(JSON.stringify({ error: 'Route not found' }));
10:    }
11: });
12: 
13: server.listen(3000, () => {
14:     console.log('Server running on port 3000');
15: });
```

### 💡 Line-by-Line Explanation:
* **Line 1 (`const http = require('http')`)**: Imports the built-in HTTP module to create a web server.
* **Line 3 (`const server = http.createServer((req, res) => {`)**: Calls `http.createServer()`, passing a callback function executed whenever a request reaches the server.
  * `req` (IncomingMessage): Contains request URL, headers, and method.
  * `res` (ServerResponse): Stream object used to send headers and response bodies back to the browser.
* **Line 4 (`if (req.url === '/')`)**: Checks if the user visited the root URL path `/`.
* **Line 5 (`res.writeHead(200, { 'Content-Type': 'text/html' })`)**: Writes HTTP response header with status `200 OK` and MIME type `text/html`.
* **Line 6 (`res.end('<h1>Home Page</h1>')`)**: Flushes the HTML payload string to the client and terminates the HTTP response stream.
* **Line 7–10 (`else { ... }`)**: Executes when an invalid route is requested. Returns status `404 Not Found` with a JSON payload stringified via `JSON.stringify()`.
* **Line 13 (`server.listen(3000, ...)`)**: Binds the server to TCP port `3000` and starts listening for incoming connections. Logs a startup message when ready.

---

## 4️⃣ Day-4-13_08_2026: Introduction to Express Framework

### 📄 Code (`Day-4-13_08_2026/app.js`)
```javascript
1: const express = require('express');
2: const app = express();
3: const packages = require('./data/Tour');
4: 
5: app.get('/packages', (req, res) => {
6:     const des = req.query.destination;
7:     if (!des) {
8:         return res.json(packages);
9:     }
10:    const result = packages.filter(item => item.destination == des);
11:    res.json(result);
12: });
13: 
14: app.get('/packages/:id', (req, res) => {
15:    const id = Number(req.params.id);
16:    const onePack = packages.find(item => item.id == id);
17:    res.json(onePack);
18: });
19: 
20: app.listen(5000, () => {
21:    console.log("Server is running on port 5000");
22: });
```

### 💡 Line-by-Line Explanation:
* **Line 1 (`const express = require('express')`)**: Imports the top-level Express framework module.
* **Line 2 (`const app = express()`)**: Invokes the `express()` factory function to initialize an Express application instance.
* **Line 3 (`const packages = require('./data/Tour')`)**: Imports the array of tour packages from `Tour.js`.
* **Line 5 (`app.get('/packages', (req, res) => {`)**: Registers an HTTP `GET` route handler for `/packages`.
* **Line 6 (`const des = req.query.destination`)**: Accesses `req.query` to extract query parameter `destination` from URL (e.g. `/packages?destination=Goa`).
* **Line 7–9 (`if (!des) return res.json(packages)`)**: If no `destination` query param was provided, returns all packages as JSON using Express's `res.json()` utility.
* **Line 10 (`const result = packages.filter(...)`)**: Filters the array returning only objects matching the requested destination string.
* **Line 11 (`res.json(result)`)**: Sends the filtered array as a JSON response.
* **Line 14 (`app.get('/packages/:id', ...)`)**: Registers a route handler with a dynamic route parameter `:id`.
* **Line 15 (`const id = Number(req.params.id)`)**: Reads `req.params.id` (string from URL path) and converts it to a number.
* **Line 16 (`const onePack = packages.find(...)`)**: Uses JavaScript `.find()` method to locate the package object matching `id`.
* **Line 17 (`res.json(onePack)`)**: Sends the found object back to client.
* **Line 20–22 (`app.listen(5000, ...)`)**: Binds Express server to port `5000`.

---

## 5️⃣ Day-5-14_08_2026: Streams & HTTP POST Body Handling

### 📄 Code (`Day-5-14_08_2026/app.js`)
```javascript
1: const http = require('http');
2: 
3: const server = http.createServer((req, res) => {
4:     if (req.url === '/submit' && req.method === 'POST') {
5:         let body = '';
6: 
7:         req.on('data', (chunk) => {
8:             body += chunk;
9:         });
10: 
11:        req.on('end', () => {
12:            console.log('Received POST Data:', body);
13:            res.writeHead(200, { 'Content-Type': 'application/json' });
14:            res.end(JSON.stringify({ message: 'Data received successfully', data: body }));
15:        });
16:    } else {
17:        res.writeHead(404, { 'Content-Type': 'application/json' });
18:        res.end(JSON.stringify({ error: 'Route not found' }));
19:    }
20: });
21: 
22: server.listen(8080);
```

### 💡 Line-by-Line Explanation:
* **Line 4 (`if (req.url === '/submit' && req.method === 'POST')`)**: Checks both URL path and HTTP request method (`POST`).
* **Line 5 (`let body = ''`)**: Initializes an empty string accumulator for incoming request body data chunks.
* **Line 7 (`req.on('data', (chunk) => {`)**: Registers an event listener on the incoming request stream (`req`). Triggers whenever a data packet chunk arrives over the network socket.
* **Line 8 (`body += chunk`)**: Appends incoming chunk string/buffer to `body`.
* **Line 11 (`req.on('end', () => {`)**: Registers listener triggered when client finishes sending request stream data payload.
* **Line 13–14**: Sends `200 OK` header and returns JSON confirmation object containing full body data.

---

## 6️⃣ Day-6-17_08_2026: Express Route & Query Parameters Deep Dive

### 📄 Code (`Day-6-17_08_2026/index.js`)
```javascript
1: const express = require('express');
2: const app = express();
3: const packages = require('./data/tour');
4: 
5: app.get('/', (req, res) => {
6:     res.send("Hi there !!! Welcome 🙏");
7: });
8: 
9: app.get("/packages", (req, res) => {
10:    const des = req.query.des;
11:    if (!des) {
12:        return res.json(packages);
13:    }
14:    const result = packages.filter(
15:        (item) => item.destination.toLowerCase() === des.toLowerCase()
16:    );
17:    res.json(result);
18: });
19: 
20: app.get("/packages/:id", (req, res) => {
21:    const id = Number(req.params.id);
22:    const onePack = packages.find(item => item.id === id);
23:    if (!onePack) {
24:        return res.status(404).json({ error: "Package not found" });
25:    }
26:    res.json(onePack);
27: });
28: 
29: app.listen(3000, () => {
30:    console.log("Server is running on port 3000");
31: });
```

### 💡 Line-by-Line Explanation:
* **Line 6 (`res.send(...)`)**: Express utility method to send raw HTML/plain-text responses.
* **Line 15 (`item.destination.toLowerCase() === des.toLowerCase()`)**: Converts both dataset destination and query parameter `des` to lowercase for robust, case-insensitive string matching.
* **Line 23–25 (`if (!onePack) return res.status(404).json(...)`)**: Returns HTTP status code `404 Not Found` if requested package ID does not exist in dataset.

---

## 7️⃣ Day-7-20_08_2026: MVC Architecture Foundations

### 📄 File 1: Model (`Day-7-20_08_2026/model/tourModel.js`)
```javascript
1: const fs = require('fs');
2: const path = require('path');
3: 
4: const tourFilePath = path.join(__dirname, '../data/tour.json');
5: 
6: const getAll = () => {
7:     const data = fs.readFileSync(tourFilePath, 'utf-8');
8:     return JSON.parse(data);
9: };
10: 
11: const getById = (id) => {
12:    const data = fs.readFileSync(tourFilePath, 'utf-8');
13:    const tours = JSON.parse(data);
14:    return tours.find(t => t.id === id);
15: };
16: 
17: module.exports = { getAll, getById };
```
* **Line 4 (`path.join(__dirname, '../data/tour.json')`)**: Constructs absolute file path to `tour.json` by resolving relative steps (`..`) from current model folder location (`__dirname`).
* **Line 7 (`fs.readFileSync(...)`)**: Synchronously reads contents of `tour.json` as a UTF-8 encoded string.
* **Line 8 (`JSON.parse(data)`)**: Parses raw JSON string into a native JavaScript Array of objects.

---

### 📄 File 2: Controller (`Day-7-20_08_2026/controller/tourController.js`)
```javascript
1: const tourModel = require('../model/tourModel');
2: 
3: const getAllTour = (req, res) => {
4:     const tours = tourModel.getAll();
5:     res.json(tours);
6: };
7: 
8: const getTourById = (req, res) => {
9:     const id = parseInt(req.params.id, 10);
10:    const tour = tourModel.getById(id);
11:    if (tour) {
12:        res.status(200).json(tour);
13:    } else {
14:        res.status(404).json({ message: 'Tour not found' });
15:    }
16: };
17: 
18: module.exports = { getAllTour, getTourById };
```
* **Line 4 (`const tours = tourModel.getAll()`)**: Controller delegates data retrieval responsibility to the Model layer (`tourModel`).
* **Line 12 (`res.status(200).json(tour)`)**: Sets explicit HTTP response status code to `200 OK` and returns JSON payload.

---

### 📄 File 3: Router (`Day-7-20_08_2026/route/tourRouter.js`)
```javascript
1: const express = require('express');
2: const router = express.Router();
3: const tourController = require('../controller/tourController');
4: 
5: router.get('/', tourController.getAllTour);
6: router.get('/:id', tourController.getTourById);
7: 
8: module.exports = router;
```
* **Line 2 (`const router = express.Router()`)**: Creates an isolated Express Router instance.
* **Line 5 (`router.get('/', tourController.getAllTour)`)**: Maps HTTP `GET /` endpoint to `getAllTour` controller method.
* **Line 6 (`router.get('/:id', tourController.getTourById)`)**: Maps HTTP `GET /:id` endpoint to `getTourById` controller method.

---

### 📄 File 4: Server Entry (`Day-7-20_08_2026/index.js`)
```javascript
1: const express = require('express');
2: const app = express();
3: const tourRouter = require('./route/tourRouter');
4: 
5: app.use(express.json());
6: app.use('/tours', tourRouter);
7: 
8: const PORT = 3000;
9: app.listen(PORT, () => {
10:    console.log(`Server running on port ${PORT}`);
11: });
```
* **Line 5 (`app.use(express.json())`)**: Global middleware parsing incoming JSON body payloads.
* **Line 6 (`app.use('/tours', tourRouter)`)**: Mounts `tourRouter` under base path `/tours`. All routes in `tourRouter` inherit `/tours` prefix (`GET /tours`, `GET /tours/:id`).

---

## 8️⃣ Day-8-21_08_2026: Full RESTful CRUD API under MVC

### 📄 Model Operations (`Day-8-21_08_2026/model/tourModel.js`)
```javascript
// CREATE
1: const save = (tour) => {
2:     const data = fs.readFileSync(tourFilePath, 'utf-8');
3:     const packages = JSON.parse(data);
4:     packages.push(tour);
5:     fs.writeFileSync(tourFilePath, JSON.stringify(packages, null, 2), 'utf-8');
6: };

// UPDATE
7: const update = (id, updatedTour) => {
8:     const data = fs.readFileSync(tourFilePath, 'utf-8');
9:     const packages = JSON.parse(data);
10:    const index = packages.findIndex(pkg => pkg.id === id);
11:    if (index !== -1) {
12:        packages[index] = { ...packages[index], ...updatedTour };
13:        fs.writeFileSync(tourFilePath, JSON.stringify(packages, null, 2), 'utf-8');
14:    }
15: };

// DELETE
16: const deleteTour = (id) => {
17:    const data = fs.readFileSync(tourFilePath, 'utf-8');
18:    const packages = JSON.parse(data);
19:    const updatedPackages = packages.filter(pkg => pkg.id !== id);
20:    fs.writeFileSync(tourFilePath, JSON.stringify(updatedPackages, null, 2), 'utf-8');
21: };
```

### 💡 Line-by-Line Explanation:
* **Line 4 (`packages.push(tour)`)**: Appends newly created tour object to packages array.
* **Line 5 (`fs.writeFileSync(..., JSON.stringify(..., null, 2))`)**: Persists updated array back to disk formatting with 2-space JSON indentation.
* **Line 10 (`const index = packages.findIndex(...)`)**: Finds array index position of item matching ID.
* **Line 12 (`{ ...packages[index], ...updatedTour }`)**: JavaScript object spread operator merging old values with new updated property fields.
* **Line 19 (`packages.filter(pkg => pkg.id !== id)`)**: Creates new array excluding item with matching ID.

---

## 9️⃣ Day-9-28_08_2026: Multi-Resource MVC System (Tours + Users)

### 📄 Main App Entry (`Day-9-28_08_2026/index.js`)
```javascript
1: const express = require('express');
2: const app = express();
3: 
4: const tourRouter = require('./route/tourRouter');
5: const userRouter = require('./route/userRouter');
6: 
7: app.use(express.json());
8: 
9: app.use('/tours', tourRouter);
10: app.use('/users', userRouter);
11: 
12: const PORT = 3000;
13: app.listen(PORT, () => {
14:     console.log(`Server running on port ${PORT}`);
15: });
```

### 💡 Line-by-Line Explanation:
* **Line 4 & 5**: Imports both independent router modules (`tourRouter` and `userRouter`).
* **Line 7 (`app.use(express.json())`)**: Global JSON parsing middleware handling payloads for both tours and users.
* **Line 9 (`app.use('/tours', tourRouter)`)**: Routes all HTTP requests starting with `/tours` (`GET /tours`, `POST /tours`, `PUT /tours/:id`, `DELETE /tours/:id`) to `tourRouter`.
* **Line 10 (`app.use('/users', userRouter)`)**: Routes all HTTP requests starting with `/users` (`GET /users`, `POST /users`, `PUT /users/:id`, `DELETE /users/:id`) to `userRouter`.
* **Line 13 (`app.listen(PORT, ...)`)**: Launches unified Express HTTP application listening on Port 3000.
