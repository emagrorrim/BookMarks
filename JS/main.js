var host = "https://fathomless-brook-8494.herokuapp.com";
var data = [];
var currentData = [];
var pageNum = 1;
$(document).ready(function(){
  loadJson(host + "/bookmarks/all");
});

function loadJson(url) {
  currentData = [];
  $.get(url,
    function(response,status){
      data = response.bookmarks;
      for (var i = 0; i < data.length; i++) {
        currentData.push(i);
      }
      makelist(data,1);
    }
  );
}

function inputChange(){
  // Search Word
  var str = $('#textField').val();
  resetList(str,1);
};

function resetList(str,page) {
   $("#list").empty();
   $("#pageBtnBar").empty();
   var listdata = [];
   currentData = [];
   for (var i = 0; i < data.length; i++) {
     if (data[i].title.toLowerCase().indexOf(str.toLowerCase()) != -1) {
       listdata.push(data[i]);
       currentData.push(i);
     }
   }
   makelist(listdata,page);
   searchWords(str);
}


function searchWords(str) {
  $("div#listItem").each(function(){
    var title = $(this).find("#listItemTitle");
    var indexs = title.html().match(eval("/" + str + "/ig"));
    indexs = uniqueArray(indexs);
    title.html(modifyHtmlString(title.html(),indexs,indexs.length));
    title.html(title.html().replace(eval("/" + " <" + "/g"),"&nbsp;<"));
  });
}

function uniqueArray(array){
  var n = [];
  for(var i = 0; i < array.length; i++){
    if (n.indexOf(array[i]) == -1) n.push(array[i]);
  }
  return n;
}

function modifyHtmlString(htmlStr,arr,num) {
  if (num <= 0) {
    return htmlStr;
  }
  var subHtmlStrings = htmlStr.split(arr[num-1]);
  var result = modifyHtmlString(subHtmlStrings[0],arr,num-1);
  for (var i = 1; i < subHtmlStrings.length; i++) {
    result = result + "<span id='purpleFont'>" + arr[num-1] + "</span>" + modifyHtmlString(subHtmlStrings[i],arr,num-1);
  }
  return result;
}

function makelist(listData,page) {
  $("#searchBar").find("b").html(listData.length);
  for(var i = (page-1)*10 ; i - (page-1)*10 < 10 && i < listData.length ; i++){
    var listItem1;
    if ("address" in listData[i] && listData[i].address != "") {
      listItem1 = $("<a target='_blank'></a>").text(listData[i].title);
      listItem1.attr('id','listItemTitle');
      listItem1.attr('class','listItemLinkTitle');
      if (listData[i].address.indexOf("http") == 0) {
        listItem1.attr('href',listData[i].address);
      }else {
        listItem1.attr('href',"http://" + listData[i].address);
      }
    }else {
      listItem1 = $("<p></p>").text(listData[i].title);
      listItem1.attr('id','listItemTitle');
    }
    var date = new Date(parseInt(listData[i].created + "000"));
    var listItem2 = $("<p></p>").text(
      "Created@" + date.getFullYear()
      + "-" + (parseInt(date.getMonth())+1)
      + "-" + date.getDate()
    );
    listItem2.attr('id','listItemCreated');
    var line = $("<div></div>").attr('id','line');
    var item = $("<div></div>").attr('id','listItem');

    var deleteBtn = $("<input/>").attr({type: "image",src: "image/trash.png",id: "deleteBtn"});
    deleteBtn.val(currentData[i]);
    pageNum = page;
    deleteBtn.click(function(){
      if (confirm("确定删除该条书签吗？")) {
        deleteBookMarks(listData,parseInt($(this).val()));
      }
    });
    item.append(deleteBtn,listItem1,listItem2,line);
    $("#list").append(item);
  }
  makePagesBtn(listData,page);
}

function makePagesBtn(listData,page) {
  var pages = 0;
  var length = listData.length;
  if (length % 10) {
    pages++;
  }
  pages += (length - (length % 10))/10;
  var pageBtnBar = $("#pageBtnBar");
  for (var i = pages; i > 0; i--) {
    var pageBtn = $('<input/>').attr({type: "button",id: "pageBtn"});
    if (i == page) {
      pageBtn.attr({id: "currentPageBtn"});
    }
    pageBtn.val(i);
    pageBtn.click(function(){
      resetList($('#textField').val(),parseInt($(this).val()));
    });
    pageBtnBar.append(pageBtn);
  }
}

function deleteBookMarks(listData,index) {
  $.post(host+"/bookmarks/delete",
    { 'index': index },
    function(response) {
      if (response.result == "success") {
        data.splice(parseInt(index),1);
        $("#list").empty();
        $("#pageBtnBar").empty();
        resetList($('#textField').val(),pageNum);
      }else {
        alert("删除失败");
      }
    }
  )
}


function addNewBookMarks() {
  $("#cover").show();
}

function coverDismiss() {
  $("#cover").hide();
  $("#errorMsg").hide();
  $("#nameTextField").val("");
  $("#addressTextField").val("")
}

function submitBookMark() {
  if($("#nameTextField").val() == "" || $("#addressTextField").val() == "") {
    $("#errorMsg").show();
    $("#errorMsg").html("请输入正确的书签名称/书签链接");
  }else {
    postChangeToServer("{ title : '" + $("#nameTextField").val()+"', " +
    "address : '" + $("#addressTextField").val() + "'}");
  }
}

function postChangeToServer(msg) {
  var date = Date.parse(new Date());
  var object = {title:$("#nameTextField").val(),created:date/1000 + "",address:$("#addressTextField").val()};
  $.post(host+"/bookmarks/add",
    object,
    function(response) {
      if (response.result == "success") {
        data.splice(0,0,object);
        $("#list").empty();
        $("#pageBtnBar").empty();
        makelist(data,1);
        coverDismiss();
      }else {
        alert("添加失败");
        coverDismiss();
      }
    }
  )
}
