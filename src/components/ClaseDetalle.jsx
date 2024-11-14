import React from 'react'
import { useParams } from 'react-router-dom';
function ClaseDetalle() {
    const { id } = useParams(); 
  
  
    return (
      <div>
        <h1>Detalle de la Clase</h1>
        <p>ID de la clase: {id}</p>
      </div>
    );
  }
  
  export default ClaseDetalle;