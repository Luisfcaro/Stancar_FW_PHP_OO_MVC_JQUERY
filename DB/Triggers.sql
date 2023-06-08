CREATE TRIGGER before_delete_cart BEFORE DELETE ON cart
BEGIN
    UPDATE car
    SET car.stock = car.stock - OLD.qty
    WHERE car.numero_bastidor = OlD.codigo_producto;
END

CREATE TRIGGER before_insert_ped BEFORE DELETE ON cart
BEGIN
    DELETE FROM cart 
    WHERE cart.username = NEW.username AND cart.codigo_producto = NEW.cod_prod;
END