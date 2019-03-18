package com.cloud.sbjm.boot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cloud.sbjm.onput.MailRequest;
import com.cloud.sbjm.onput.MailResponse;
import com.cloud.sbjm.service.MailService;

/**
 * @author ouyangzhicheng
 * @version V1.0
 * @Title: MailController.java
 * @Description: 邮件控制器类
 * @date 2018年2月6日
 */
@Controller
@RequestMapping(value = "/mail")
public class MailController {

    @Autowired
    private MailService mailService;

    @RequestMapping(value = "/sendMail", method = RequestMethod.POST)
    public @ResponseBody
    MailResponse sendMail(@RequestBody MailRequest request) {
        System.out.println(request);
        return mailService.sendMail(request);
    }
}