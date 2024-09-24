import express from 'express';

const app = express();
const PORT = 4200;

app.get('/', (req, res) => {
  res.send('Server is running on http://localhost:4200');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});