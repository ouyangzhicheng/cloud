/*
 Navicat Premium Data Transfer

 Source Server         : ccw
 Source Server Type    : MySQL
 Source Server Version : 50722
 Source Host           : localhost:3306
 Source Schema         : sbjm

 Target Server Type    : MySQL
 Target Server Version : 50722
 File Encoding         : 65001

 Date: 18/03/2019 16:15:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_role
-- ----------------------------
DROP TABLE IF EXISTS `tb_role`;
CREATE TABLE `tb_role`  (
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键角色ID',
  `create_time` datetime(0) DEFAULT NULL COMMENT '创建时间',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '角色说明',
  `role_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '角色代码',
  `role_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '角色名称',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_role
-- ----------------------------
INSERT INTO `tb_role` VALUES (1, '2018-04-27 21:20:53', '上帝之手', 'superadmin', '超级管理员');
INSERT INTO `tb_role` VALUES (2, '2018-04-27 21:21:32', '管理员', 'admin', '管理员');

-- ----------------------------
-- Table structure for tb_user_info
-- ----------------------------
DROP TABLE IF EXISTS `tb_user_info`;
CREATE TABLE `tb_user_info`  (
  `user_info_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_register_id` int(11) DEFAULT NULL COMMENT '注册Id',
  `user_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户名',
  `ture_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '真实姓名',
  `nick_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `age` int(255) DEFAULT NULL COMMENT '年龄',
  `sex` int(255) DEFAULT NULL COMMENT '性别',
  `birthday` date DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '手机号',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '电子邮件',
  `status` int(11) DEFAULT NULL COMMENT '状态',
  `brief_introduction` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `icon_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `create_time` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`user_info_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_user_info
-- ----------------------------
INSERT INTO `tb_user_info` VALUES (1, 1, '', NULL, '欧阳志成', '小成成', 25, 1, '1993-04-01', '15915789343', '296729445@qq.com', 1, '我是小成成', 'userIcon/9495e432-a0db-4937-9c19-64baa1842677.jpg', 'fb41f908aeb047ec0a20bb3a10b494843edf3c14994264d8d2ca8f5feab2e644', '2018-04-26 23:13:34');
INSERT INTO `tb_user_info` VALUES (2, 2, '', NULL, '丁嘉雯', '小雯雯', 22, 1, '1995-03-20', '18826248598', '1026148869@qq.com', 1, '我是小雯雯', 'userIcon/9495e432-a0db-4937-9c19-64baa1842677.jpg', '9b8c12c3d87a95a283b7d6e2255b03342f3dc10466494922370913094bf4ea57', '2018-04-26 23:13:49');

-- ----------------------------
-- Table structure for tb_user_register
-- ----------------------------
DROP TABLE IF EXISTS `tb_user_register`;
CREATE TABLE `tb_user_register`  (
  `user_register_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '注册主键Id',
  `account_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户账号ID',
  `pass_word` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户密码',
  `register_time` datetime(0) DEFAULT NULL COMMENT '注册时间',
  PRIMARY KEY (`user_register_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_user_register
-- ----------------------------
INSERT INTO `tb_user_register` VALUES (1, '15915789343', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '2018-07-10 22:50:21');
INSERT INTO `tb_user_register` VALUES (2, '18826248598', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '2018-07-10 23:04:57');
INSERT INTO `tb_user_register` VALUES (3, '12312', '92925488b28ab12584ac8fcaa8a27a0f497b2c62940c8f4fbc8ef19ebc87c43e', '2018-07-12 23:28:52');
INSERT INTO `tb_user_register` VALUES (4, 'dddasd', '92925488b28ab12584ac8fcaa8a27a0f497b2c62940c8f4fbc8ef19ebc87c43e', '2018-07-12 23:47:01');

-- ----------------------------
-- Table structure for tb_user_role
-- ----------------------------
DROP TABLE IF EXISTS `tb_user_role`;
CREATE TABLE `tb_user_role`  (
  `user_role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户角色关联表ID',
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  `user_info_id` int(11) DEFAULT NULL COMMENT '用户ID',
  PRIMARY KEY (`user_role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_user_role
-- ----------------------------
INSERT INTO `tb_user_role` VALUES (1, 1, 1);
INSERT INTO `tb_user_role` VALUES (3, 2, 2);

SET FOREIGN_KEY_CHECKS = 1;
