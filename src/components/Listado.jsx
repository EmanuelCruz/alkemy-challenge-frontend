import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Listado() {
    const [operaciones, setOperaciones] = useState([])
    const [tipoOperacion, setTipoOperacion] = useState("");
    const [categoria, setCategoria] = useState("0");

    useEffect(() => {
        async function fetchMyAPI() {
            let respuesta = await axios.get(
                `http://localhost:4000/api/operaciones`
            );
            setOperaciones(respuesta.data);
        }
        fetchMyAPI();
    }, []);

    const handleChangeTipoOperacion = (e) => {
        setTipoOperacion(e.target.value);
    };

    const handleChangeCategoria = (e) => {
        setCategoria(e.target.value);
    };

    const actualizarTabla = (e) => {
        e.preventDefault();
        async function fetchMyAPI() {

            if(tipoOperacion.length !== 0 && parseInt(categoria)  > 0) {
                console.log("los datos no son vacios")
                console.log(tipoOperacion.length,categoria);
                const operacion = `${tipoOperacion.toLowerCase()}s`;
                let respuesta = await axios.get(
                    `http://localhost:4000/api/${operacion}/${categoria}`
                );
                setOperaciones(respuesta.data);

            } else if(tipoOperacion.length === 0 && parseInt(categoria) === 0) {
                console.log("Los datos son vacios")
                console.log(tipoOperacion.length,categoria);
                let respuesta = await axios.get(
                    `http://localhost:4000/api/operaciones`
                );
                setOperaciones(respuesta.data);

            } else if(parseInt(categoria) === 0){
                console.log('La categoria es vacio');
                console.log(tipoOperacion.length,categoria);
                const operacion = `${tipoOperacion.toLowerCase()}s`;
                let respuesta = await axios.get(
                    `http://localhost:4000/api/${operacion}`
                );
                setOperaciones(respuesta.data);

            } else if (tipoOperacion.length === 0){
                console.log('El tipo de operacion es vacio');
                console.log(tipoOperacion.length,categoria);
                let respuesta = await axios.get(
                    `http://localhost:4000/api/operaciones/categoria/${categoria}`
                );
                setOperaciones(respuesta.data);

            }
        }
        fetchMyAPI();
    }

    const eliminarRegistro = (e) => {
        e.preventDefault();
        const id = e.target.id
        //Borro registro de la Base de datos
        async function fetchMyAPI() {
            await axios.delete(
                `http://localhost:4000/api/operaciones/${id}`
            );
        }
        let newOperaciones = operaciones.filter(operacion => operacion.id_operacion !== Number(id))
        setOperaciones(newOperaciones)
        fetchMyAPI();
    }

    return (
        <div className="container ">
            <div className="col-lg-8 mx-auto my-5">
                <form >
                    <div className="border-bottom mt-2 mx-auto">
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
                                >
                                    <option value="" defaultValue></option>
                                    <option value="Ingreso">Ingreso</option>
                                    <option value="Egreso">Egreso</option>
                                </select>
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
                    </div>
                    <div className="mt-3 d-flex flex-row-reverse">
                        <button onClick={actualizarTabla} className="btn btn-primary">Buscar</button>
                    </div>
                </form>
            </div>

            <div className="container">
                <table className="table table-striped table-bordered rounded col-lg-8 mx-auto text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Monto</th>
                            <th scope="col">Fecha</th>
                            <th scope="col" className="w-25">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {operaciones.map((operacion, index) => (
                            <tr key={operacion.id_operacion}>
                                {/* <th scope="row">{index + 1}</th> */}
                                <th scope="row">{operacion.id_operacion}</th>
                                <td key={operacion.id_operacion}>
                                    {operacion.operacion_tipo}
                                </td>
                                <td>{operacion.operacion_monto}</td>
                                <td>{operacion.operacion_fecha.slice(0, 10)}</td>
                                <td>
                                    <button type="button" className="btn btn-info btn-sm mr-2">Modificar</button>
                                    <button type="button" className="btn btn-danger btn-sm" onClick={eliminarRegistro} id={operacion.id_operacion}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
