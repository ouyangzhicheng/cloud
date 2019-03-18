/**
 * 菜单权限控制
 * 简便而又实用的方式
 * 
 * 使用的方法：将需要拥有角色才能显示的菜单上加上对应的class
 */


function authorityController(){
	//1.从cookie里拿出登录时返回的用户权限
	var roleNames=getCookie("roleNames");
	var roleCodes=getCookie("roleCodes");
	//将字符串拼成JS的list
	var roleCodeArray = roleCodes.split(",");

	//2.用css的class来控制菜单的显示	
	//2.1超级管理员的权限定义class
	$(".authoritySpueradmin").hide();
	
	//2.2管理员的权限定义class
	$(".authorityAdmin").hide();
	
	
	//3.制定不同角色的菜单的显示	
	//3.1超级管理员可以显示的菜单
	if($.inArray("superadmin",roleCodeArray)!=-1){
		console.info("my role is superadmin!!!");
		$(".authoritySpueradmin").show();
		$(".authorityAdmin").show();
	}
	
	//3.2管理员可以显示的菜单
	if($.inArray("admin",roleCodeArray)!=-1){
		console.info("my role is admin!!!");
		$(".authorityAdmin").show();
	}
}
