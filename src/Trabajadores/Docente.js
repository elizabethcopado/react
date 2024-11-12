import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../App.css';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);

  const fetchClientes = async () => {
    try {
      const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
    const intervalId = setInterval(fetchClientes, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(intervalId);
  }, []);

  // Colores para cada barra
  const colores = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)',
    'rgba(99, 255, 132, 0.7)'
  ];

  // Datos para la gráfica
  const data = {
    labels: clientes.map((cliente) => `ID ${cliente.id}`),  // Los ID de los clientes
    datasets: [
      {
        label: 'IDs de Clientes',
        data: clientes.map((cliente) => cliente.id),  // Usar el ID de cada cliente
        backgroundColor: clientes.map((_, index) => colores[index % colores.length]), // Cambia el color de cada barra
        borderColor: clientes.map((_, index) => colores[index % colores.length].replace('0.7', '1')), // Color de bordes con opacidad completa
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {/* Título centrado con fondo negro */}
      <h1 className="title">CLIENTES INGENIERÍA INFORMÁTICA TESSFP</h1>

      {/* Tarjetas de clientes con estilo fresco */}
      <div className="clientes-container">
        {clientes.map((cliente) => (
          <div className="cliente-card" key={cliente.id}>
            <h3>ID: {cliente.id}</h3>
            <p><strong>Nombre:</strong> {cliente.nombre}</p>
            <p><strong>Teléfono:</strong> {cliente.telefono}</p>
            <p><strong>Sexo:</strong> {cliente.sexo}</p>
          </div>
        ))}
      </div>

      {/* Gráfica */}
      <div>
        <h2>Gráfica de IDs de Clientes</h2>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default ListaClientes;
