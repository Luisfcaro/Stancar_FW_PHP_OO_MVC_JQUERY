# Stancar

_Bienvenidas y bienvenidos a Stancar_ 

¿Qué es Stancar? 

Stancar es una aplicacion web desarrollada con el uso de Jquery framework y PHP, cuyo objetivo es la venta de vehiculos de diferentes clases y tipos, adaptandose de la mejor manera posible a las necesidades del cliente.


## Tecnologías empleadas en este proyecto
***
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=bootstrap,css,html,js,php,github" />
  </a>
 <a   <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="50" height="50" /></div></a>
</p>

## Funcionalidades

La web está compuesta con las siguientes funcionalidades:


1. __En toda la aplicación:__ 
  * Buscador de productor

2. __Home: 🏠__ 
Esta sera nuestra primera vista al entrar en la pagina, en esta misma disponemos de diferente apartados o categorias por los que podremos filtrar a traves de un simple clic.

  * Las marcas que se nos presentaran a traves de un carrusel.
  * Categorías, Tipos de motor y los coches mas vistos, que se nos mostraran en una serie de cartas.
  * Y finalmente una serie de libros recomendados relacionados con los productos de la pagina.

3. __Shop: 🏪__ 
Siendo el modulo más importante de la aplicación, disponemos de una vista de los productos, tanto a nivel visual con una vista previa del vehículo y algunas de sus características, como su posición a traves de la geolocalización. Además de ofrecernos los siguientes añadidos:

  * Filtrado de productos
  * Paginación
  * Posibilidad de añadir a Favoritos
  * Posibilidad de añadir al carrito
  * Ver mas detalles sobre un vehículo en específico



3. __LogIn: 🔐__ 
En el modulo de LogIn el usuario puede registrarse, conectarse a su cuenta, o modificar su contraseña si se le ha olvidado.

Para todo este tipo de operaciones hemos utilizado <strong>JWT</strong> para la asignacion de identificadores de usuario, además de comprobar la autenticidad del mismo y protegerlo ante posibles suplantaciones de identidad, además hacemos uso de <strong>Mailgun</strong>, por tal de verificar tanto los registros como los cambios de contraseña a traves del correo electrónico del usuario. 

Repasando las características de este módulo disponemos de:

  * Registro 
  * LogIn
  * Recordar contraseña mediante correo de verificación
  * Validar nuevos usuarios mediante correo de verificación

4. __Carrito: 🛒__ 
La experiencia de final de compra del usuario, donde se nos muestra brevemente aquellos vehiculos que hayamos añadido a nuestro carrito.

Dentro de este podemos realizar las siguientes acciones:

  * Aumentar, disminuir la cantidad del producto o eliminarlo.
  * Cálculo de precio ondividual de los productos y su precio total en cada modificación.
  * Base de datos mediante stock y facturación de productos
  * Confirmación de la compra.
  




