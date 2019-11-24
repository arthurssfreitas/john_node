-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 24-Nov-2019 às 15:28
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
(1, 'Legumes'),
(2, 'Carnes');

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
(1, 'Batata', 5, 1, 3),
(2, 'Cenoura', 10, 1, 3),
(3, 'Picanha', 1, 2, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_retirada`
--

CREATE TABLE `tb_retirada` (
  `fk_produto` int(11) NOT NULL,
  `fk_categoria` int(11) NOT NULL,
  `qty` float NOT NULL,
  `dt_retirada` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(1, 'Quilograma'),
(3, 'Unidade');

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
(1, '123', '202cb962ac59075b964b07152d234b70', '123@123'),
(2, '321', 'caf1a3dfb505ffed0d024130f58c5cfa', '321@321');

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
  ADD KEY `retirada_produto` (`fk_produto`),
  ADD KEY `retirada_categoria` (`fk_categoria`);

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
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_produtos`
--
ALTER TABLE `tb_produtos`
  MODIFY `id_produto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tb_unidade_medida`
--
ALTER TABLE `tb_unidade_medida`
  MODIFY `id_unidade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  ADD CONSTRAINT `retirada_produto` FOREIGN KEY (`fk_produto`) REFERENCES `tb_produtos` (`id_produto`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
