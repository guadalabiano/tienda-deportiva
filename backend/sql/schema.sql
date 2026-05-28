-- ============================================================
--  Tienda Deportiva — Schema MySQL
-- ============================================================

CREATE DATABASE IF NOT EXISTS tienda_deportiva
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE tienda_deportiva;

-- ------------------------------------------------------------
-- Categorías
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  description TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Productos
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id INT UNSIGNED,
  name        VARCHAR(200) NOT NULL,
  description TEXT,
  price       DECIMAL(10,2) NOT NULL,
  stock       INT UNSIGNED  NOT NULL DEFAULT 0,
  image_url   VARCHAR(500),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_product_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE SET NULL
);

-- ------------------------------------------------------------
-- Usuarios
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(150) NOT NULL,
  email        VARCHAR(255) NOT NULL UNIQUE,
  password     VARCHAR(255) NOT NULL,  -- bcrypt hash
  role         ENUM('customer','admin') NOT NULL DEFAULT 'customer',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Órdenes
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id      INT UNSIGNED NOT NULL,
  status       ENUM('pending','confirmed','shipped','delivered','cancelled')
               NOT NULL DEFAULT 'pending',
  total        DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_order_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Ítems de cada orden
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id    INT UNSIGNED NOT NULL,
  product_id  INT UNSIGNED NOT NULL,
  quantity    INT UNSIGNED NOT NULL DEFAULT 1,
  unit_price  DECIMAL(10,2) NOT NULL,  -- precio al momento de la compra

  CONSTRAINT fk_item_order
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_item_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE RESTRICT
);

-- ------------------------------------------------------------
-- Datos de ejemplo
-- ------------------------------------------------------------
INSERT INTO categories (name, description) VALUES
  ('Fútbol',      'Pelotas, botines, equipos y accesorios'),
  ('Running',     'Zapatillas, ropa y accesorios para correr'),
  ('Natación',    'Mallas, antiparras y equipamiento'),
  ('Fitness',     'Pesas, bandas y ropa deportiva general');

INSERT INTO products (category_id, name, price, stock, description) VALUES
  (1, 'Pelota de fútbol Pro',   4500.00, 20, 'Pelota oficial de cuero sintético'),
  (1, 'Botines Velocity X',    12000.00, 15, 'Botines para césped natural'),
  (2, 'Zapatillas RunFlex',    18000.00, 30, 'Amortiguación máxima para asfalto'),
  (2, 'Medias de compresión',   2200.00, 50, 'Pack x2, talle único'),
  (3, 'Antiparras Aqua Pro',    3800.00, 25, 'Lente espejo antiempañante'),
  (4, 'Set de mancuernas 5kg',  9000.00, 10, 'Par de mancuernas de goma');
