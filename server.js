const http = require('http'); // Import the http module to create a server
const fs = require('fs'); // Import the fs module to interact with the file system
const { parse } = require('url'); // Import the url module to parse request URLs
const port = 3020; // Define the port on which the server will listen

// Initialize data file if it doesn't exist
if (!fs.existsSync('data.json')) {
    // Create an empty JSON array in data.json
    fs.writeFileSync('data.json', JSON.stringify([]));
}

// Function that reads data from JSON file
const readData = async () => {
    try {
        // Read the data from data.json
        const data = await fs.promises.readFile('data.json', 'utf8');
        return JSON.parse(data); // Parse and return the JSON data
    } catch (error) {
        console.error('Error reading data:', error); // Log any errors
        return []; // Return an empty array in case of error
    }
};

// Function that writes data to JSON file
const writeData = async (data) => {
    try {
        // Write the data to data.json in a pretty format
        await fs.promises.writeFile('data.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing data:', error); // Log any errors
    }
};

////////////////////////////////////////////////////////////////// Create HTTP server\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const server = http.createServer(async (req, res) => {
    const url = parse(req.url, true); // Parse the incoming request URL
    const method = req.method; // Get the HTTP method of the request
    const id = url.pathname.split('/')[2]; // Extract the item ID from the URL

    try {
        ///////////////////////////////////////////// Handle GET /items - Retrieve all items\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        if (url.pathname === '/items' && method === 'GET') {
            const items = await readData(); // Read current items from the file
            res.writeHead(200, { 'Content-Type': 'application/json' }); // Set response headers
            res.end(JSON.stringify(items)); // Send the items as JSON response


        //////////////////////////////////////////////// Handle POST /items - Add a new item\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        } else if (url.pathname === '/items' && method === 'POST') {
            let body = ''; // Initialize a variable to hold the incoming data
            req.on('data', (chunk) => {
                body += chunk; // Append incoming data chunks to body
            });
            req.on('end', async () => {
                try {
                    const items = await readData(); // Read current items
                    const newItem = JSON.parse(body); // Parse the incoming JSON data
                    newItem.id = items.length ? items[items.length - 1].id + 1 : 1; // Assign a new ID
                    items.push(newItem); // Add the new item to the array
                    await writeData(items); // Write updated items back to the file
                    res.writeHead(201, { 'Content-Type': 'application/json' }); // Set response status to Created
                    res.end(JSON.stringify(newItem)); // Return the created item
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' }); // Set bad request status
                    res.end(JSON.stringify({ message: 'Invalid JSON data' })); // Return error message
                }
            });

        ///////////////////////////////////////////// Handle PUT /items/:id - Update an existing item\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        } else if (url.pathname.startsWith('/items/') && method === 'PUT') {
            let body = ''; // Initialize a variable to hold the incoming data
            req.on('data', (chunk) => {
                body += chunk; // Append incoming data chunks to body
            });
            req.on('end', async () => {
                try {
                    const items = await readData(); // Read current items
                    const updatedItem = JSON.parse(body); // Parse the incoming JSON data
                    const itemId = parseInt(id); // Convert the ID from string to number
                    const itemIndex = items.findIndex((item) => item.id === itemId); // Find the index of the item

                    // If item exists, update it
                    if (itemIndex !== -1) {
                        items[itemIndex] = { ...items[itemIndex], ...updatedItem }; // Merge existing and new data
                        await writeData(items); // Write updated items back to the file
                        res.writeHead(200, { 'Content-Type': 'application/json' }); // Set response status to OK
                        res.end(JSON.stringify(items[itemIndex])); // Return the updated item
                    } else {
                        res.writeHead(404, { 'Content-Type': 'application/json' }); // Set not found status
                        res.end(JSON.stringify({ message: 'Item not found' })); // Return error message
                    }
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' }); // Set bad request status
                    res.end(JSON.stringify({ message: 'Invalid JSON data' })); // Return error message
                }
            });

        //////////////////////////////////////////////// Handle DELETE /items/:id - Delete an item\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        } else if (url.pathname.startsWith('/items/') && method === 'DELETE') {
            const items = await readData(); // Read current items
            const itemId = parseInt(id); // Convert the ID from string to number
            const filteredItems = items.filter((item) => item.id !== itemId); // Filter out the item to delete

            // Check if an item was deleted
            if (items.length !== filteredItems.length) {
                await writeData(filteredItems); // Write the remaining items back to the file
                res.writeHead(200, { 'Content-Type': 'application/json' }); // Set response status to OK
                res.end(JSON.stringify({ message: 'Item deleted' })); // Return success message
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' }); // Set not found status
                res.end(JSON.stringify({ message: 'Item not found' })); // Return error message
            }

        /////////////////////////////////////////////////////// Handle any other routes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' }); // Set not found status
            res.end(JSON.stringify({ message: 'Route not found' })); // Return error message
        }
    } catch (error) {
        console.error('Server error:', error); // Log any server errors
        res.writeHead(500, { 'Content-Type': 'application/json' }); // Set internal server error status
        res.end(JSON.stringify({ message: 'Internal Server Error' })); // Return error message
    }
});

///////////////////////////////////////////////////////////////////// Start the server\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
server.listen(port, (error) => {
    if (error) {
        console.log('Something went wrong', error); // Log any errors starting the server
    } else {
        console.log('Server is listening on port ' + port); // Log successful server start
    }
});
