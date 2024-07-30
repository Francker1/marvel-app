# Marvel App

Este proyecto es una aplicación de React para explorar personajes de Marvel. Utiliza Vite como herramienta de construcción, TypeScript para el tipado estático y Styled Components para el estilado.
No obstante, en ciertas partes también usa css solo para muestra de prueba técnica, para mostrar que es posible usar ambas aproximaciones para el estilado.

MUY IMPORTANTE: He implementado un simulador de **cacheo de resultados**, debido a que el API de Marvel en ocasiones es lenta al obtener el resultado, bloqueando incluso el navegador. Por lo tanto, queda cacheada en el localStorage tanto el fetch de personajes, como los resultados de la búsqueda. Además, debido a la lentitud de la respuesta, he limitado a 30

Esta aplicación está desplegada en Netlify, usando una estrategia de entrega continua, la ruta es:

https://main--marvel-z-app.netlify.app/


# Requisitos Previos

1. Node.js (versión 18 o superior)
2. pnpm (gestor de paquetes)

## Instalación de pnpm

Si no tienes `pnpm` instalado, puedes instalarlo globalmente usando npm:

```bash
npm install -g pnpm
```

## Clonar el Proyecto

Clona el repositorio desde GitHub:

```bash
git clone https://github.com/Francker1/marvel-app.git
cd marvel-app
```


## Instalación de Dependencias
Una vez que hayas clonado el repositorio, navega a la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias:

```bash
pnpm install
```

## Arrancar el Proyecto en Local

#### ENVIRONMENT VARIABLES:
Solo para efectos de la práctica, debes crear un archivo .env en la raíz del proyecto e incluir las variables de entorno del archivo .sample.env

Debes incluir la api-key y el hash para autenticar las peticiones a API de Marvel.

Una vez que hayas clonado el repositorio, navega a la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias:

```bash
pnpm run dev
```

Esto abrirá la aplicación en http://localhost:5173 por defecto. 


## Ejecutar los tests
Para ejecutar las pruebas, puedes usar Vitest. Corre el siguiente comando:

```bash
pnpm run test
```

## Ejecutar el lintern
Para ejecutar ESLint y verificar el código, usa:

```bash
pnpm run lint
```

Para corregir automáticamente los problemas de linting:

```bash
pnpm run lint:fix
```  

<br>

## Configuración del Proyecto

### Prettier
Asegúrate de que tu configuración de Prettier esté alineada con las reglas del proyecto. Puedes configurar Prettier en tu archivo .prettierrc:

```bash
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "endOfLine": "auto"
}
```

### Eslint
La configuración de ESLint está en el archivo .eslintrc.json:
<br>
<br>

# Arquitectura de la aplicación
La aplicación está estructurada de la siguiente manera:

```bash
/src
  /__tests__             # Archivos referentes a los tests
  /assets                # Archivos estáticos como imágenes
  /components            # Componentes reutilizables de la aplicación
    /CharacterCard       
    /CharacterImageSection       
    /ComicsSection       
    /Header              
    /Loader            
    /Search     
  /context               # Contextos de React para el estado global
    FavoritesContext.tsx # Contexto de favoritos
  /pages                 # Páginas de la aplicación
    HomePage.tsx         # Página principal
    CharacterDetailPage.tsx # Página de detalles de personajes
    FavoritesPage.tsx    # Página de favoritos
  /services              # Servicios y llamadas a la API
    api.ts               # Llamadas a la API de Marvel
  App.tsx                # Componente principal de la aplicación
  main.tsx               # Punto de entrada de la aplicación
  global.css             # Estilos globales
  types.d.ts
  vite-env.d.ts

```


En este caso, he optado por crear una página de Favoritos, siguiendo la vista 1, para poder organizar mejor el funcionamiento de la aplicación y de los componentes que afectan a esa página.

#### Separation of Concerns (SoC):
La arquitectura está diseñada para separar claramente las responsabilidades. Los componentes de la UI se encuentran en la carpeta components, las páginas en pages, y los contextos en context. Esto facilita el mantenimiento y escalabilidad del código.

#### Manejo de Estado Global:
El uso de context para manejar el estado global, como los favoritos, me permite una gestión centralizada del estado que puede ser accedido y modificado desde cualquier componente dentro de la aplicación, proporcionando un flujo de datos claro y predecible.

#### Styled Components:
Optar por styled-components para el estilado permite una mejor organización y encapsulación de los estilos, evitando conflictos de CSS y permitiendo la aplicación de estilos dinámicos basados en las props del componente.

#### Servicios Centralizados:
La carpeta services contiene las llamadas a la API, lo cual centraliza la lógica de comunicación con el backend y facilita la gestión de estos servicios, además de simplificar el mockeo en los tests.

## Contacto
Si tienes alguna pregunta o necesitas ayuda, por favor contacta conmigo al email italo.ravina@gmail.com

