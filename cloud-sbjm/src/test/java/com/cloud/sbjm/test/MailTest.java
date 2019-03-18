package com.cloud.sbjm.test;

import javax.mail.internet.MimeMessage;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MailTest {

@Autowired
private JavaMailSender mailSender;

@Value("${spring.mail.username}")
private String Sender_username;

@Test
    public void sendSimpleMail() throws Exception {
    System.out.println("邮件开始发送.....");
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom(Sender_username);
    message.setTo(Sender_username); //自己给自己发送邮件
    message.setSubject("主题：测试");
    message.setText("测试内容");
    mailSender.send(message);
    System.out.println("邮件发送完成！");
    }

@Test
    public void sendHtmlMail() {
        MimeMessage message = null;
        try {
            message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(Sender_username);
            helper.setTo(Sender_username);
            helper.setSubject("标题：发送Html内容");

            StringBuffer sb = new StringBuffer();
            sb.append("<h1>大标题-h1</h1>")
                    .append("<p style='color:#F00'>红色字</p>")
                    .append("<p style='text-align:right'>右对齐</p>");
            helper.setText(sb.toString(), true);
        } catch (Exception e) {
            e.printStackTrace();
        }
        mailSender.send(message);
    }
}