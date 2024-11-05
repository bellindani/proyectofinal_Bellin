console.log(datos);
const niveldeventas = {
    'Ventas deseadas': { min: 300000, max: 1000000 },
    'Ventas aceptables': { min: 200000, max: 299000 },
    'Ventas bajas': { min: 5000, max: 199000 }
};
const contenedorAlertas = document.getElementById('alertasResultados');
document.getElementById("consultar").addEventListener("click", () => {
    const productoSeleccionado = document.getElementById("resumenventa").value;
    const fechaSeleccionada = document.getElementById("fechaVenta").value;

    // Filtra los datos según el producto y la fecha seleccionados
    const datosFiltrados = datos.filter(datos => 
        (productoSeleccionado === "Todos los productos" || datos.producto === productoSeleccionado) &&
        (fechaSeleccionada === "Todos los años" || datos["fecha-venta"] === fechaSeleccionada)
    );

    if (datosFiltrados.length === 0) {
        document.getElementById("alertasResultados").innerText = "No se encontraron resultados para la selección.";
        return;
    } else {
        document.getElementById("alertasResultados").innerText = "";
    }

    // Extrae los datos de etiquetas y montos para el gráfico
    const etiquetas = datosFiltrados.map(datos => `${datos.producto} - ${datos["fecha-venta"]}`);
    const montos = datosFiltrados.map(datos => parseFloat(datos.monto.replace("$", "")));

    // Configuración del gráfico
    const ctx = document.getElementById("graficoresumendeventa").getContext("2d");
    
    // Quita el gráfico anterior (si existe) antes de crear uno nuevo
    if (window.miGrafico) {
        window.miGrafico.destroy();
    }

    window.miGrafico = new Chart(ctx, {
        type: "bar",
        data: {
            labels: etiquetas,
            datasets: [{
                label: "Montos de ventas",
                data: montos,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)"
                ],
                borderColor: "rgba(255, 255, 255, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => `Monto: $${tooltipItem.raw.toLocaleString()}`
                    }
                }
            }
        }
    });
    function checkNivelVentas(monto) {
        const rango = niveldeventas[monto];
    
        if (monto < 5000) {
            console.log (monto);
            return 'baja';
        } else if (monto > rango.max) {
            return 'deseada';
        } else {
            return 'aceptable';
        }
    }
    
    function putAlert(producto, monto, fechaVenta) {
        // Se está creando un div en el HTML para insertar el alerta
        const alerta = document.createElement('div');
        alerta.classList.add('alert', 'alert-warning');
        alerta.role = 'alert';
        alerta.innerHTML = `El monto de venta del producto <strong>${producto}</strong> de fecha <strong>${fechaVenta}</strong>  es <strong>${monto}</strong>, lo cual es bajo`;
    
    // Se inserta el alerta en el HTML
        contenedorAlertas.appendChild(alerta);
    }
    function clearAlertas() {
        contenedorAlertas.innerHTML = '';
    }
    // const productoSeleccionado = document.getElementById("resumenventa").value;
    const ps= productoSeleccionado.value;
    //Leer la estructura de datos por producto
    const nivelventaproducto = datos.filter(datosv => datosv.producto === ps);
    
    let nivelresumenventa = [];


    clearAlertas();

        const nivel = nivelresumenventa.map(datosv => {
        const nivel_venta = checkNivelVentas(datosv.monto);
        console.log("este es el valor de nivel venta", nivel_venta);
        // Si el resultado está fuera de rango, agregar una alerta, se activa la alerta dinámica
        if (nivel_venta == 'baja') {
            putAlert(datosv.producto, datosv.monto, datosv.fecha-venta);
        }
    
        return datosv;
    });
    
});

