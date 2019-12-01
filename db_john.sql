-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01-Dez-2019 às 20:12
-- Versão do servidor: 10.4.8-MariaDB
-- versão do PHP: 7.2.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_john`
--

DELIMITER $$
--
-- Procedimentos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `chartRetirada` ()  begin

	select

		cast(dt_retirada as date) as labels,

		count(*) as series

	from

		tb_retirada

	where

		cast(dt_retirada as date) >= date_add(current_date,

		interval -30 day)

	group by

		cast(dt_retirada as date);

	end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `chartRetiradaPorUnidade` (IN `unidade` INT)  begin
	select
		a.fk_produto,
		b.nome as labels,
		sum(a.qty) as series
	from
		tb_retirada a
	inner join tb_produtos b 
	on a.fk_produto = b.id_produto 
	where
		cast(dt_retirada as date) >= date_add(current_date,
		interval -30 day)
	and 
		a.fk_unidade = unidade
	group by
		a.fk_produto;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `retiraProduto` (IN `id` FLOAT, IN `retirada` FLOAT)  BEGIN

	DECLARE prod_categoria INT;

	DECLARE prod_unidade INT;

	SELECT fk_categoria, fk_unidade into prod_categoria, prod_unidade from tb_produtos where id_produto = id;  

	UPDATE tb_produtos set qty = qty - retirada where id_produto = id;

	INSERT INTO tb_retirada (fk_produto, fk_categoria, fk_unidade, qty, dt_retirada) VALUES(id, prod_categoria, prod_unidade, retirada, CURRENT_TIME);

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_categorias`
--

