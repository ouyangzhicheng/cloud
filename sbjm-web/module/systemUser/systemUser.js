   
	//保存弹出层的索引，方便对弹出层进操作
	var layerIndexMap={};
	
	//定义初始化DataTable表格类的方法（工厂模式）
    var DataTable_List=function(){
    	
    	//1.定义JS类(最后记得返回该对象)
    	var obj=new Object();
    	
    	//2.定义类的变量dataTable_List_table，初始化时，赋值为null
    	obj.dataTable_List_table=null;
    	
    	//3.定义类的函数并设置传入参数tableId
    	obj.buildDataTable=function(tableId){
    		
    		//3.1判断是否刚刚初始化，若是则实例化DataTable对象,若否则重画DataTable对象[用于刷新表格数据]。(一个dom里不能同时有2个DataTable对象)
        	if(obj.dataTable_List_table==null){
        		
        		//3.1.1初始化表格数据并赋值给变量dataTable_List_table，用以判断是否已经初始化DataTable
        		obj.dataTable_List_table=$("#"+tableId).DataTable({
                	"bScrollX": "100%",
        			"sScrollXInner": "120%",
        			"bScrollCollapse": true,
        			"bFilter": false, //是否启动过滤、搜索功能  
        			"bAutoWidth": false, //是否自适应宽度  
        			"bSort": false,//是否允许排序
        			"bServerSide": true,
        			"bStateSave": false,
        			"aLengthMenu": [5, 10, 20, 50, 100], //更改显示记录数选项  
        			"iDisplayLength": 10, //默认显示的记录数  
        			"sAjaxSource": '/user/findUserList',
        			"fnServerParams": function(aoData) {
        				aoData.push({
        					"name": "tureName",
        					"value": $('#search_tureName').val()
        				});

        			},
        			"fnServerData": function(sSource, aoData, fnCallback) {
        				var postData = {};
        				for(var i in aoData) {
        					if(aoData[i].name == "tureName") {
        						postData.tureName = aoData[i].value;
        					} else if(aoData[i].name == "iDisplayStart") {
        						postData.start = aoData[i].value;
        					} else if(aoData[i].name == "iDisplayLength") {
        						postData.limit = aoData[i].value;
        					} else if(aoData[i].name == "sEcho") {
        						postData.sEcho = aoData[i].value;
        					} else if(aoData[i].name == "iSortCol_0") {

        					} else if(aoData[i].name == "sSortDir_0") {
        						postData.sortDir = aoData[i].value;
        					}
        				}
        				postData.startPage = postData.start/postData.limit+1;
        				var index_loading = layer.load(2, {
        					time: 10 * 1000
        				});
        				appSend.postCloud("/user/findUserList",postData,{},function(result){
        					layer.close(index_loading);
        					if(result.code == 0) {
        						var json = {};
        						json.sEcho = postData.sEcho;
        						json.iTotalRecords = result.total;
        						json.iTotalDisplayRecords = result.total;
        						json.aaData = result.data;
        						fnCallback(json);								
        					}	
        				});
        			},
        			"fnInitComplete": function() {
        				this.fnAdjustColumnSizing(true);
        			},
        			"fnDrawCallback": function(){
        				var api = this.api();
        				var startIndex = api.context[0]._iDisplayStart;//获取到本页开始的条数
        				api.column(0).nodes().each(function(cell, i) {
        					cell.innerHTML = startIndex + i + 1;
        				}); 
        			},
        			"aoColumnDefs": [{
        				"orderable": false,
        				"aTargets": [ 1, 2, 3, 4, 5]
        			}, {
        				"sWidth": "30px",
        				"aTargets": [0]
        			}, {
        				"sWidth": "200px",
        				"aTargets": [1,2,3,4,5]
        			}],
        			columns: [
        			          {data: "userInfoId"},
        			          {data: "tureName"}, 
        			          {
					        	  //显示性别
					        	  data: null,
									render: function(data, type, row) {
										
										return data.sex==1?"男":"女";
									}
					          },
        			          {data: "birthday"}, 
        			          {data: "briefIntroduction"}, 
        			          {
					        	  //显示编辑和删除按钮
					        	  data: null,
									render: function(data, type, row) {
										var htmls='';
										htmls+='<button class="btn btn-default" onclick="loadEditUserFrame('+data.userInfoId+')">编辑</button>&nbsp;&nbsp;<button class="btn btn-default" onclick="deleteUser('+data.userInfoId+')">删除</button>';
										return htmls;
									}
					          },      
        			],
        			 "oLanguage": {
        					"sSearch": " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;搜索",
        					"sLengthMenu": "每页显示 _MENU_",
        					"sZeroRecords": "没有检索到数据",
        					"sInfo": "显示 _START_ 至 _END_ 条 &nbsp;&nbsp;共 _TOTAL_ 条 &nbsp;&nbsp;",
        					"sInfoFiltered": "(筛选自 _MAX_ 条数据)",
        					"sInfoEmpty": "显示 0 至 0 条;共 0 条&nbsp;&nbsp;",
        					"sProcessing": "数据加载中...",
        					"oPaginate": {
        						"sFirst": "首页",
        						"sPrevious": "前一页",
        						"sNext": "后一页",
        						"sLast": "末页"
        					}
        				}
                });
        		
        	}else{
        		//3.1.2刷新表格数据
        		obj.dataTable_List_table.clear(); //清空
        		obj.dataTable_List_table.draw(); //重新加载数据
        	}
    	} 	  	
    	return obj;
    } 
    
    
    //创建初始化DataTable表格类的对象
    var dataTable_List=new DataTable_List();
    
    /**获取图片文件**/
    var iconBase64_file = document.getElementById("iconBase64_file");

    /**获取图片**/
    var iconBase64_img = document.getElementById("iconBase64_img");
       
    //定义保存原有的角色
    var oldRoleIds=new Array();
    
    //保存修改之后的角色
    var newRoleIds = new Array();
    
    //定义保存增加角色的列表（用于增加或修改权限）
    var addRoleIds=new Array();
    
    //定义保存删除的角色
    var delRoleIds=new Array();
    
    //页面加载完成之后执行
    $(function(){
    	
    	//调用DataTable表格对象的buildDataTable方法进行初始化表格，传入表格Id
    	dataTable_List.buildDataTable("systemUserTable");
    	
    	//开启权限控制
    	authorityController()
    	
    	if(typeof(FileReader) === 'undefined') {
    		layer.alert("请换浏览器");
    		iconBase64_file.setAttribute('disabled', 'disabled');
    	} else {
    		iconBase64_file.addEventListener('change', readFile, false);
    	}
    })
    
    
    /**读取上传的文件**/
	function readFile() {
		var file = this.files[0];
		//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
		if(!/image\/\w+/.test(file.type)) {
			layer.alert(language.ensurePicType);
			return false;
		}
		var reader = new FileReader();
		if(file.size>300000){
			layer.alert("图片过大");
			return;
		}
		reader.readAsDataURL(file);
		reader.onload = function(e) {
			iconBase64_img.src = this.result;
			$("#iconBase64").val(this.result.split(",")[1]);
			
		}
	}
    
    
    //重画DataTable的表格数据
    var searchReload=function(){
    	//重画（之所以跟初始化表格时调用一样的方法，是因为我在方法里有进行是否第一次初始化的判断）
    	dataTable_List.buildDataTable("systemUserTable");
    }
    
    //弹出添加用户窗口
    var displayAddUserFrame=function(){
    	$("#accountId").removeAttr("disabled");
    	loadRoleList([]);
    	var addUser_layer = layer.open({
    		  type: 1,
    		  title: "添加用户信息",
    		  closeBtn: 1,
    		  area: ['950px', '710px'],
  		  	  skin: 'sbjm_edit_layer',
    		  content: $(".addOrEdit_systemUser"),
    		  btn: ["保存", "取消"],//可以添加多个按钮
    		  yes: function(index, layero){		
    			  //检验提交的form表单下的文本框
    			  if($("#addOrEdit_systemUserForm").valid()){
 	        	  	 addUser($("#addOrEdit_systemUserForm")[0]);	        	  	
    			  }else{
 		  		  alert("检验不通过");
    			  }
    		  },
    		  btn2: function(index, layero){		  
    			  fromReset("addOrEdit_systemUserForm");		
    			  $("#iconBase64_img").attr("src",null);
    		  },
    		  cancel: function(index, layero){ 
    			  fromReset("addOrEdit_systemUserForm");
    			  $("#iconBase64_img").attr("src",null);
    		  }
    	});
    	//保存该添加用户窗口的索引
    	layerIndexMap.addUser_layer=addUser_layer;
    }
    
    //弹出编辑用户窗口
    var displayEditUserFrame=function(){    
    	var editUser_layer = layer.open({
  		  type: 1,
  		  title: "编辑用户信息",
  		  closeBtn: 1,
		  area: ['950px', '710px'],
		  skin: 'sbjm_edit_layer',
  		  content: $(".addOrEdit_systemUser"),
  		  btn: ["保存", "取消"],//可以添加多个按钮
  		  yes: function(index, layero){		
  			 //检验提交的form表单下的文本框
			  if($("#addOrEdit_systemUserForm").valid()){
				  updateUser($("#addOrEdit_systemUserForm")[0]);				 
			  }else{
		  		  alert("检验不通过");
			  }
  	         
  		  },
  		  btn2: function(index, layero){		  
  			  fromReset("addOrEdit_systemUserForm");		
  			  $("#iconBase64_img").attr("src",null);
  		  },
  		  cancel: function(index, layero){ 
  			  fromReset("addOrEdit_systemUserForm");
  			  $("#iconBase64_img").attr("src",null);
  		  }
  	});
    	//保存该修改用户窗口的索引
    	layerIndexMap.editUser_layer=editUser_layer;
    }
    
    //根据ID获取用户
    var loadEditUserFrame=function(userInfoId){
    	var postData={};
    	postData.userInfoId=userInfoId;
    	var index_loading=layer.load(2, {time: 10 * 1000});
    	appSend.postCloud("/user/findUserById",postData,{},function(result){
    		layer.close(index_loading);
    		var userVo=result.uservo;
    		console.info(userVo);
    		//1.填充编辑框
    		$("#userInfoId").val(userVo.userInfoId);
    		$("#iconBase64_img").attr("src",imagesUrl+userVo.iconUrl);
    		$("#iconUrl").val(userVo.iconUrl);
    		$("#createTime").val(userVo.createTime);
            $("#accountId").val(userVo.accountId);
    		$("#userName").val(userVo.userName);
    		$("#userNumber").val(userVo.userNumber);
    		$("#nickName").val(userVo.nickName);
    		$("input[name='sex'][value='" + userVo.sex + "']")[0].checked = true;
    		$("#phone").val(userVo.phone);
    		$("#email").val(userVo.email);
    		$("#tureName").val(userVo.tureName);
    		$("#birthday").val(userVo.birthday);
    		$("#briefIntroduction").val(userVo.briefIntroduction);
    		$("input[name='status'][value='" + userVo.status + "']")[0].checked = true;
    		
    		//2.设置只读文本框
    		$("#accountId").attr("disabled","disabled");
    		  		
    		//3加载角色选择文本框
    		loadRoleList(userVo.roles);
    		//显示编辑窗口
    		displayEditUserFrame();
    	});
    }
    
    //添加用户
    var addUser=function(form){
    	var objList=$(form).serializeArray();
    	var postData = {};
    	
    	for(var i in objList){
    		var name = objList[i].name;
    		if(name == "roleId"){ //封装复选框的值
    			newRoleIds.push(objList[i].value);
    		}
    		else{
    			postData[name]= objList[i].value;
    		}   	
    	}
    	
    	//根据新接收的角色和旧的角色来判断是否有---增加角色   	
		for(var j in newRoleIds){
			var hasValue=false;
			for(var k in oldRoleIds){
				if(newRoleIds[j]==oldRoleIds[k]){
					hasValue=true;
					break;
				}
			}
			if(!hasValue){
				addRoleIds.push(newRoleIds[j]);
			}
			
		}
		postData.addRoleIds=addRoleIds;
    	
    	var index_loading = layer.load(2, {
    							time: 10 * 1000
    						});
    	appSend.postCloud("/user/saveSystemUser",postData,{},function(result){
    							layer.close(index_loading);
    							if(result.code  == 0) {    								
    								layer.msg("添加用户成功");
    								//重画用户列表
    								dataTable_List.buildDataTable("systemUserTable");
    								//关闭添加用户的弹出层
    								layer.close(layerIndexMap.addUser_layer);
    								fromReset("addOrEdit_systemUserForm");
    							}else{
    								layer.alert(result.code);
    							}
    	});
    }
    
    //修改用户
    var updateUser=function(form){
    	var objList=$(form).serializeArray();
    	var postData = {};
    	console.info(objList);
    	for(var i in objList){
    		var name = objList[i].name;
    		if(name == "roleId"){ //封装复选框的值
    			newRoleIds.push(objList[i].value);
    		}
    		else{
    			postData[name]= objList[i].value;
    		}   		 		
    	}
    	
    	//根据新接收的角色和旧的角色来判断是否有---增加角色   	
		for(var j in newRoleIds){
			var hasValue=false;
			for(var k in oldRoleIds){
				if(newRoleIds[j]==oldRoleIds[k]){
					hasValue=true;
					break;
				}
			}
			if(!hasValue){
				addRoleIds.push(newRoleIds[j]);
			}
			
		}
		postData.addRoleIds=addRoleIds;
		
		
		//根据新接收的角色和旧的角色来判断是否有---删除角色   
    	for(var o in oldRoleIds){
    		var hasVlaue=false;
    		for(var g in newRoleIds){
    			if(newRoleIds[g]==oldRoleIds[o]){
    				hasVlaue=true;
    				break;
    			}
    		}
    		if(!hasVlaue){
    			delRoleIds.push(oldRoleIds[o]);
    		}
    	}
    	postData.delRoleIds=delRoleIds;
    	var index_loading = layer.load(2, {
    							time: 10 * 1000
    						});
    	
    	//添加form表单过滤漏掉的参数（input属性disable设为disable时，form不会把该input提交）
    	postData.createTime=$("#createTime").val();
    	postData.userName=$("#userName").val();
    	postData.userNumber=$("#userNumber").val();
    	
    	appSend.postCloud("/user/editSystemUser",postData,{},function(result){
    							layer.close(index_loading);
    							if(result.code  == 0) {    								
    								layer.msg("修改用户成功");
    								//重画用户列表
    								dataTable_List.buildDataTable("systemUserTable");
    								//关闭添加用户的弹出层
    								layer.close(layerIndexMap.editUser_layer);
    								 fromReset("addOrEdit_systemUserForm");
    							}else{
    								layer.alert(result.code);
    							}
    	});
    }
    //删除用户
    var deleteUser=function(userInfoId){
    	
    	var postData={};
    	postData.userInfoId=userInfoId;
		layer.confirm("谨慎删除，删除会完全清除该用户！如非必要，将其停用即可", {
			btn: ["确定","取消"] //按钮
			}, function(){
				
			var index_loading = layer.load(2, {
					time: 10 * 1000
				});
				appSend.postCloud("/user/deleteSystemUser",postData,{},function(result){
					layer.close(index_loading);
					if(result.code  == 0) {
						//重画用户列表
						dataTable_List.buildDataTable("systemUserTable");
						layer.msg("删除成功");
					}else{
						layer.alert(result.code);
					}
			});
				layer.closeAll('dialog'); //关闭框						
			});
    }
    
    /**清空表单**/
    var fromReset=function(fromid){
    	document.getElementById(fromid).reset();
    	$("#"+fromid).find("input[type='hidden']").each(function(){
    		$(this).val("");
    	});
    	$("#"+fromid).find("input").each(function(){
    		//$(this).removeAttr("disabled");
    	});
    	$("#"+fromid).find("select").each(function(){
    		$(this).removeAttr("disabled");
    	});
    	$("#"+fromid).find("input[type='file']").each(function(){
    		$(this).val("");
    	});
    	$("#"+fromid).find("img").each(function(){
    		$(this).removeAttr("src");
    	});
    	$("#"+fromid).find("input[type='checkbox']").each(function(){
    		$(this).attr("checked",false);
    	});	
        //清空保存原有的角色列表
        oldRoleIds=[];
        
        //清空保存修改之后的角色列表
        newRoleIds =[];
        
        //清空保存增加角色的列表（用于增加或修改权限）
        addRoleIds=[];
        
        //清空保存删除的角色列表
        delRoleIds=[];
    }
    /**展示待上传的图片**/
    function showIcon(){
    	var pic = $("#iconBase64_img").attr("src");
    	if(!pic){
    		return;
    	}
    	var naturalHeight = $("#iconBase64_img")[0].naturalHeight;
    	var naturalWidth = $("#iconBase64_img")[0].naturalWidth;
    	$("#iconBase64_big_img").attr("src", pic);
    	$("#iconBase64_big_img").removeAttr("height");
    	$("#iconBase64_big_img").removeAttr("width");
    	layer.open({
    		  type: 1,
    		  title: '',
    		  closeBtn: 1,
    		  area: ['750px', '580px'],
    		  scrollbar: false,
    		  skin: 'club_edit_layer',
    		  content: $(".showBigIcon"),
    		  //btn: [language.closeText],
    		  success: function(layero, index){
    				$(".showBigIcon").css({
    					"width": "100%",
    					"height": "100%",
    					"line-height": layero[0].clientHeight + "px",
    					"overflow": "hidden"
    				});
    				if((naturalWidth / naturalHeight) > (layero[0].clientWidth / layero[0].clientHeight)) {
    					$("#iconBase64_big_img").attr("width", "100%");
    				} else {
    					$("#iconBase64_big_img").attr("height", '100%');
    				}
    		  },
    		  yes: function(index, layero){
    		  },
    		  cancel: function(index, layero){ 
    			  $("#iconBase64_big_img").attr("src", "");
    		  }
    	});
    }
    
    /**加载角色选择**/   
    var loadRoleList=function(roles){
    	var postData={};
    	appSend.postCloud("/user/queryAllRole",postData,{},function(result){
			var roleList=result.roleList;
			var checkboxHtml="";
			if(result.code  == 0) {			
				for(var i in roleList){
				
					checkboxHtml += '<span name="'+roleList[i].roleCode+'"><input id="'+roleList[i].roleCode+'" class="radio_input" type="checkbox" name="roleId" value="'+roleList[i].roleId+'"><label for="'+roleList[i].roleId+'" >'+roleList[i].roleName+'</label>&nbsp;&nbsp;&nbsp;&nbsp;</span>'
				}			
				if(checkboxHtml != ''){
					$("#roleDiv").html(checkboxHtml);
					for(var j in roles){
						console.info(roles[j].roleCode);
						oldRoleIds.push(roles[j].roleId);
						$("#"+roles[j].roleCode).attr("checked",true);	
					}		
					$('#roleDiv span[name=superadmin]').addClass("authoritySpueradmin");
				}
				authorityController()
			}else{
				layer.alert(result.code);
			}
	});
    }