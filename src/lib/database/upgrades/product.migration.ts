export const ProductUpgradeStatements = [
    {
    toVersion: 1,
    statements: [
            `CREATE TABLE IF NOT EXISTS products (
            product_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price NUMERIC NOT NULL,
            category TEXT NOT NULL
            );`
    ]
    },
    /* add new statements below for next database version when required*/
    /*
    {
    toVersion: 2,
    statements: [
        `ALTER TABLE users ADD COLUMN email TEXT;`,
    ]
    },
    */
]