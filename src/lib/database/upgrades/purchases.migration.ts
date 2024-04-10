export const PurchasesUpgradeStatements = [
    {
    toVersion: 1,
    statements: [
        `CREATE TABLE IF NOT EXISTS purchase_record (
            purchase_id INTEGER PRIMARY KEY AUTOINCREMENT,
            time TEXT NOT NULL
        );`,
        `CREATE TABLE IF NOT EXISTS purchases (
            purchase_id INTEGER,
            product_id INTEGER,
            amount INTEGER NOT NULL,
            NAME TEXT NOT NULL,
            description TEXT,
            category TEXT NOT NULL,
            price NUMERIC NOT NULL,
            PRIMARY KEY(purchase_id,product_id)
        );`,
    ]
    },
]