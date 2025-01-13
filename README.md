# Data Enrichment Frontend
Data Enrichment in PISTIS is responsible for bringing semantic meaning to datasets by transforming raw datasets into SQL tables that has a standardized table schema. Datsets in the form of CSV, XML, TXT and JSON can be transformed into queryable SQL tables using this service. This service has a GUI using which a user can visualize a raw dataset and select appropriate table schema of the resulting dataset. Options for column names in the new table schema is coming from the integrated PISTIS Data Model. On the GUI of the data enrichment service, the user is allowed to view appropriate properties of the PISTIS Data Model and select a new property to be the column name. This repository holds the frontend source code and installation instructions of Data enrichment.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (If you don’t have pnpm installed, you can install it globally by running: `npm install -g pnpm`)

## Installation

1. Clone the repository
2. Navigate into the project directory
3. Install dependencies using pnpm:
   ```bash
    pnpm i
    ```
## Running the app
To start the app locally, run the following command:
```bash
pnpm dev
```
This will fire up the app, and you can view it in your browser at:
```bash
http://localhost:8080
```
## License

***

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)