const express = require("express");
const app = express();
const cors = require("cors");

const productRoutes = require("./src/routes/masterProductRoutes");
const unitMeasurementRoutes = require("./src/routes/unitOfMeasurementRoutes");
const authRoutes = require('./src/routes/authRoutes');
const suplierRoutes = require('./src/routes/supplierRoutes');

app.use(express.json());
app.use(cors());
app.use(productRoutes);
app.use(unitMeasurementRoutes);
app.use(authRoutes);
app.use(suplierRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})