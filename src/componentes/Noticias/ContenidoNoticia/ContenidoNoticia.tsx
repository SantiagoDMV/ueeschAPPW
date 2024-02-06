import estilos from "./ContenidoNoticia.module.css";
import { useState, useEffect } from "react";
import estilosOpciones from '../OpcionesElementos/OpcionesElementos.module.css'
import { iconoCerrarBasico,iconoBasuraBasico } from "@/constantes/iconos";
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react'
import axios from 'axios'

type Elemento = {
  id: number;
  tipo: string;
  contenido: string;
};

type Imagen = {
  id: number;
  nombre: string;
  archivo: File;
};

type ContenidoJSON = Elemento[];
type ImagenesParaGuardar = Imagen[];

let elementsDivFuera: JSX.Element[] = [];
let elementosJSON: ContenidoJSON = [];
let imagenesParaGuardar: ImagenesParaGuardar = [];

export default function ContenidoNoticia({ elemento, setElemento }: any) {
  const [numElemento, setNumElemento] = useState<number>(1);

  useEffect(() => {
    if (elemento) {
      const idElemento = `elemento_${numElemento}`;
      const contenido = "...";

      const nuevoElemento: Elemento = {
        id: numElemento,
        tipo: elemento,
        contenido: contenido,
      };

      if(elemento !== 'button' && elemento !== 'img'){
        elementosJSON.push(nuevoElemento);
        setNumElemento((prevNumElemento) => prevNumElemento + 1);
      }

      switch (elemento) {
        case "h1":
          elementsDivFuera.push(
            <h1
              onClick={(e) => crearOpciones(e)}
              onInput={(e) => cambioContenido(e, numElemento)}
              className={estilos.elementoCreado}
              key={numElemento}
              id={`elemento_${numElemento}`}
              contentEditable={true}
              suppressContentEditableWarning={true}
            >
              ...
            </h1>,
          )
          break;
        case "h3":
          elementsDivFuera.push(  
            <h3
              onClick={(e) => crearOpciones(e)}
              onInput={(e) => cambioContenido(e, numElemento)}
              className={estilos.elementoCreado}
              key={numElemento}
              id={`elemento_${numElemento}`}
              contentEditable={true}
              suppressContentEditableWarning={true}
            >
              ...
            </h3>,
          );
          break;
        case "p":
          elementsDivFuera.push(  
            <p
              onClick={(e) => crearOpciones(e)}
              onInput={(e) => cambioContenido(e, numElemento)}
              className={estilos.elementoCreado}
              key={numElemento}
              id={`elemento_${numElemento}`}
              contentEditable={true}
              suppressContentEditableWarning={true}
            >
              ...
            </p>,
          );
          break;
        case 'img': 
          elementsDivFuera.push(  
            <input 
              key={numElemento}
              type="file"
              accept="image/*"
              onChange={(e:any) => guardarImagen(e)}
            />
          );
          break;
        case 'button':
          enviarDatos();
          break;
        default:
          break;
      }
      setElemento(null);
    }
  }, [elemento, setElemento, numElemento]);

  const guardarImagen = (event: any) => {
    const archivoSeleccionado = event.target.files[0];
  
    if (archivoSeleccionado) {
      if (archivoSeleccionado.type.startsWith('image/')) {
        const nuevaImagen: Imagen = {
          id: numElemento,
          nombre: archivoSeleccionado.name,
          archivo: archivoSeleccionado,
        };
  
        imagenesParaGuardar.push(nuevaImagen);
  
        console.log('imagenesParaGuardar después de agregar la imagen:', imagenesParaGuardar);
      } else {
        console.log('Por favor, selecciona un archivo de imagen.');
      }
    }
  };
  
  const enviarDatos = async () => {
    try {
      const form = new FormData()
      form.set('file',imagenesParaGuardar[0].archivo)
      await fetch('/api/noticias', {
        method: "POST",
        body: form
      })
      
      console.log("Datos enviados exitosamente.");
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };
  
  const actualizarElementos = (id: number, nuevoContenido: string) => {
    elementosJSON = elementosJSON.map((el) =>
      el.id === id ? { ...el, contenido: nuevoContenido } : el
    );
  
    // Actualizar elementsDivFuera
    elementsDivFuera = elementsDivFuera.map((element) => {
      if (element.key === id.toString()) {
        return React.cloneElement(element, { children: nuevoContenido });
      }
      return element;
    });
  
    // Imprimir en la consola para verificar
     console.log("elementosJSON después del cambio:", JSON.stringify(elementosJSON, null, 2));
    console.log("elementsDivFuera después del cambio:", elementsDivFuera);
  };

  
  const cambioContenido = (e: any, id: number) => {
    const nuevoContenido = e.currentTarget.textContent || "";
    actualizarElementos(id, nuevoContenido);
  };


  const crearOpciones = (e: any) => {
    const numElemento = e.currentTarget.id ? parseInt(e.currentTarget.id.split("_")[1]) : 0;
    let x = e.pageX
    let y = e.pageY
  
    if (document.getElementById("opciones")) {
      document.getElementById("opciones")?.remove();
    }
  
    const divP = document.getElementById("contenido");
    if (!divP) return;
  
    const div: HTMLDivElement = document.createElement("div");
    div.id = "opciones";
    div.className = estilosOpciones.contenedorOpciones;
    div.style.position = 'absolute';
    div.style.top = `${y}px`;  // Añade "px" para asegurar que se interprete como píxeles
    div.style.left = `${x}px`; // Añade "px" para asegurar que se interprete como píxeles
  
    let opCerrar: HTMLSpanElement = document.createElement("span");
    let opEliminar: HTMLSpanElement = document.createElement("span");
  
    // Crea un elemento de React y lo convierte en un string HTML
    const iconoHTMLCerrar = renderToStaticMarkup(iconoCerrarBasico);
    const iconoHTMLBasura = renderToStaticMarkup(iconoBasuraBasico);
  
    // Asigna el string HTML al innerHTML del span
    opCerrar.innerHTML = iconoHTMLCerrar;
    opEliminar.innerHTML = iconoHTMLBasura;
  
    opCerrar.addEventListener('click', () => {
      document.getElementById("opciones")?.remove();
    });
  
  
    opEliminar.addEventListener("click", () => {
      // Si el elemento no existe, no se elimina nada
      if (!elementsDivFuera.some((el) => el.key === numElemento.toString())) return;
  
      const nuevosElements = elementsDivFuera.filter((el) => el.key !== numElemento.toString());
      elementsDivFuera = nuevosElements
  
      const nuevosElementosJSON = elementosJSON.filter((el) => el.id !== numElemento);
      elementosJSON = nuevosElementosJSON;
  
      document.getElementById(`opciones_${numElemento}`)?.remove();
      console.log("Después de eliminar:", nuevosElements, nuevosElementosJSON);
    });
  
  
    div.appendChild(opCerrar);
    div.appendChild(opEliminar);
  
    divP.appendChild(div);
  };
  
  return (
    <div className={estilos.contenedor} id="contenido">
      {
      elementsDivFuera.length > 0 ? 
        elementsDivFuera.map((e:any)=>(
          <>
            {e}
          </>
        ))
      : "Agrega elementos"
      }
      
    </div>
  );
}
