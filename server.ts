import express from 'express';
import router from './routes/public';
import cors from 'cors';
const app = express();
app.use(cors());

app.use(express.json());

app.use('/', router);


app.listen(3000, () => {
    console.log("Server rodando");
});
