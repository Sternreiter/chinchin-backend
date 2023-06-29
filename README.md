# Chinchin Backend

Este proyecto es el backend de una aplicación llamada Chinchin, que proporciona información sobre precios de criptomonedas. A continuación se detalla la estructura y funcionalidad del proyecto.

## Controllers

El directorio "Controllers" contiene los controladores de la aplicación, que se encargan de manejar las peticiones HTTP y realizar las operaciones correspondientes. El controlador principal es el `PriceController`, el cual contiene los siguientes métodos:

### `getPrice(_req: Request, res: Response): Promise<void>`

Este método se encarga de obtener el precio actual de varias criptomonedas consultando la API de Coingecko. Primero realiza una consulta a Coingecko para obtener los precios de las criptomonedas (Bitcoin, Tether, Ethereum, Binance Coin) en las divisas USD y EUR. Luego, realiza los cálculos necesarios para obtener el precio en VES (Bolívares Soberanos, moneda venezolana).

Si se obtienen todos los precios correctamente, se almacenan en la base de datos y se envían en la respuesta. En caso de que alguno de los precios no se obtenga correctamente, se consulta el último precio registrado en la base de datos y se envía como respuesta.

### `getPriceBySymbol(req: Request, res: Response): Promise<void>`

Este método permite obtener el precio más reciente de una criptomoneda específica, según el símbolo proporcionado en la URL. Realiza una consulta a la base de datos y devuelve el precio correspondiente si se encuentra, o un mensaje de error si no se encuentra.

### `savePrice(req: Request, res: Response): Promise<void>`

Este método permite guardar un nuevo precio en la base de datos. Recibe el símbolo y el valor del precio en el cuerpo de la solicitud, crea un nuevo registro en la base de datos y devuelve el precio creado en la respuesta.

## Models

El directorio "Models" contiene los modelos de la aplicación, que representan las tablas de la base de datos. El modelo principal es `Price`, el cual tiene los siguientes atributos:

- `id`: Identificador único del precio (entero).
- `symbol`: Símbolo de la criptomoneda (cadena de texto).
- `value`: Valor del precio (número de punto flotante).

## Routes

El archivo "routes.ts" define las rutas de la aplicación utilizando Express Router. Las rutas disponibles son las siguientes:

- `GET /api/v1/price`: Obtiene el precio actual de varias criptomonedas.
- `GET /api/v1/price/:symbol`: Obtiene el precio más reciente de una criptomoneda específica.
- `POST /api/v1/savePrice`: Guarda un nuevo precio en la base de datos.

## App

El archivo "app.ts" es el punto de entrada de la aplicación. Aquí se configura Express, se sincroniza la base de datos con los modelos y se inicia el servidor. La aplicación se ejecuta en el puerto especificado en la variable de entorno `PORT`.

## Package.json

El archivo "package.json" contiene la configuración y las dependencias del proyecto. Algunas de las dependencias utilizadas son:

- `express`: Framework de aplicaciones web para Node.js.
- `sequelize`: ORM (Object-Relational Mapping) para interactuar con la base de datos.
- `axios`: Cliente HTTP para realizar solicitudes a la API de Coingecko.
- `dotenv`: Carga variables de entorno desde un

 archivo `.env`.
- `moment`: Librería para manipular y formatear fechas y horas.

## Scripts

El archivo "package.json" también contiene varios scripts predefinidos para ejecutar tareas comunes:

- `dev`: Inicia la aplicación en modo de desarrollo utilizando `ts-node-dev`.
- `start`: Inicia la aplicación en modo de producción utilizando el archivo compilado `build/app.js`.
- `tsc`: Compila los archivos TypeScript a JavaScript.
- `test`: Ejecuta las pruebas utilizando Jest.

Para ejecutar la aplicación en modo de desarrollo, puedes ejecutar el siguiente comando:

```
npm run dev
```

Para ejecutar la aplicación en modo de producción, puedes ejecutar los siguiente comando:

```
npm run tsc
```
```
npm start
```