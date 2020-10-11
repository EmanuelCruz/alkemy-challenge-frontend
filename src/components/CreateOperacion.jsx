import axios from 'axios';
import React, { useState } from 'react'

export default function CreateOperacion() {
    const [tipoOperacion, setTipoOperacion] = useState("");
    const [monto, setMonto] = useState(0);
    const [fecha, setFecha] = useState("");
    const [categoria, setCategoria] = useState("");
    const [concepto, setConcepto] = useState("");

    const onChangeConcepto = (e) => {
        setConcepto(e.target.value);
    };

    const handleChangeCategoria = (e) => {
        setCategoria(e.target.value);
    };

    const handleChangeTipoOperacion = (e) => {
        setTipoOperacion(e.target.value);
    };

    const onChangeMonto = (e) => {
        setMonto(e.target.value);
    };

    const onChangeFecha = (e) => {
        setFecha(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let resp = await axios.post(`http://localhost:4000/api/operaciones`, {
            tipo: tipoOperacion,
            concepto: concepto,
            monto: monto,
            fecha: fecha,
            categoria: categoria
        });
        alert(resp.data.respuesta)
    };

    return (
        <div className="container my-5">
            <div className="card card-body col-lg-8 mx-auto">
                <h4 className="pb-2 border-bottom text-center">Crear Operación</h4>
                <form onSubmit={onSubmit}>
                    <div className="border-bottom mt-2">

                        <div className="form-group row ">
                            <label
                                htmlFor="inputTipoOperacion"
                                className="col-sm-3 col-form-label"
                            >
                                Tipo:
                            </label>
                            <div className="col-sm-9">
                                <select
                                    id="inputTipoOperacion"
                                    className="form-control"
                                    value={tipoOperacion}
                                    onChange={handleChangeTipoOperacion}
                                    required
                                >
                                    <option value="" defaultValue></option>
                                    <option value="Ingreso">Ingreso</option>
                                    <option value="Egreso">
                                        Egreso
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row ">
                            <label htmlFor="inputMonto" className="col-sm-3 col-form-label">
                                Monto:
                            </label>
                            <div className="col-sm-9">
                                <input
                                    type="number"
                                    id="inputMonto"
                                    className="form-control"
                                    pattern="^[0-9]"
                                    min="1"
                                    placeholder=""
                                    onChange={onChangeMonto}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row ">
                            <label
                                htmlFor="inputCategoria"
                                className="col-sm-3 col-form-label"
                            >
                                Categoría:
                            </label>
                            <div className="col-sm-9">
                                <select
                                    id="inputCategoria"
                                    className="form-control"
                                    value={categoria}
                                    onChange={handleChangeCategoria}
                                    required
                                >
                                    <option value="0" defaultValue></option>
                                    <option value="1">Comida</option>
                                    <option value="2">Servicio</option>
                                    <option value="3">Limpieza</option>
                                    <option value="4">Ropa</option>
                                    <option value="5">Sueldo</option>
                                    <option value="6">Otros</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="inputFecha" className="col-sm-3 col-form-label">
                                Fecha:
                            </label>
                            <div className="col-sm-9">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="inputFecha"
                                    onChange={onChangeFecha}
                                    required
                                ></input>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label
                                htmlFor="inputConcepto"
                                className="col-sm-3 col-form-label"
                            >
                                Concepto:
                            </label>
                            <div className="col-sm-9 ">
                                <textarea
                                    className="form-control"
                                    id="inputConcepto"
                                    rows="2"
                                    onChange={onChangeConcepto}
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 d-flex flex-row-reverse">
                        <button className="btn btn-primary">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
