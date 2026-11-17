const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./codepixel.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Initialize database tables
db.serialize(() => {
    // Create contacts table
    db.run(`
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            service TEXT NOT NULL,
            budget TEXT,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Create reviews table
    db.run(`
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            country TEXT NOT NULL,
            service TEXT NOT NULL,
            rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
            review TEXT NOT NULL,
            permission INTEGER DEFAULT 0,
            approved INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Insert sample reviews if table is empty
    db.get("SELECT COUNT(*) as count FROM reviews", (err, row) => {
        if (row.count === 0) {
            const sampleReviews = [
                {name: "Sarah Mitchell", country: "United States", service: "Web Development", rating: 5, review: "CodePixel Studio transformed our vision into a stunning website. Their attention to detail and technical expertise exceeded our expectations. The team was professional, responsive, and delivered ahead of schedule."},
                {name: "James Okonkwo", country: "Nigeria", service: "Brand Identity", rating: 5, review: "Working with CodePixel Studio was an incredible experience. They created a brand identity that perfectly captures our company's essence. The designs are modern, memorable, and have helped us stand out in a crowded market."},
                {name: "Elena Rodriguez", country: "Spain", service: "UI/UX Design", rating: 5, review: "The UI/UX design work was phenomenal. Our app's user engagement increased by 40% after the redesign. CodePixel Studio truly understands how to create intuitive and beautiful digital experiences."},
                {name: "Michael Chen", country: "Canada", service: "Graphic Design", rating: 4, review: "Outstanding graphic design work! The visual assets they created for our marketing campaign were eye-catching and professional. Highly recommend their creative services."}
            ];

            const stmt = db.prepare(`INSERT INTO reviews (name, country, service, rating, review, approved) VALUES (?, ?, ?, ?, ?, 1)`);
            sampleReviews.forEach(review => {
                stmt.run(review.name, review.country, review.service, review.rating, review.review);
            });
            stmt.finalize();
            console.log('Sample reviews inserted');
        }
    });
});

// Contact API functions
const ContactAPI = {
    add: (data, callback) => {
        const { name, email, service, budget, message } = data;
        const stmt = db.prepare(`INSERT INTO contacts (name, email, service, budget, message) VALUES (?, ?, ?, ?, ?)`);
        stmt.run(name, email, service, budget, message, function(err) {
            if (err) {
                callback({ success: false, error: err.message });
            } else {
                callback({ success: true, id: this.lastID });
            }
        });
        stmt.finalize();
    },
    getAll: (callback) => {
        db.all("SELECT * FROM contacts ORDER BY created_at DESC", [], (err, rows) => {
            callback(err ? { success: false, error: err.message } : { success: true, contacts: rows });
        });
    }
};

// Review API functions
const ReviewAPI = {
    add: (data, callback) => {
        const { name, country, service, rating, review, permission } = data;
        const stmt = db.prepare(`INSERT INTO reviews (name, country, service, rating, review, permission, approved) VALUES (?, ?, ?, ?, ?, ?, 0)`);
        stmt.run(name, country, service, rating, review, permission ? 1 : 0, function(err) {
            if (err) {
                callback({ success: false, error: err.message });
            } else {
                callback({ success: true, id: this.lastID, message: 'Review submitted successfully. It will be displayed after approval.' });
            }
        });
        stmt.finalize();
    },
    getApproved: (callback) => {
        db.all("SELECT * FROM reviews WHERE approved = 1 ORDER BY created_at DESC", [], (err, rows) => {
            callback(err ? { success: false, error: err.message } : { success: true, reviews: rows });
        });
    },
    getAll: (callback) => {
        db.all("SELECT * FROM reviews ORDER BY created_at DESC", [], (err, rows) => {
            callback(err ? { success: false, error: err.message } : { success: true, reviews: rows });
        });
    },
    approve: (id, callback) => {
        db.run("UPDATE reviews SET approved = 1 WHERE id = ?", [id], function(err) {
            callback(err ? { success: false, error: err.message } : { success: true });
        });
    }
};

module.exports = { db, ContactAPI, ReviewAPI };
