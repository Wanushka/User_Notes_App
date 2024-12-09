const express = require('express');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', noteRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});