import { useState, useCallback, useEffect } from "react";

import CBarChart from "./CBarChart";
import "./App.css";
import { fetchGet } from "./utils/Fetch";
import { TipoDeGeneracion, TipoDePlanta, sirtData } from "./interfaces/sitr";
import { DataCBarChart } from "./interfaces/cBarChart";

function App() {
  const [tipoDeGeneracion, setTipoDeGeneracion] =
    useState<TipoDeGeneracion[]>();
  const [tipoDePlanta, setTipoDePlanta] = useState<TipoDePlanta[]>();
  const [fecha, setFecha] = useState("");
  const [automatico, setAutomatico] = useState(false);

  const getApi = useCallback(async () => {
    let response: sirtData = await fetchGet("http://3.133.113.39/sitr");
    if (response) {
      setTipoDeGeneracion(response.TipoDeGeneracion);
      setTipoDePlanta(response.TipoDePlanta);
      setFecha(response.Fecha);
    }
  }, []);

  useEffect(() => {
    const getApiEffecta = async () => {
      await getApi();
    };
    getApiEffecta();
  }, []);
  const convertirDatosTipoDeGeneracion = useCallback((): DataCBarChart[] => {
    return tipoDeGeneracion?.map((item) => {
      return {
        ...item,
        fill: item.color,
      };
    }) ?? [];
  }, [tipoDeGeneracion]);

  const convertirTipoDePlanta = useCallback((): DataCBarChart[] => {
    return tipoDePlanta?.map((item) => {
      return {
        ...item,
        fill: item.color,
      };
    })?? [];;
  }, [tipoDePlanta]);

  useEffect(() => {
    let intervalId: any;

    const fetchData = async () => {
      await getApi();
    };

    const startInterval = () => {
      intervalId = setInterval(fetchData, 60000); // Intervalo de 1 minuto
    };

    const stopInterval = () => {
      clearInterval(intervalId);
    };

    if (automatico) {
      startInterval();
    } else {
      stopInterval();
    }

    return () => {
      stopInterval(); // Detener el intervalo al desmontar el componente
    };
  }, [automatico, getApi]);

  const getAutomatico = useCallback(() => {
    setAutomatico(!automatico);
  }, []);

  return (
    <div className="container-fluid">
      <div className="text-center">
        <label>Datos SITR-Generacion {fecha}</label>
        <div>
          <button className="btn btn-info me-5" onClick={getApi}>
            Actualizar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={getAutomatico}
          >
            Automatico{" "}
            {automatico ? "Activo (actualizacion por minuto)" : "Inactivo"}
          </button>
        </div>
      </div>
      <div className="row center">
        <div className="col-md-5  d-flex flex-wrap flex-column justify-content-end align-items-center">
          <div className="text-center">
            <label>Tipo de Planta</label>
          </div>
          <div>
            <CBarChart
              width={600}
              height={400}
              data={convertirTipoDePlanta()}
            />
          </div>
        </div>
        <div className="col-md-7 ">
          <div className="text-center">
            <label>Tipo de Generacion</label>
          </div>
          <div>
            <CBarChart
              width={1000}
              height={500}
              data={convertirDatosTipoDeGeneracion()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
