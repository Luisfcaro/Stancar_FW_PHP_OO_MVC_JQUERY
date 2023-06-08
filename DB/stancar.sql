-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2023 a las 02:19:46
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `stancar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `car`
--

CREATE TABLE `car` (
  `numero_bastidor` varchar(100) NOT NULL,
  `numero_matricula` varchar(100) DEFAULT NULL,
  `fecha_matriculacion` varchar(50) DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `puertas` int(11) DEFAULT NULL,
  `pegatina` varchar(50) DEFAULT NULL,
  `fecha_publicacion` varchar(50) DEFAULT NULL,
  `cod_categoria` int(11) DEFAULT NULL,
  `precio` varchar(100) DEFAULT NULL,
  `km` varchar(100) DEFAULT NULL,
  `cod_marca` int(11) DEFAULT NULL,
  `cilindrada` varchar(100) DEFAULT NULL,
  `cod_motor` int(11) DEFAULT NULL,
  `lat` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `lon` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) NOT NULL,
  `Visitas` int(11) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `car`
--

INSERT INTO `car` (`numero_bastidor`, `numero_matricula`, `fecha_matriculacion`, `color`, `puertas`, `pegatina`, `fecha_publicacion`, `cod_categoria`, `precio`, `km`, `cod_marca`, `cilindrada`, `cod_motor`, `lat`, `city`, `lon`, `imagen`, `Visitas`, `stock`) VALUES
('bastidor', 'matricula', 'patata', 'Blanco', 4, 'B', 'patata', 2, 'precio', '1111', 1, 'cilindrada', 2, '38.81886219850308', 'Madrid', '-0.6108192837014971', 'view/img/audiQ7.png', 173, 93),
('bastidor2', '1234-ABC', '2018-06-01', 'Marron', 4, 'A', '2018-06-01', 1, '10000', '2222', 2, '100cc', 2, '38.82767211695552', 'Ontinyent', '-0.5971127200050697', 'view/img/bmwI7.jpg', 44, 80),
('bastidor3', '0002-ABC', '2018-06-01', 'Azul', 4, 'B', '2018-06-01', 3, '10000', '0', 3, '120cc', 2, '38.824650426274445', 'Ontinyent', '-0.6222220531071875', 'view/img/polo.jpg', 53, 79),
('bastidor4', '0000-ABC', '2018-06-01', 'Negro', 4, 'B', '2018-06-01', 4, '10000', '4444', 4, '120cc', 4, '38.830296112710315', 'Ontinyent', '-0.57782140310954', 'view/img/seatMii.jpg', 19, 93),
('bastidor5', '0001-ABC', '2018-06-01', 'Marron', 4, 'B', '2018-06-01', 4, '10000', '5555', 5, '120 cv', 2, '38.81645940925543', 'Ontinyent', '-0.6141584867857757', 'view/img/benz.jpg', 27, 98);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `username` varchar(25) DEFAULT NULL,
  `codigo_producto` varchar(100) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `cart`
--
DELIMITER $$
CREATE TRIGGER `before_delete_cart` BEFORE DELETE ON `cart` FOR EACH ROW BEGIN
UPDATE car
SET car.stock = car.stock - OLD.qty
WHERE car.numero_bastidor = OlD.codigo_producto;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `cod_categoria` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `nombre_categoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`cod_categoria`, `descripcion`, `nombre_categoria`) VALUES
(1, 'view/img/nuevo.png', 'Nuevo'),
(2, 'view/img/seminuevo.png', 'Seminuevo'),
(3, 'view/img/km0.png', 'Km 0'),
(4, 'view/img/renting.png', 'Renting');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id_foto` int(11) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `n_bastidor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id_foto`, `imagen`, `n_bastidor`) VALUES
(1, 'view/img/audiq7_1.jpg', 'bastidor'),
(2, 'view/img/audiq7_2.jpg', 'bastidor'),
(3, 'view/img/audiq7_3.jpg', 'bastidor'),
(4, 'view/img/audiq7_4.jpg', 'bastidor'),
(1, 'view/img/bmwI7_1.jpg', 'bastidor2'),
(2, 'view/img/bmwI7_2.jpg', 'bastidor2'),
(3, 'view/img/bmwI7_3.jpg', 'bastidor2'),
(4, 'view/img/bmwI7_4.jpg', 'bastidor2'),
(5, 'view/img/bmwI7_5.jpg', 'bastidor2'),
(1, 'view/img/polo_1.jpg', 'bastidor3'),
(2, 'view/img/polo_2.jpg', 'bastidor3'),
(3, 'view/img/polo_3.jpg', 'bastidor3'),
(4, 'view/img/polo_4.jpg', 'bastidor3'),
(5, 'view/img/polo_5.jpg', 'bastidor3'),
(1, 'view/img/seatMii_1.jpg', 'bastidor4'),
(2, 'view/img/seatMii_2.png', 'bastidor4'),
(3, 'view/img/seatMii_3.jpg', 'bastidor4'),
(4, 'view/img/seatMii_4.jpg', 'bastidor4'),
(1, 'view/img/benz_1.jpg', 'bastidor5'),
(2, 'view/img/benz_2.jpg', 'bastidor5'),
(3, 'view/img/benz_3.jpg', 'bastidor5'),
(4, 'view/img/benz_4.jpg', 'bastidor5'),
(5, 'view/img/benz_5.jpg', 'bastidor5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id_like` int(11) NOT NULL,
  `id_user` int(30) NOT NULL,
  `id_car` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`id_like`, `id_user`, `id_car`) VALUES
