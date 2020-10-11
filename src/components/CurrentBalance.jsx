import React, { useEffect, useState} from 'react'
import axios from "axios";

export default function CreateOperacion() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchMyAPI() {
      let respuesta = await axios.get(
        `http://localhost:4000/api/operaciones/balance`
      );
      setTotal(respuesta.data[0].balance);
    }
    fetchMyAPI();
  }, []);

  return (
    <div className="container my-5 ">
      <div className="card card-body col-lg-8 mx-auto text-center text-white bg-primary">
          <p className="font-weight-bold h1 ">$ {total}</p>
          <p className="font-weight-light border-top mb-0 pt-2">Balance Actual</p>
      </div>
    </div>
  );
}