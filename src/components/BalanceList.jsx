import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BalanceList() {
    const [operations, setOperations] = useState([]);

    useEffect(() => {
        async function fetchMyAPI() {
            let rows = 10;
            let response = await axios.get(
                `http://localhost:4000/api/operations/recent/${rows}`
            );
            setOperations(response.data);
        }
        fetchMyAPI();
    }, []);

    return (
        <div className="container">
            <table className="table table-striped table-bordered rounded col-lg-8 mx-auto text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {operations.map((operation, index) => (
                        <tr key={operation.id_operacion}>
                            <th scope="row">{index + 1}</th>
                            <td key={operation.id_operacion}>
                                {operation.operacion_tipo}
                            </td>
                            <td>{operation.operacion_monto}</td>
                            <td>{operation.operacion_fecha.slice(0, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
