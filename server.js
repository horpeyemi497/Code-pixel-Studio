const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { ContactAPI, ReviewAPI } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'CodePixel Studio API is running' });
});

// Contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, service, budget, message } = req.body;

    // Validation
    if (!name || !email || !service || !message) {
        return res.status(400).json({
            success: false,
            error: 'Please fill in all required fields'
        });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            error: 'Please enter a valid email address'
        });
    }

    ContactAPI.add({ name, email, service, budget, message }, (result) => {
        if (result.success) {
            res.json({
                success: true,
                message: 'Thank you for reaching out! We will get back to you soon.',
                id: result.id
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Something went wrong. Please try again later.'
            });
        }
    });
});

// Get all contacts (for admin)
app.get('/api/contacts', (req, res) => {
    ContactAPI.getAll((result) => {
        res.json(result);
    });
});

// Review submission
app.post('/api/reviews', (req, res) => {
    const { name, country, service, rating, review, permission } = req.body;

    // Validation
    if (!name || !country || !service || !rating || !review) {
        return res.status(400).json({
            success: false,
            error: 'Please fill in all required fields'
        });
    }

    // Rating validation
    if (rating < 1 || rating > 5) {
        return res.status(400).json({
            success: false,
            error: 'Rating must be between 1 and 5'
        });
    }

    ReviewAPI.add({ name, country, service, rating, review, permission }, (result) => {
        if (result.success) {
            res.json({
                success: true,
                message: 'Thank you for your review! It will be displayed after approval.',
                id: result.id
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Something went wrong. Please try again later.'
            });
        }
    });
});

// Get approved reviews
app.get('/api/reviews', (req, res) => {
    ReviewAPI.getApproved((result) => {
        res.json(result);
    });
});

// Get all reviews (for admin)
app.get('/api/admin/reviews', (req, res) => {
    ReviewAPI.getAll((result) => {
        res.json(result);
    });
});

// Approve review (for admin)
app.post('/api/admin/reviews/approve/:id', (req, res) => {
    ReviewAPI.approve(req.params.id, (result) => {
        if (result.success) {
            res.json({ success: true, message: 'Review approved' });
        } else {
            res.status(500).json({ success: false, error: result.error });
        }
    });
});

// Serve static HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'services.html'));
});

app.get('/skills', (req, res) => {
    res.sendFile(path.join(__dirname, 'skills.html'));
});

app.get('/process', (req, res) => {
    res.sendFile(path.join(__dirname, 'process.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'projects.html'));
});

app.get('/testimonials', (req, res) => {
    res.sendFile(path.join(__dirname, 'testimonials.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/review', (req, res) => {
    res.sendFile(path.join(__dirname, 'review.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗  ║
║   ██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝  ║
║   ██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗    ║
║   ██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝    ║
║   ╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗  ║
║    ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝  ║
║                        STUDIO                             ║
║                                                           ║
║   🌐 Server running at: http://localhost:${PORT}              ║
║   📧 Contact API: http://localhost:${PORT}/api/contact       ║
║   ⭐ Reviews API: http://localhost:${PORT}/api/reviews         ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
