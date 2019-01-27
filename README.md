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
http://localhost:3000/legopop

Devuelve la vista con una lista de anuncios precargados (npm run installDB).

La vista permite las mismas consultas que la API menos la creación de anuncios y el listado de todos los tags existentes.
(Documentación de la API a continuación).

Ejemplos:
**FALTAN LOS EJEMPLOS**

## API 
**La API Legopop permite las siguientes operaciones**

### Por rutas:

|  Ruta	                |       Result                  |  Método           |
|  :----------	        |   :-----------                |  :----:           |
|   /api/anuncios       |   Lista todos los anuncios	|   GET             |
|   /api/tags	        |   Lista todos los tags	    |   GET             |
|   /api/nuevoanuncio   |	Crea un nuevo anuncio 	    |   POST            |

### Por filtros: 

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


### Ejemplos de mezcla de diferentes filtros:

http://localhost:3000/legopop/api/anuncios?tag=microfighter&nombre=ala&precio=5-20&limit=2&sort=precio
http://localhost:3000/legopop/api/anuncios?precio=17&tag=nave&tag=tropas
http://localhost:3000/legopop/api/anuncios?skip=5&limit=5
http://localhost:3000/legopop/api/anuncios?tag=microfighter&nombre=ala&precio=5-20&skip=1&limit=2&sort=precio
http://localhost:3000/legopop/anuncios?precio=12-&nombre=ala
http://localhost:3000/legopop/anuncios?precio=-12&nombre=ala