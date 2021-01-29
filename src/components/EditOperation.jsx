import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function EditOperation() {
    const { id } = useParams();
    const history = useHistory();

    const [typeOperation, setTypeOperation] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [concept, setConcept] = useState("");

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await axios.get(
                `http://localhost:4000/api/operations/${id}`
            );
            setTypeOperation(
                response.data.map((operation) => operation.operacion_tipo)
            );
            setAmount(
                response.data.map((operation) => operation.operacion_monto)
            );
            setDate(
                response.data.map((operation) =>
                    formatDate(operation.operacion_fecha)
                )
            );
            setCategory(
                response.data.map((operation) => operation.operacion_categoria)
            );
            setConcept(
                response.data.map((operation) => operation.operacion_concepto)
            );
        }
        fetchMyAPI();
    }, [id]);

    function formatDate(date) {
        let myDate = new Date(date),
            month = "" + (myDate.getMonth() + 1),
            day = "" + myDate.getDate(),
            year = myDate.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    const onChangeConcept = (e) => {
        setConcept(e.target.value);
    };

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
    };

    const onChangeAmount = (e) => {
        setAmount(e.target.value);
    };

    const onChangeDate = (e) => {
        setDate(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let response = await axios.put(
            `http://localhost:4000/api/operations/${id}`,
            {
                tipo: typeOperation,
                concepto: concept,
                monto: amount,
                fecha: date,
                categoria: category,
            }
        );
        alert(response.data.respuesta);
        history.push("/list");
    };

    return (
        <div className="container my-5">
            <div className="card card-body col-lg-8 mx-auto">
                <h4 className="pb-2 border-bottom text-center">
                    Modify Operation
                </h4>
                <form onSubmit={onSubmit}>
                    <div className="border-bottom mt-2">
                        <div className="form-group row ">
                            <label
                                htmlFor="inputTypeOperation"
                                className="col-sm-3 col-form-label"
                            >
                                Type:
                            </label>
                            <div className="col-sm-9">
                                <select
                                    id="inputTypeOperation"
                                    className="form-control"
                                    required
                                >
                                    {typeOperation.toString() === "Income" ? (
                                        <option value="Income">Income</option>
                                    ) : (
                                        <option value="Expenses">
                                            Expenses
                                        </option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="form-group row ">
                            <label
                                htmlFor="inputAmount"
                                className="col-sm-3 col-form-label"
                            >
                                Amount:
                            </label>
                            <div className="col-sm-9">
                                <input
                                    type="number"
                                    id="inputAmount"
                                    className="form-control"
                                    pattern="^[0-9]"
                                    min="1"
                                    value={amount}
                                    onChange={onChangeAmount}
                                    required
                                />
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
                                    required
                                >
                                    <option value="0" defaultValue></option>
                                    <option value="1">Foof</option>
                                    <option value="2">Service</option>
                                    <option value="3">Cleaning</option>
                                    <option value="4">Clothing</option>
                                    <option value="5">Salary</option>
                                    <option value="6">Others</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label
                                htmlFor="inputDate"
                                className="col-sm-3 col-form-label"
                            >
                                Date:
                            </label>
                            <div className="col-sm-9">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="inputDate"
                                    onChange={onChangeDate}
                                    value={date}
                                    required
                                ></input>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label
                                htmlFor="inputConcept"
                                className="col-sm-3 col-form-label"
                            >
                                Concept:
                            </label>
                            <div className="col-sm-9 ">
                                <textarea
                                    className="form-control"
                                    id="inputConcept"
                                    rows="2"
                                    value={concept}
                                    onChange={onChangeConcept}
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 d-flex flex-row-reverse">
                        <button className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
