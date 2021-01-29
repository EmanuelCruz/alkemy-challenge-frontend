import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function List() {
    const [operations, setOperations] = useState([]);
    const [typeOperation, setTypeOperation] = useState("");
    const [category, setCategory] = useState("0");

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await axios.get(
                `http://localhost:4000/api/operations`
            );
            setOperations(response.data);
        }
        fetchMyAPI();
    }, []);

    const handleChangeTypeOperation = (e) => {
        setTypeOperation(e.target.value);
    };

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
    };

    const updateTable = (e) => {
        e.preventDefault();
        async function fetchMyAPI() {
            if (typeOperation.length !== 0 && parseInt(category) > 0) {
                const operation = `${typeOperation.toLowerCase()}`;
                let response = await axios.get(
                    `http://localhost:4000/api/${operation}/${category}`
                );
                setOperations(response.data);
            } else if (typeOperation.length === 0 && parseInt(category) === 0) {
                let response = await axios.get(
                    `http://localhost:4000/api/operations`
                );
                setOperations(response.data);
            } else if (parseInt(category) === 0) {
                const operation = `${typeOperation.toLowerCase()}`;
                let response = await axios.get(
                    `http://localhost:4000/api/${operation}`
                );
                setOperations(response.data);
            } else if (typeOperation.length === 0) {
                let response = await axios.get(
                    `http://localhost:4000/api/operations/category/${category}`
                );
                setOperations(response.data);
            }
        }
        fetchMyAPI();
    };

    const deleteOperation = (e) => {
        e.preventDefault();
        const id = e.target.id;
        //Borro registro de la Base de datos
        async function fetchMyAPI() {
            await axios.delete(`http://localhost:4000/api/operations/${id}`);
        }
        let newOperations = operations.filter(
            (operation) => operation.id_operacion !== Number(id)
        );
        setOperations(newOperations);
        fetchMyAPI();
    };

    return (
        <div className="container ">
            <div className="col-lg-8 mx-auto my-5">
                <form>
                    <div className="border-bottom mt-2 mx-auto">
                        <div className="form-group row ">
                            <label
                                htmlFor="inputTipoOperation"
                                className="col-sm-3 col-form-label"
                            >
                                Type:
                            </label>
                            <div className="col-sm-9">
                                <select
                                    id="inputTipoOperation"
                                    className="form-control"
                                    value={typeOperation}
                                    onChange={handleChangeTypeOperation}
                                >
                                    <option value="" defaultValue></option>
                                    <option value="Income">Income</option>
                                    <option value="Expenses">Expenses</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row ">
                            <label
                                htmlFor="inputCategory"
                                className="col-sm-3 col-form-label"
                            >
                                Category:
                            </label>
                            <div className="col-sm-9">
                                <select
                                    id="inputCategory"
                                    className="form-control"
                                    value={category}
                                    onChange={handleChangeCategory}
                                >
                                    <option value="0" defaultValue></option>
                                    <option value="1">Food</option>
                                    <option value="2">Service</option>
                                    <option value="3">Cleaning</option>
                                    <option value="4">Clothing</option>
                                    <option value="5">Salary</option>
                                    <option value="6">Others</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 d-flex flex-row-reverse">
                        <button
                            onClick={updateTable}
                            className="btn btn-primary"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>

            <div className="container">
                <table className="table table-striped table-bordered rounded col-lg-8 mx-auto text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Type</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date</th>
                            <th scope="col" className="w-25">
                                Actions
                            </th>
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
                                <td>
                                    {operation.operacion_fecha.slice(0, 10)}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-info btn-sm mr-2 p-1"
                                    >
                                        <Link
                                            className="nav-link p-1"
                                            to={`/operation/${operation.id_operacion}`}
                                        >
                                            Modify
                                        </Link>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm p-2"
                                        onClick={deleteOperation}
                                        id={operation.id_operacion}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
