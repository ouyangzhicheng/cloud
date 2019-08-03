package cn.ccwfun.account.web;

import cn.ccwfun.account.pojo.User;
import cn.ccwfun.account.service.AccountService;

import cn.ccwfun.common.enums.ExceptionEnum;
import cn.ccwfun.common.exception.CfException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/get/{id}")
    @ResponseBody
    public String test(@PathVariable("id") Integer id){
        System.out.print(id);
        return "success";
    }

    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<User> saveUser(@RequestBody User user){

    if(StringUtils.isBlank(user.getUserName())){
        //全局异常处理，返回restful风格错误码
        throw new CfException(ExceptionEnum.USER_NAME_CANNOT_BE_NULL);
    }
    User adduser=accountService.addUser(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(adduser);
    }

}