CREATE TABLE `tb_categorias` (
  `id_categoria` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_categorias`
--

INSERT INTO `tb_categorias` (`id_categoria`, `nome`) VALUES
(1, 'Padrão'),
(2, 'Carnes'),
(3, 'Legumes'),
(4, 'Bebidas Alcoólicas'),
(5, 'Salgadinhos'),
(6, 'Condimentos'),
(7, 'Peixes'),
(8, 'Bebidas');

--
-- Acionadores `tb_categorias`
--
DELIMITER $$
CREATE TRIGGER `category_delete` BEFORE DELETE ON `tb_categorias` FOR EACH ROW BEGIN

    UPDATE tb_produtos SET fk_categoria = 1 WHERE fk_categoria = OLD.id_categoria;

  END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_produtos`
--

CREATE TABLE `tb_produtos` (
  `id_produto` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `qty` float NOT NULL,
  `fk_categoria` int(11) NOT NULL,
  `fk_unidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_produtos`
--

INSERT INTO `tb_produtos` (`id_produto`, `nome`, `qty`, `fk_categoria`, `fk_unidade`) VALUES
(1, 'Batata', 40, 3, 2),
(2, 'Cenoura', 4, 3, 2),
(8, 'Nuggets', 15, 2, 3),
(10, 'Cerveja Brahma', 120, 4, 3),
(11, 'Bife de Hamburguer', 45, 2, 3),
(12, 'Batata Ruffles', 30, 5, 3),
(13, 'Cerveja Skol', 50, 4, 3),
(14, 'Linguiça', 13.98, 2, 2),
(15, 'Pepino', 10, 3, 2),
(16, 'Maionese', 3, 6, 3),
(17, 'Salmão', 5, 7, 2),
(18, 'Tilapia', 10, 7, 2),
(19, 'Lambari', 50, 7, 2),
(20, 'Tainha', 29, 7, 2),
(21, 'Vinho Tinto', 8, 4, 3),
(22, 'Pacu', 20, 7, 2),
(23, 'Pirarucu', 10, 7, 2),
(24, 'Pintado', 2, 7, 2),
(25, 'Cerveja Corona', 79, 4, 3),
(26, 'Pepsi', 5, 8, 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_retirada`
--

CREATE TABLE `tb_retirada` (
  `id_retirada` int(11) NOT NULL,
  `fk_produto` int(11) NOT NULL,
  `fk_categoria` int(11) NOT NULL,
  `fk_unidade` int(11) NOT NULL,
  `qty` float NOT NULL,
  `dt_retirada` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_retirada`
--

INSERT INTO `tb_retirada` (`id_retirada`, `fk_produto`, `fk_categoria`, `fk_unidade`, `qty`, `dt_retirada`) VALUES
(38, 1, 3, 2, 1, '2019-11-19 00:00:00'),
(39, 1, 3, 2, 2, '2019-11-19 00:00:00'),
(40, 2, 3, 2, 1, '2019-11-22 00:00:00'),
(41, 8, 2, 3, 1, '2019-11-21 00:00:00'),
(42, 8, 2, 3, 5, '2019-11-26 00:00:00'),
(43, 2, 3, 2, 6, '2019-11-19 17:06:48'),
(44, 10, 4, 3, 12, '2019-11-19 17:09:10'),
(45, 1, 3, 2, 2, '2019-11-19 17:12:56'),
(46, 1, 3, 2, 10, '2019-11-20 00:00:00'),
(47, 2, 3, 2, 2, '2019-11-20 00:00:00'),
(48, 2, 3, 2, 4, '2019-11-20 00:00:00'),
(49, 17, 7, 2, 3, '2019-11-20 00:00:00'),
(50, 17, 7, 2, 2, '2019-11-20 00:00:00'),
(51, 12, 5, 3, 20, '2019-11-20 00:00:00'),
(52, 21, 4, 3, 3, '2019-11-26 20:14:31'),
(53, 21, 4, 3, 8, '2019-11-26 20:14:32'),
(54, 16, 6, 3, 5, '2019-11-26 20:14:36'),
(55, 16, 6, 3, 2, '2019-11-26 20:14:45'),
(56, 23, 7, 2, 2, '2019-11-26 20:14:54'),
(57, 20, 7, 2, 5, '2019-11-26 20:14:54'),
(58, 10, 4, 3, 18, '2019-11-26 20:15:11'),
(59, 14, 2, 2, 5, '2019-11-26 20:16:16'),
(60, 25, 4, 3, 21, '2019-11-26 20:16:35'),
(61, 10, 4, 3, 2, '2019-11-26 20:17:41'),
(62, 22, 7, 2, 1, '2019-11-26 20:42:35'),
(63, 1, 3, 2, 2, '2019-11-26 20:43:10'),
(64, 14, 2, 2, 0.02, '2019-11-26 20:48:18'),
(65, 11, 2, 3, 5, '2019-11-26 20:48:38'),
(66, 14, 2, 2, 1, '2019-11-26 21:38:08'),
(67, 20, 7, 2, 1, '2019-11-26 21:46:20'),
(68, 21, 4, 3, 1, '2019-11-26 21:46:24');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_unidade_medida`
--

CREATE TABLE `tb_unidade_medida` (
  `id_unidade` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_unidade_medida`
--

INSERT INTO `tb_unidade_medida` (`id_unidade`, `nome`) VALUES
(1, 'Padrão'),
(2, 'Quilograma'),
(3, 'Unidade');

--
-- Acionadores `tb_unidade_medida`
--
DELIMITER $$
CREATE TRIGGER `unidade_delete` BEFORE DELETE ON `tb_unidade_medida` FOR EACH ROW BEGIN

    UPDATE tb_produtos SET fk_unidade = 1 WHERE fk_unidade = OLD.id_unidade;

  END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_usuarios`
--

CREATE TABLE `tb_usuarios` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_usuarios`
--

INSERT INTO `tb_usuarios` (`id`, `login`, `senha`, `email`) VALUES
(5, 'inacio', '2b1b3eb12b8be71ecf1c42366a6c84da', 'inacio.silva@gmail.com'),
(8, 'arthur', '202cb962ac59075b964b07152d234b70', 'arthur@arthur'),
(9, 'patrick', '6c84cbd30cf9350a990bad2bcc1bec5f', 'patrickLindo@serlindo.com.br');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_categorias`
--
ALTER TABLE `tb_categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Índices para tabela `tb_produtos`
--
ALTER TABLE `tb_produtos`
  ADD PRIMARY KEY (`id_produto`),
  ADD KEY `categoria` (`fk_categoria`),
  ADD KEY `unidade` (`fk_unidade`);

--
-- Índices para tabela `tb_retirada`
--
ALTER TABLE `tb_retirada`
  ADD PRIMARY KEY (`id_retirada`),
  ADD UNIQUE KEY `id_retirada` (`id_retirada`),
  ADD KEY `retirada_produto` (`fk_produto`),
  ADD KEY `retirada_categoria` (`fk_categoria`),
  ADD KEY `retirada_unidade` (`fk_unidade`);

--
-- Índices para tabela `tb_unidade_medida`
--
ALTER TABLE `tb_unidade_medida`
  ADD PRIMARY KEY (`id_unidade`);

--
-- Índices para tabela `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_categorias`
--
ALTER TABLE `tb_categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `tb_produtos`
--
ALTER TABLE `tb_produtos`
  MODIFY `id_produto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de tabela `tb_retirada`
--
ALTER TABLE `tb_retirada`
  MODIFY `id_retirada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de tabela `tb_unidade_medida`
--
ALTER TABLE `tb_unidade_medida`
  MODIFY `id_unidade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tb_produtos`
--
ALTER TABLE `tb_produtos`
  ADD CONSTRAINT `categoria` FOREIGN KEY (`fk_categoria`) REFERENCES `tb_categorias` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `unidade` FOREIGN KEY (`fk_unidade`) REFERENCES `tb_unidade_medida` (`id_unidade`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_retirada`
--
ALTER TABLE `tb_retirada`
  ADD CONSTRAINT `retirada_categoria` FOREIGN KEY (`fk_categoria`) REFERENCES `tb_categorias` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `retirada_produto` FOREIGN KEY (`fk_produto`) REFERENCES `tb_produtos` (`id_produto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `retirada_unidade` FOREIGN KEY (`fk_unidade`) REFERENCES `tb_unidade_medida` (`id_unidade`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
