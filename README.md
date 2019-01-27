# Documentación LEGOPOP
## Inicialización
**Para inicializar el proyecto:**

```shell
npm install
```
**Verifica** la cadena de conexión a la base de datos en **lib/connectMongoose.js**

## Inicializar la Base de datos
```shell
npm run installDB
```

## Arranque
Para arrancar el proyecto usar:

En producción:
```shell
npm start
```
En desarrollo:
```shell
npm run dev
```

## Vista
Dirección de acceso
http://localhost:3000/legopop/anuncios

Devuelve la vista con una lista de anuncios precargados (npm run installDB).

La vista permite las mismas consultas que la API menos la creación de anuncios y el listado de todos los tags existentes.
(Documentación de la API a continuación).

Ejemplos:
**Se pueden consultar sobre la propia vista**

## API 
**La API Legopop permite las siguientes operaciones**

### Por rutas

|  Ruta	                        |       Result                  |  Método           |
|  :----------	                |   :-----------                |  :----:           |
|   /api/anuncios               |   Lista todos los anuncios	|   GET             |
|   /api/anucios/tags	        |   Lista todos los tags	    |   GET             |
|   /api/anuncios/nuevoanuncio  |	Crea un nuevo anuncio 	    |   POST            |

Para la comprobación de la creación de un nuevo anuncio se recomienda en uso de postman.
https://www.getpostman.com/

Los campos que hay que rellenar en body/x-www-form-urlencoded son:
* nombre: string.
* venta: boolean.
* precio: number.
* tag: string. Se pueden añadir varios.
* codigo: number.
* foto: string.
  
Se puede emplear alguna de las fotos que hay que la carpeta public/images/ para que se vea el nuevo anuncio en la vista.

Podría emplearse por ejemplo ala_x.jpg


### Por filtros 

|  Filtro	         |      Ejemplo                                  |  Explicación                                                                 |
|  :----------	     |   :-----------                                |  :----:                                                                      |
|   por nombre       |   api/anuncios?nombre=ala                     |   Filtro por string. No es necesario el nombre completo. Case insensitive.   |
|   por precio	     |   api/anuncios?precio=7	                     |   Precio = valor.                                                            |
|   ^                |	 api/anuncios?precio=7-35 	                 |   Por rango de precio                                                        |
|   ^                |	 api/anuncios?precio=7-	                     |   Precio > valor  NO FUNCIONA AÚN                                            |
|   ^                |	 api/anuncios?precio=-7	                     |   Precio < valor  NO FUNCIONA AÚN                                            |
|   por tag          |	 api/anuncios?tag=naves	                     |   Filtro por string. Case insensitive.                                       | 
|   por varios tags  |	 api/anuncios?tag=naves&tag=resistencia	     |   Filtro por array. Varios valores de tag                                    |                  



|  Parámetro	     |      Ejemplo                                  |  Explicación                                                                 |
|  :----------	     |   :-----------                                |  :----:                                                                      |
|  field             |   api/anuncios?field=nombre                   |   Sólo muestra el nombre de los anuncios.                                    |
|  field (varios)    |   api/anuncios?field=nombre tag               |   Sólo muestra el nombre y los tags de los anuncios.                         |
|  sort	             |   api/anuncios?sort=nombre	                 |   Muestra los anuncios por orden alfabético                                  |
|  sort              |	 api/anuncios?sort=nombre:1 	             |   Muestra los anuncios por orden alfabético inverso                          |
|  sort              |	 api/anuncios?sort=precio                    |   Muestra los anuncios por precio ascendente                                 |
|  sort              |	 api/anuncios?sort=precio:-1	             |   Muestra los anuncios por precio descendente                                |
|  skip              |	 api/anuncios?skip=3	                     |   Se salta 3 anuncios                                                        | 
|  limit             |	 api/anuncios?limit=3	                     |   Sólo muestra 3 anuncios                                                    | 


### Ejemplos de mezcla de diferentes filtros

* http://localhost:3000/legopop/api/anuncios?tag=naves&tag=resistencia

* http://localhost:3000/legopop/api/anuncios?tag=microfighter&nombre=ala&precio=5-20&limit=2&sort=precio

* http://localhost:3000/legopop/api/anuncios?precio=17&tag=nave&tag=tropas

* http://localhost:3000/legopop/api/anuncios?skip=5&limit=5

* http://localhost:3000/legopop/api/anuncios?tag=microfighter&nombre=ala&precio=5-20&skip=1&limit=2&sort=precio

* http://localhost:3000/legopop/api/anuncios?precio=12-&nombre=ala

* http://localhost:3000/legopop/api/anuncios?precio=-12&nombre=ala

* http://localhost:3000/legopop/api/anuncios?precio=-12&tag=micro

* http://localhost:3000/legopop/api/anuncios?tag=micro&nombre=ala

* http://localhost:3000/legopop/api/anuncios?tag=micro&nombre=ala&venta=true

* http://localhost:3000/legopop/api/anuncios?tag=micro&nombre=ala&venta=true&sort=precio:-1

**Para paginación: skip limit**

* http://localhost:3000/legopop/anuncios?limit=4

* http://localhost:3000/legopop/anuncios?skip=4&limit=4

* http://localhost:3000/legopop/anuncios?skip=8&limit=4

* http://localhost:3000/legopop/anuncios?skip=12&limit=4

* http://localhost:3000/legopop/anuncios?skip=16&limit=4


## Validación errores en la API

Se valida la existencia de un valor para todos los campos en la API. 

Si no encuentra un valor la API devuelve un error tipo JSON con una estructura de este tipo y aporta información adicional en función del valor no encontrado:

**consulta sin valor para tag**
http://localhost:3000/legopop/api/anuncios?tag

```json
{
    "success": false,
        "error": {
            "message": "Not valid",
            "errors": {
            "tag": {
                "location": "query",
                "param": "tag",
                "value": "",
                "msg": "Necesita un valor o varios: strings. ?tag=valor&tag=valor"
            }
        }
    }
}
```
### Para probar los distintos errores.

**consulta sin valor para nombre** 
http://localhost:3000/legopop/api/anuncios?nombre

**consulta sin valor para precio**
http://localhost:3000/legopop/api/anuncios?precio

**consulta sin valor para venta**
http://localhost:3000/legopop/api/anuncios?venta

**consulta sin valor para código**
http://localhost:3000/legopop/api/anuncios?codigo

**consulta sin valor para sort**
http://localhost:3000/legopop/api/anuncios?sort

**consulta sin valor para skip**
http://localhost:3000/legopop/api/anuncios?skip

**consulta sin valor para limit**
http://localhost:3000/legopop/api/anuncios?limit

**consulta sin valor para fields**
http://localhost:3000/legopop/api/anuncios?fields


## Validación código con EsLint sobre los siguientes archivos
He pasado el comando --fix sobre todos estos archivos y he corregido después los errores pertinentes.

* ./node_modules/.bin/eslint app.js
* ./node_modules/.bin/eslint ./models/Anuncio.js
* ./node_modules/.bin/eslint ./routes/api/filtros.js
* ./node_modules/.bin/eslint ./routes/api/anuncios.js
* ./node_modules/.bin/eslint ./scripts/installDB.js




