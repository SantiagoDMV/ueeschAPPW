import style from "./SeccionInformacionPresentacion.module.css"

export default function SeccionInformacionPresentacion() {
  return (
    <div className={style.contenedorPresentacion}>
      <h3>¿Qué es la UEESCH?</h3>
        <p>
          {
// ¡Damos una cordial bienvenida en nombre de la Unidad Educativa Especializada Sordos de Chimborazo! Con un legado de 28 años, nuestro centro educativo ofrece una amplia gama de programas y servicios dedicados a la atención y desarrollo integral de nuestros estudiantes.
// Desde la estimulación temprana para los más pequeños hasta la educación general básica y media, brindamos un entorno inclusivo y enriquecedor. Además, nuestros bachilleratos técnicos en escultura y arte gráfico, junto con talleres en tarjetería, cerrajería, cerámica, manualidades y corte y confección, permiten a nuestros estudiantes explorar sus pasiones y habilidades creativas.
// Extendemos nuestro compromiso más allá del aula, ofreciendo albergue para aquellos provenientes de zonas rurales y otras provincias. Nuestra comunidad también se beneficia de servicios de audiometría, asegurando una atención integral para todos.
          }
          La Unidad Educativa Especializada Sordos de Chimborazo (UESESCH) es una institución educativa pública comprometida con la inclusión y el desarrollo de las personas sordas de la provincia. Brinda educación inicial, básica, media y superior para personas sordas, con el objetivo de que alcancen su máximo potencial.
        </p>
        <button
        onClick={() => (window.location.href = `/historia`)}>
        EXPLORA NUESTRA HISTORIA</button>
    </div> 
  )
}
