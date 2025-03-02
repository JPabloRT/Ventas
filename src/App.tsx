import React, { useState } from 'react';
import './styles.css';

// Datos de familias y productos
const FAMILIAS = [
  'MANTEQUILLA',
  'MARGARINA',
  'CREMA VEGETAL',
  'QUESO LIQUIDO PARA NACHOS',
  'QUESO AMARILLO GRANEL',
  'QUESO REBANADO EN PAQUETES',
  'YOGHURT EN BOLSA',
  'YOGHURT PARA BEBER',
  'BEBIDA EN CARTON',
  'BEBIDAS LACTEAS',
  'SALSAS',
];

const PRODUCTOS_POR_FAMILIA: {
  [key: string]: { nombre: string; precio: number }[];
} = {
  MANTEQUILLA: [
    {
      nombre: 'CHIPILO MANTEQUILLA SIN SAL 90g SIN SAL VEZADINI',
      precio: 18.0,
    },
    { nombre: 'CHIPILO MANTEQUILLA SIN SAL 225g', precio: 43.5 },
    { nombre: 'CHIPILO MANTEQUILLA SIN SAL 500g', precio: 109.0 },
    { nombre: 'CHIPILO MANTEQUILLA SIN SAL 1kg', precio: 193.5 },
  ],
  MARGARINA: [
    { nombre: 'DEL RANCHO MARGARINA UNTABLE TINA 190 Grs.', precio: 25.0 },
    { nombre: 'MARGARINA DEL RANCHO S/sal 90gRS.', precio: 8.5 },
  ],
  'CREMA VEGETAL': [
    { nombre: 'GINA CREMA VEGETAL 1kg', precio: 28.0 },
    { nombre: 'DEL RANCHO CREMA DE 40ml', precio: 22.0 },
    { nombre: 'DEL RANCHO CREMA DE 900ml', precio: 42.4 },
    { nombre: 'DEL RANCHO CREMA DE 4kg', precio: 172.0 },
    { nombre: 'CHIPILO CREMA NATURAL', precio: 8.5 },
  ],
  'QUESO LIQUIDO PARA NACHOS': [
    { nombre: 'DEL RANCHO QUESO LIQUIDO DE 500g', precio: 18.0 },
    { nombre: 'DEL RANCHO QUESO LIQUIDO DE 1kg', precio: 31.0 },
  ],
  'QUESO AMARILLO GRANEL': [
    { nombre: 'LE CASTELL Q REB.GRANEL AMAR.1.8kg PAQ/CELOFAN', precio: 115.0 },
    { nombre: 'DEL RANCHO QUESO AMERICANO 1.8kg', precio: 118.0 },
    { nombre: 'CHIPILO Q. REB. GRANEL AMAR. 1.8kg', precio: 154.0 },
    { nombre: 'CHIPILO DUO PACK QUESO IMITACION TIPO A', precio: 36.0 },
  ],
  'QUESO REBANADO EN PAQUETES': [
    { nombre: 'DEL RANCHO QUESO AMERICANO 126gr', precio: 11.0 },
    { nombre: 'REB. CHIPILO AMERICANO PAQ.8 REB. 144gr', precio: 22.0 },
    { nombre: 'CHIPILO QUESO REBANADO PAQUETE MANCHEGO 144gr', precio: 22.0 },
    { nombre: 'CHIPILO QUESO CREMA 144-24 Pz.', precio: 22.0 },
  ],
  'YOGHURT EN BOLSA': [
    { nombre: 'BONYUR YOGHURT BOLSA FRESA 20/100g', precio: 60.0 },
    { nombre: 'BONYUR YOGHURT BOLSA PIÑACOCO 20/100g', precio: 60.0 },
    { nombre: 'BONYUR YOGHURT BOLSA DURAZNO 20/100g', precio: 60.0 },
  ],
  'YOGHURT PARA BEBER': [
    { nombre: 'BONYUR YOGHURT PIÑACOCO 450g', precio: 15.5 },
    { nombre: 'BONYUR YOGHURT FRESA 450g', precio: 15.5 },
    { nombre: 'BONYUR YOGHURT NUEZ-CEREALES 450g', precio: 15.5 },
    { nombre: 'BONYUR YOGHURT DURAZNO 450g', precio: 15.5 },
  ],
  'BEBIDA EN CARTON': [
    { nombre: 'BONALIFE NARANJADA 600ml', precio: 14.0 },
    { nombre: 'BONALIFE NARANJADA 900ml', precio: 17.0 },
  ],
  'BEBIDAS LACTEAS': [
    { nombre: 'XCULT PRODUCTO LAC FER 5/80ml', precio: 24.0 },
  ],
  SALSAS: [
    { nombre: 'DON BETO SALSA CHILE MORITA 250ml', precio: 16.0 },
    { nombre: 'DON BETO SALSA VERDE ASADA 250ml', precio: 16.0 },
    { nombre: 'DON BETO SALSA HABANERO 250ml', precio: 16.0 },
    { nombre: 'DON BETO SALSA ARBOL ASADA 250ml', precio: 16.0 },
    { nombre: 'DON BETO SALSA CACAHUATE 250ml', precio: 16.0 },
    { nombre: 'DON BETO SALSA ARBOL TAQUERA 250ml', precio: 16.0 },
    { nombre: 'CULINARIA SALSA LA SUMISA 80g', precio: 18.0 },
    { nombre: 'CULINARIA SALSA LA TRAICIONERA 80g', precio: 18.0 },
    { nombre: 'CULINARIA SALSA LA INCONDICIONAL 80g', precio: 18.0 },
    { nombre: 'CULINARIA SALSA LA BIPOLAR 80g', precio: 18.0 },
  ],
};

