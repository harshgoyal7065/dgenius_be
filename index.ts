// server.ts
import express from 'express';
import adminRoutes from './routes/admin.routes';
import subUserRoutes from './routes/subUser.routes';

const app = express();

app.use(express.json());

// Base Routes
app.use('/api/admin', adminRoutes);
app.use('/api/sub-user', subUserRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