(143, 41, 'bastidor3'),
(149, 41, 'bastidor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `cod_marca` varchar(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `nombre_marca` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`cod_marca`, `descripcion`, `nombre_marca`) VALUES
('1', 'view/img/audi.png', 'Audi'),
('2', 'view/img/bmw.png', 'BMW'),
('3', 'view/img/wolfsvaguen.png', 'Wolfsvaguen'),
('4', 'view/img/seat.png', 'Seat'),
('5', 'view/img/mercedes.png', 'Mercedes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `motor`
--

CREATE TABLE `motor` (
  `cod_motor` int(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `nombre_motor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `motor`
--

INSERT INTO `motor` (`cod_motor`, `descripcion`, `nombre_motor`) VALUES
(1, 'view/img/diesel.png', 'Diesel'),
(2, 'view/img/gasolina.png', 'Gasolina'),
(3, 'view/img/hibrido.png', 'Hibrido'),
(4, 'view/img/electrico.png', 'Electrico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `cod_ped` varchar(255) DEFAULT NULL,
  `username` varchar(25) DEFAULT NULL,
  `cod_prod` varchar(100) DEFAULT NULL,
  `matricula` varchar(100) DEFAULT NULL,
  `cantidad` varchar(25) NOT NULL,
  `precio` varchar(100) DEFAULT NULL,
  `total_precio` varchar(100) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`cod_ped`, `username`, `cod_prod`, `matricula`, `cantidad`, `precio`, `total_precio`, `fecha`) VALUES
('c001c48481ffed4508ad91798c648bb1', 'Luisfcaro', 'bastidor2', '1234-ABC', '10', '10000', '100000', '0000-00-00 00:00:00'),
('c001c48481ffed4508ad91798c648bb1', 'Luisfcaro', 'bastidor3', '0002-ABC', '6', '10000', '60000', '0000-00-00 00:00:00'),
('c001c48481ffed4508ad91798c648bb1', 'Luisfcaro', 'bastidor5', '0001-ABC', '2', '10000', '20000', '0000-00-00 00:00:00'),
('c001c48481ffed4508ad91798c648bb1', 'Luisfcaro', 'bastidor3', '0002-ABC', '1', '10000', '10000', '0000-00-00 00:00:00'),
('c001c48481ffed4508ad91798c648bb1', 'Luisfcaro', 'bastidor4', '0000-ABC', '7', '10000', '70000', '0000-00-00 00:00:00'),
('464e07afc9e46359fb480839150595c5', 'David', 'bastidor2', '1234-ABC', '4', '10000', '40000', '0000-00-00 00:00:00');

--
-- Disparadores `pedidos`
--
DELIMITER $$
CREATE TRIGGER `before_insert_ped` AFTER INSERT ON `pedidos` FOR EACH ROW BEGIN
DELETE FROM cart WHERE cart.username = NEW.username AND cart.codigo_producto = NEW.cod_prod;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(30) NOT NULL,
  `username` varchar(25) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `type_user` varchar(50) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `activate` int(11) NOT NULL,
  `token_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `email`, `type_user`, `avatar`, `activate`, `token_email`) VALUES
(43, 'Alberto', '$2y$12$3Xvg0lfNIS1qtHCcEk7hKOzv6Za4j7UNJIP2t4FMbkA4LJrti6aMq', 'albertogomez@gmail.com', 'client', 'https://i.pravatar.cc/500?u=8fc781402474f1957a038c61443ae1b3', 1, ''),
(44, 'Guillem', '$2y$12$XBpzUNUc73ZsTMd3F/BqgOHPOZwb.uGVu4l8VmecgZRlKflMNQO7m', 'guillem@gmail.com', 'client', 'https://i.pravatar.cc/500?u=a5aebdb34a5877a092182f16d25aff28', 1, ''),
(50, 'David', '$2y$12$poJwTPWp.nqv3Szcm/WESux9PeXvB0zw9.JOrJAhvbLYHsEbzuX8a', 'luisfcarotrabajos@gmail.com', 'client', 'https://i.pravatar.cc/500?u=b23017b2c007ea1a3150b7f054d998e1', 1, ''),
(51, 'Yomogan', '$2y$12$5VGc.NxEMZtXAcQzwaTWw.waEbDhZYKRrmbyPLUFBqjYZxQOuVSvC', 'luisfcaro2004@gmail.com', 'client', 'https://i.pravatar.cc/500?u=84d7a649a77c9949dbf1d3af0492288e', 1, ''),
(52, 'Yomogan29', '$2y$12$ruRLR/dOakYJXR18I31gA.XaRnGIKKfmujRWohCvSeo7SSsEnGrd.', 'patata@gmail.com', 'client', 'https://i.pravatar.cc/500?u=785fefe6795bcbd014704229986df1ac', 0, '2cfc70527240f60410f3');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id_like`),
  ADD KEY `id_car` (`id_car`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
