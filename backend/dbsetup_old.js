const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '.env') });
const { neon } = require("@neondatabase/serverless");
const fs = require("fs");


const sql = neon(process.env.DATABASE_URL);

async function executeSQLFile(filePath) {
    try {
        const queries = fs.readFileSync(filePath, "utf8").trim().split(';');
        for (const query of queries){
            if (query) {
                await sql(query); // Execute each query separately
                console.log(`Executed: ${filePath}`);
            }
        }
    } catch (err) {
        console.error(`Error executing ${filePath}:`, err);
    }
}

async function setupDatabase() {
    const sqlDir = path.join(__dirname, "sql"); // Folder where your SQL files are stored
    const sqlFiles = fs.readdirSync(sqlDir).filter(file => file.endsWith(".sql"));

    for (const file of sqlFiles) {
        await executeSQLFile(path.join(sqlDir, file)); // Execute each file separately
    }

    console.log("Database setup completed!");
}

setupDatabase().catch(console.error);
