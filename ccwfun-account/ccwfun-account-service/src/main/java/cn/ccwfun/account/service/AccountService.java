package cn.ccwfun.account.service;

import cn.ccwfun.account.pojo.User;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class AccountService {
    public User addUser(User user){
        user.setId(new Random().nextInt(100000));
        return user;
    }
}
