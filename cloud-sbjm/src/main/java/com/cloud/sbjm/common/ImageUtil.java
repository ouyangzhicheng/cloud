/**
 * @createDate 2013-11-2
 */
package com.cloud.sbjm.common;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ImageUtil {

    private static Logger log = LoggerFactory.getLogger(ImageUtil.class);

    private static String DEFAULT_PREVFIX = "_thumb";
    private static Boolean DEFAULT_FORCE = false;

    public static String saveFile(byte[] img, final String fileExtension, final String basePath) {
        try {
            String realPath = (basePath.lastIndexOf("/") == 0 ? basePath : basePath + "/");
            File fileForde = new File(realPath);
            if (!fileForde.exists()) {
                fileForde.mkdirs();
            }
            String extension = fileExtension;
            String nameWithoutExt = UUID.randomUUID().toString();
            // 获得唯一文件名
            String newFileName = nameWithoutExt + "." + extension;
            String fileUrl = realPath + newFileName;
            // 保存文件
            FileOutputStream out = new FileOutputStream(fileUrl);
            System.out.println("文件下载具体地址：");
            System.out.println(fileUrl);
            out.write(img);
            out.flush();
            out.close();
            return fileUrl;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * <p>Title: thumbnailImage</p>
     * <p>Description: 根据图片路径生成缩略图 </p>
     * @param imagePath    原图片路径
     * @param w            缩略图宽
     * @param h            缩略图高
     * @param prevfix    生成缩略图的前缀
     * @param force        是否强制按照宽高生成缩略图(如果为false，则生成最佳比例缩略图)
     */
    public static void thumbnailImage(File imgFile, int w, int h, String prevfix, boolean force) {
        if (imgFile.exists()) {
            try {
                // ImageIO 支持的图片类型 : [BMP, bmp, jpg, JPG, wbmp, jpeg, png, PNG, JPEG, WBMP, GIF, gif]
                String types = Arrays.toString(ImageIO.getReaderFormatNames());
                String suffix = null;
                // 获取图片后缀
                if (imgFile.getName().indexOf(".") > -1) {
                    suffix = imgFile.getName().substring(imgFile.getName().lastIndexOf(".") + 1);
                }// 类型和图片后缀全部小写，然后判断后缀是否合法
                if (suffix == null || types.toLowerCase().indexOf(suffix.toLowerCase()) < 0) {
                    log.error("Sorry, the image suffix is illegal. the standard image suffix is {}." + types);
                    return;
                }
                log.debug("target image's size, width:{}, height:{}.", w, h);
                BufferedImage img = ImageIO.read(imgFile);
                if (!force) {
                    // 根据原图与要求的缩略图比例，找到最合适的缩略图比例
                    int width = img.getWidth(null);
                    int height = img.getHeight(null);
                    if ((width * 1.0) / w < (height * 1.0) / h) {
                        if (width > w) {
                            h = Integer.parseInt(new java.text.DecimalFormat("0").format(height * w / (width * 1.0)));
                            log.debug("change image's height, width:{}, height:{}.", w, h);
                        }
                    } else {
                        if (height > h) {
                            w = Integer.parseInt(new java.text.DecimalFormat("0").format(width * h / (height * 1.0)));
                            log.debug("change image's width, width:{}, height:{}.", w, h);
                        }
                    }
                }
                Image image = img.getScaledInstance(w, h, Image.SCALE_SMOOTH);
                BufferedImage bi = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);
                Graphics g = bi.getGraphics();
                //g.drawImage(image, 0, 0, w, h, Color.LIGHT_GRAY, null);
                g.drawImage(image, 0, 0, null);
                g.dispose();
                String p = imgFile.getPath();
                String fileName = imgFile.getName();
                String onlyName = fileName.substring(0, imgFile.getName().lastIndexOf("."));
                // 将图片保存在原目录并加上后缀
                ImageIO.write(bi, suffix, new File(p.substring(0, p.lastIndexOf(File.separator)) + File.separator + onlyName + prevfix + "." + suffix));
            } catch (IOException e) {
                log.error("generate thumbnail image failed.", e);
            }
        } else {
            log.warn("the image is not exist.");
        }
    }

    public static void thumbnailImage(String imagePath, int w, int h, String prevfix, boolean force) {
        File imgFile = new File(imagePath);
        thumbnailImage(imgFile, w, h, prevfix, force);
    }

    public static void thumbnailImage(String imagePath, int w, int h, boolean force) {
        thumbnailImage(imagePath, w, h, DEFAULT_PREVFIX, force);
    }

    public static void thumbnailImage(String imagePath, int w, int h) {
        thumbnailImage(imagePath, w, h, DEFAULT_FORCE);
    }
}
