# URL Shortener

A simple URL shortener application built with Node.js, Express, and MongoDB.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/url-shortener.git
   ```

2. Install dependencies:

   ```bash
   cd url-shortener
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection URL:

   ```plaintext
   MongoDB_URL=your_mongodb_connection_url_here
   ```

4. Start the server:

   ```bash
   npm start
   ```

## Usage

### Shorten a URL

1. Open [Postman](https://www.postman.com/downloads/) and import the provided [Postman collection](url-shortener.postman_collection.json).

2. Send a POST request to `http://localhost:8001/url` with the following JSON body:

   ```json
   {
       "URL": "https://example.com"
   }
   ```

   This will shorten the provided URL. 

3. The response will contain the shortened URL ID.

   ```json
   {
     "id": "mSjGCTfn8w"
   }
   ```

### Access the Original URL

To access the original URL, visit `http://localhost:8001/url/:id` in your web browser, where `:id` is the shortened URL ID generated.

## Dependencies

- [dotenv](https://www.npmjs.com/package/dotenv): Load environment variables from a `.env` file.
- [express](https://www.npmjs.com/package/express): Web framework for Node.js.
- [mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling for Node.js.
- [nodemon](https://www.npmjs.com/package/nodemon): Monitor for any changes in your Node.js application and automatically restart the server.
- [short-unique-id](https://www.npmjs.com/package/short-unique-id): Library for generating short unique IDs.
- [shortid](https://www.npmjs.com/package/shortid): Library for generating short non-sequential URL-friendly unique IDs.

