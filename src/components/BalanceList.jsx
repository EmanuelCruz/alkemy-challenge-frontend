import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BalanceList() {
    const [operaciones, setOperaciones] = useState([]);

    useEffect(() => {
        async function fetchMyAPI() {
            let filas = 10;
            let respuesta = await axios.get(
                `http://localhost:4000/api/operaciones/recientes/${filas}`
            );
            setOperaciones(respuesta.data);
        }
        fetchMyAPI();
    }, []);

    return (
        <div className="container">
            <table className="table table-striped table-bordered rounded col-lg-8 mx-auto text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {operaciones.map((operacion, index) => (
                        <tr key={operacion.id_operacion}>
                            <th scope="row">{index + 1}</th>
                            <td key={operacion.id_operacion}>{operacion.operacion_tipo}</td>
                            <td>{operacion.operacion_monto}</td>
                            <td>{operacion.operacion_fecha.slice(0, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
