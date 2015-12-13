#BookMarks
- - -
###远端服务器及网页部署
#####**gh-pages:**<http://emagrorrim.github.io/BookMarks>
#####**server:**<https://fathomless-brook-8494.herokuapp.com>
 * 获取所有的bookmarks:<https://fathomless-brook-8494.herokuapp.com/bookmarks/all>
 * 添加一个bookmark:<https://fathomless-brook-8494.herokuapp.com/bookmarks/add>
 
 	post字段{title:"",created:"",address:""};
 
 * 删除一个bookmark:<https://fathomless-brook-8494.herokuapp.com/bookmarks/delete>
 	
 	post字段{index:""};
 	
 	
- - -
 
 
###本地网页服务器部署

#####网页部署
1. 终端下进入/Frond-End
2. 输入指令'gulp'(安装nodejs)
3. 在浏览器中输入"localhost:8080"

#####服务器部署
1. 终端下进入/Back-End
2. 输入指令'python Server.py'(安装python2.7,flask)
3. 在浏览器中输入"localhost:5000/bookmarks/all"

#####测试
1. 终端下进入/Test
2. 输入指令'cucumber'(安装cucumber,firefox浏览器)

