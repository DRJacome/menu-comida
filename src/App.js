import { useState } from "react";
import { PRODUCTOS } from "./datos";

function App() {
  const [existencias, setExistencias] = useState(PRODUCTOS)
  const [presupuesto, setPresupuesto] = useState(25)
  const [info, setInfo] = useState("")
  const [COMPRA, setCOMPRA] = useState([])
  const [total, setTotal] = useState(0)

  function buscar(producto) {
    let idProducto = producto.target.id
    return existencias.findIndex(valor => valor.id == idProducto)
  }

  function devolver(producto) {
    let idProducto = producto.target.id
    let index = existencias.findIndex(valor => valor.id == idProducto)
    setExistencias(existencias.map((valor, indice) =>
      indice === index ? { ...valor, disponible: true } : valor
    ))
    setPresupuesto(presupuesto + existencias[index].precio)
    setCOMPRA(COMPRA.filter(valor => valor != idProducto))
    limpiar()
    setTotal(total - existencias[index].precio)
  }

  function conocer(producto) {
    let idProducto = buscar(producto)
    let nombre = existencias[idProducto].nombre
    let precio = existencias[idProducto].precio
    setInfo(<span>Coste de {nombre}: <strong>{precio} €</strong></span>)
  }

  function limpiar() {
    setInfo("")
  }

  function comprar(producto) {
    let idProducto = buscar(producto)
    setExistencias(existencias.map((valor, indice) =>
      indice === idProducto ? { ...valor, disponible: false } : valor
    ))
    setCOMPRA([...COMPRA, existencias[idProducto].id])
    setPresupuesto(presupuesto - existencias[idProducto].precio)
    setTotal(total + existencias[idProducto].precio)
  }

  return (
    <>
      <h1>Escoge tu menú:</h1>
      <section className="contenedor">
        <div className="productos">
          {
            existencias
              .filter((valor) => valor.disponible === true && valor.precio <= presupuesto)
              .map((valor) =>
                <div key={valor.id} className="producto">
                  <img
                    id={valor.id}
                    onMouseEnter={conocer}
                    onMouseLeave={limpiar}
                    onClick={comprar}
                    src={"img/" + valor.imagen} alt={valor.nombre} />
                </div>
              )
          }
        </div>
      </section>
      <section className="dinero">
        <div className="presupuesto">Saldo actual: <strong>{presupuesto} €</strong>
        </div>
        <div className="info">
          {info}
        </div>
      </section>
      <section className="carrito">
        {
          COMPRA.map(valor =>
            /* let indice = PRODUCTOS.findIndex(articulo => articulo.id == valor) */
            <div className="producto" key={valor}>
              <img id={existencias[existencias.findIndex(existencia => existencia.id === valor)].id}
                onMouseEnter={conocer}
                onMouseLeave={limpiar}
                onClick={devolver}
                src={require('../public/img/' + existencias[existencias.findIndex(existencia => existencia.id === valor)].imagen)} alt="" />
            </div>)
        }
      </section>
      <section className="nota">
        <img src="./img/logo.webp" alt="logo" />
        <div className="lista">
          {COMPRA.map(valor =>
            < div className="linea" key={valor}>
              <div className="columna1">{existencias[existencias.findIndex(articulo => articulo.id === valor)].nombre}</div>
              <div className="columna2">{existencias[existencias.findIndex(articulo => articulo.id === valor)].precio} €</div>
            </div>
          )}
          <div className="total">
            <h3>Total a pagar: {total} €</h3>
          </div>
        </div>
      </section>
      <footer>
        <p>Idea original: Javier López JAB</p>
      </footer>
    </>
  );
}

export default App;
