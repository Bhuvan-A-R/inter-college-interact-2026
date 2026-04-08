# Admin Hash Generator

## Usage

```
npm run generate-admin [optional_plain_password]
```

**Examples:**

```
npm run generate-admin          # Uses 'admin123'
npm run generate-admin mypass   # Uses 'mypass'
```

**Output:**

```
=== Admin Password Hashes ===
Plain: admin123
Hash:  $2b$13$abc123...
Random: Xy2#kPq9...
Hash:  $2b$13$def456...

Usage:
INSERT INTO Users (...) VALUES ('admin@...', '${hash}', 'ADMIN');
```

Copy **Hash** for DB insert after `DATABASE_URL` setup + `npx prisma db push`.

**Your Constraints:** Uses `bcrypt.hash(plain, 13)` matching `signup/route.ts`.
