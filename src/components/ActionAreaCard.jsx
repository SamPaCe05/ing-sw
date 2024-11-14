import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Timestamp } from "firebase/firestore";  
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard({ nombreClase, fechaCreacion, onClick }) {
  const fecha = Timestamp.fromDate(new Date());

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={onClick}> 
        <CardMedia
          component="img"
          height="140"
          image="https://www.freecodecamp.org/news/content/images/2022/12/main-image.png"
          alt="class"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nombreClase}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {fecha.toDate().toLocaleDateString('es-ES')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