const App: React.FC = () => {
  const [cantidades, setCantidades] = useState<{ [key: string]: number }>({});
  const [total, setTotal] = useState(0);
  const [productosSeleccionados, setProductosSeleccionados] = useState<
    {
      familia: string;
      nombre: string;
      precio: number;
      cantidad: number;
      total: number;
    }[]
  >([]);
  const [ventaID] = useState(() => Date.now()); // ID de venta basado en el timestamp actual

  const calcularTotal = () => {
    let nuevoTotal = 0;
    const productos = [];
    for (const familia of FAMILIAS) {
      for (const producto of PRODUCTOS_POR_FAMILIA[familia] || []) {
        const cantidad = cantidades[producto.nombre] || 0;
        const totalProducto = cantidad * producto.precio;
        if (cantidad > 0) {
          productos.push({
            familia,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad,
            total: totalProducto,
          });
        }
        nuevoTotal += totalProducto;
      }
    }
    setProductosSeleccionados(productos);
    setTotal(nuevoTotal);
  };

  const limpiarCeldas = () => {
    setCantidades({});
    setTotal(0);
    setProductosSeleccionados([]);
  };

  const handleCantidadChange = (nombre: string, value: string) => {
    const cantidad = parseInt(value, 10) || 0;
    setCantidades({ ...cantidades, [nombre]: cantidad });
  };

  const exportarCSV = () => {
    const header = [
      'CONCEPTOS EMPRESARIALES DE DESARROLLO S.A. DE C.V',
      'NOTA DE VENTA',
      'TEL. 55 5865-1617',
      '01800 714 8399 01800 696 4416 01800 822 8350',
      '',
      `ID de Venta: ${ventaID}`,
      '',
    ];

    const columns = ['Familia', 'Producto', 'Cantidad', 'Precio', 'Total'];

    const rows = productosSeleccionados.map((producto) => [
      producto.familia,
      producto.nombre,
      producto.cantidad,
      producto.precio.toFixed(2),
      producto.total.toFixed(2),
    ]);

    // Crear el contenido CSV como un array de strings
    const csvContent = [
      ...header,
      columns.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    // Crear un Blob de tipo text/csv
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Crear un enlace de descarga y simular un clic
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `venta_${ventaID}.csv`;
    link.click();
  };

  return (
    <div className="app">
      <h1>Nota de Venta</h1>
      <div className="productos">
        {FAMILIAS.map((familia) => (
          <div key={familia} className="familia">
            <h2>{familia}</h2>
            <div className="producto-lista">
              {(PRODUCTOS_POR_FAMILIA[familia] || []).map((producto) => (
                <div key={producto.nombre} className="producto">
                  <span>{producto.nombre}</span>
                  <span>${producto.precio.toFixed(2)}</span>
                  <input
                    type="number"
                    min="0"
                    value={cantidades[producto.nombre] || ''}
                    onChange={(e) =>
                      handleCantidadChange(producto.nombre, e.target.value)
                    }
                    onFocus={(e) => e.target.select()}
                    placeholder="Cantidad"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
      <div className="botones">
        <button onClick={calcularTotal}>Calcular Total</button>
        <button onClick={limpiarCeldas}>Limpiar</button>
      </div>
      {productosSeleccionados.length > 0 && (
        <div className="tabla">
          <table>
            <thead>
              <tr>
                <th>Familia</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {productosSeleccionados.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.familia}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad}</td>
                  <td>${producto.precio.toFixed(2)}</td>
                  <td>${producto.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={exportarCSV}>Descargar CSV</button>
        </div>
      )}
    </div>
  );
};

export default App;
