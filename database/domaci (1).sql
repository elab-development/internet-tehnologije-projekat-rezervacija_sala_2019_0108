-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2024 at 12:08 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `domaci`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_01_04_165116_create_rooms_table', 1),
(6, '2024_01_04_165138_create_reservations_table', 1),
(7, '2024_01_04_175654_add_unique_constraint_to_email_in_users_table', 1),
(8, '2024_01_04_180929_add_foreign_keys_to_reservations_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `reserved_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` varchar(255) NOT NULL,
  `room_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `reserved_date`, `created_at`, `updated_at`, `user_id`, `room_id`) VALUES
(11, '2024-04-10', '2024-03-31 13:03:09', '2024-03-31 13:03:09', 'IbSsg6sajCgqbYw4Gmc8TlQgUTi1', 4),
(16, '2024-04-25', '2024-04-17 19:11:54', '2024-04-17 19:11:54', '2', 2),
(17, '2024-04-24', '2024-04-17 19:51:35', '2024-04-17 19:51:35', 'sRklkDQkMCM8xMiUARqNsDJU4373', 2);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `equipment` text DEFAULT NULL,
  `squareFootage` int(11) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `description` text DEFAULT NULL,
  `imageUrl` varchar(2555) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `type`, `capacity`, `location`, `equipment`, `squareFootage`, `price`, `description`, `imageUrl`, `created_at`, `updated_at`) VALUES
(2, 'et', 'Meeting Room', 82, 'Port Rosannashire', '\"[\\\"Projector\\\",\\\"Sound System\\\",\\\"Video System\\\"]\"', 182, 855.61, 'Impedit provident in dolorem aut nostrum est. Recusandae soluta libero asperiores quaerat. Iusto perferendis fugit praesentium et maxime.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYUEK2qdLbdxQIESRxB6gc0Ze32xae8Wtxbw&s', '2024-03-26 10:51:21', '2024-03-26 10:51:21'),
(3, 'rerum', 'Auditorium', 10, 'Watersmouth', '\"[\\\"Projector\\\",\\\"Sound System\\\",\\\"Whiteboard\\\"]\"', 184, 249.03, 'Rerum blanditiis totam velit. Aliquam doloribus sit rem reiciendis pariatur vero excepturi. Id et quia iure iusto harum accusamus repellendus. At eveniet dolores sed ad dolores ducimus.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7cPGTo7uVPZRj3PdJEi1dd6D8E2Lxo6h7gvcCCmWVmgIDyh4ooqmXbz1DqTlFzDSDAKs&usqp=CAU', '2024-03-26 10:51:21', '2024-03-26 10:51:21'),
(4, 'animi', 'Auditorium', 49, 'Elenorfurt', '\"[\\\"Projector\\\",\\\"Sound System\\\",\\\"Video System\\\"]\"', 129, 581.14, 'Eum adipisci et iste. Illo aut tempore perferendis nesciunt. Repellendus soluta maiores vitae dolores officiis quaerat qui. Dolore maiores sint quod odio eum.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO3hC177wc3N3KhxqFTSJCP-IElOlt5L2SVUGi6yfQOjGWTbX8EFrUSpu7T3K8oSZ9t64&usqp=CAU', '2024-03-26 10:51:21', '2024-03-26 10:51:21'),
(5, 'placeat', 'Meeting Room', 71, 'East Ramon', '\"[\\\"Video System\\\",\\\"Whiteboard\\\"]\"', 110, 929.45, 'Consequatur reiciendis incidunt est aliquid. Ut ut cumque aut pariatur. Ut odio eum dolore et adipisci autem autem. Quas quidem et molestiae nulla.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYUEK2qdLbdxQIESRxB6gc0Ze32xae8Wtxbw&s', '2024-03-26 10:51:21', '2024-03-26 10:51:21'),
(6, 'dolorem', 'Auditorium', 73, 'Bashiriantown', '\"[\\\"Projector\\\",\\\"Sound System\\\",\\\"Video System\\\"]\"', 157, 275.19, 'Voluptatem eligendi excepturi possimus deleniti itaque non ut ad. Qui earum nisi quae nam ea. Soluta tenetur totam ipsam maxime quo quidem rerum. Fuga quis ratione ut delectus quo itaque.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv08LcByG0ClbJmQq2MzCrRooDt3e7-OTKK_1lvjvgNuFAXi5HH791bK1pr5y3srrEdlc&usqp=CAU', '2024-03-26 10:51:21', '2024-03-26 10:51:21'),
(7, 'eos', 'Auditorium', 18, 'New Carson', '\"[\\\"Projector\\\",\\\"Sound System\\\"]\"', 98, 957.63, 'Et recusandae est iusto qui voluptatibus. Voluptatem est velit quisquam quas nemo ut et. Fugit consequatur et rerum laborum eius placeat numquam modi. Ut qui et sint voluptatem temporibus expedita et.', 'https://www.homerton.cam.ac.uk/sites/default/files/North%20Wing%20Auditorium%202%20%28high%20res%29_1.jpg', '2024-03-26 10:51:21', '2024-03-26 10:51:21'),
(8, 'vero', 'Auditorium', 57, 'Rauton', '\"[\\\"Projector\\\",\\\"Whiteboard\\\"]\"', 78, 540.03, 'Eius modi dolor quam quas esse ratione aut. Maxime distinctio veniam illo tenetur. Dolore voluptatem sed esse architecto quo aliquam. Autem quo consequatur est.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv08LcByG0ClbJmQq2MzCrRooDt3e7-OTKK_1lvjvgNuFAXi5HH791bK1pr5y3srrEdlc&usqp=CAU', '2024-03-26 10:51:21', '2024-03-26 10:51:21'),
(9, 'unde', 'Classroom', 43, 'Effertzside', '\"[\\\"Projector\\\",\\\"Sound System\\\",\\\"Video System\\\",\\\"Whiteboard\\\"]\"', 65, 798.99, 'Totam vel quae pariatur sit. Repellendus necessitatibus ex nihil rerum totam dolorem fugit. At dolores maxime dolore quis facilis non. Quidem cum ut voluptas minus qui.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeW-JKHC0EuDrQzKPtPTZctCCkJixU1ZwOpg&s', '2024-03-26 10:51:21', '2024-03-26 10:51:21'),
(10, 'quis', 'Auditorium', 45, 'Hahnfort', '\"[\\\"Video System\\\"]\"', 53, 503.87, 'Omnis sit eos placeat est architecto ducimus. Vero qui et quis qui non molestiae vitae. Vel iusto dignissimos nihil.', 'https://www.homerton.cam.ac.uk/sites/default/files/North%20Wing%20Auditorium%202%20%28high%20res%29_1.jpg', '2024-03-26 10:51:21', '2024-03-26 10:51:21'),
(11, 'distinctio', 'Classroom', 92, 'Predovicport', '\"[\\\"Projector\\\",\\\"Whiteboard\\\"]\"', 39, 409.10, 'Qui ut consequuntur et illo id est velit totam. Nesciunt natus sunt sint voluptatem. Sequi est sequi autem. Corrupti eos deleniti et temporibus sint quia.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeW-JKHC0EuDrQzKPtPTZctCCkJixU1ZwOpg&s', '2024-03-26 10:51:21', '2024-03-26 10:51:21'),
(12, 'facilis', 'Meeting Room', 69, 'Port Kendra', '\"[\\\"Projector\\\"]\"', 157, 742.58, 'Placeat quasi doloribus qui provident odit. Ad odio vitae aut molestias minima. Saepe sunt maiores consectetur.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYUEK2qdLbdxQIESRxB6gc0Ze32xae8Wtxbw&s', '2024-03-26 10:51:21', '2024-03-26 10:51:21'),
(13, 'inventore', 'Meeting Room', 68, 'West Elvie', '\"[\\\"Projector\\\",\\\"Sound System\\\",\\\"Video System\\\"]\"', 126, 635.96, 'Quasi consequatur esse iure rerum omnis. Nisi saepe occaecati et sit nulla sed. Et voluptas neque enim. Repellendus quo cumque ut distinctio hic voluptas enim et. Non atque eos explicabo inventore.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYUEK2qdLbdxQIESRxB6gc0Ze32xae8Wtxbw&s', '2024-03-26 10:51:21', '2024-03-26 10:51:21'),
(14, 'laudantium', 'Auditorium', 14, 'East Aida', '\"[\\\"Projector\\\",\\\"Sound System\\\",\\\"Video System\\\",\\\"Whiteboard\\\"]\"', 46, 252.69, 'Magnam placeat dicta laboriosam dolor. Fuga ut possimus exercitationem eius est fugiat. At dolore odit in et. Ut ratione occaecati asperiores placeat sed eum itaque.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO3hC177wc3N3KhxqFTSJCP-IElOlt5L2SVUGi6yfQOjGWTbX8EFrUSpu7T3K8oSZ9t64&usqp=CAU', '2024-03-26 10:51:21', '2024-03-26 10:51:21'),
(15, 'velit', 'Classroom', 57, 'South Rosanna', '\"[\\\"Projector\\\",\\\"Sound System\\\",\\\"Video System\\\",\\\"Whiteboard\\\"]\"', 145, 516.57, 'Repudiandae alias maiores voluptas vero sapiente voluptates. Neque est ut ut exercitationem dignissimos.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeW-JKHC0EuDrQzKPtPTZctCCkJixU1ZwOpg&s', '2024-03-26 10:51:21', '2024-03-26 10:51:21'),
(16, 'Nova Soba', 'Conference Room', 50, 'Raska', '[\"Projector\",\"Sound Equipment\",\"Whiteboard\",\"Sound System\"]', 44, 100.00, 'Banova soba', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSGDrSf-rxCppXhVQ6CbFQfWvfQtRcoKBp1g&s', '2024-03-26 10:52:53', '2024-03-26 10:52:53'),
(17, '4', 'Conference Room', 4, '4', '[]', 4, 4.00, '4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSGDrSf-rxCppXhVQ6CbFQfWvfQtRcoKBp1g&s', '2024-03-30 06:49:08', '2024-03-30 06:49:08'),
(18, 'Tester', 'Classroom', 30, 'Beograd, Izmisljena 22', '[\"Projector\",\"Whiteboard\"]', 27, 40.00, 'Test opis', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeW-JKHC0EuDrQzKPtPTZctCCkJixU1ZwOpg&s', '2024-03-30 06:58:38', '2024-03-30 06:58:38'),
(19, 'Ne znam vise', 'Conference Room', 44, 'Lokacija', '[\"Projector\",\"Sound Equipment\",\"Sound System\"]', 44, 44.00, 'Opis', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSGDrSf-rxCppXhVQ6CbFQfWvfQtRcoKBp1g&s', '2024-03-30 07:02:22', '2024-03-30 07:02:22'),
(20, 'name', 'Classroom', 4, '4', '[\"Projector\",\"Video System\"]', 4, 4.00, '4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeW-JKHC0EuDrQzKPtPTZctCCkJixU1ZwOpg&s', '2024-04-01 17:54:57', '2024-04-01 17:54:57'),
(21, 'Nova sala', 'Meeting Room', 3, '3', '[\"Sound System\"]', 3, 3.00, '3', '3', '2024-04-17 18:52:38', '2024-04-17 18:52:38'),
(22, 'et', 'Auditorium', 42, 'West Kaystad', '\"[\\\"Projector\\\"]\"', 198, 572.77, 'Molestias dolorem alias id quibusdam molestias. Porro exercitationem non quis esse sed. Est quo non ut. Itaque dolores delectus beatae vel possimus.', 'https://www.homerton.cam.ac.uk/sites/default/files/North%20Wing%20Auditorium%202%20%28high%20res%29_1.jpg', '2024-04-17 19:02:08', '2024-04-17 19:02:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservations_room_id_foreign` (`room_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
