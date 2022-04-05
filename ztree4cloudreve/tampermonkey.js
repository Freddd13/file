// ==UserScript==
// @name         Cloudreve Helper
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Submit bt or direct link to cloudreve offline download server
// @author       yunzd
// @match        *://acg.rip/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant           unsafeWindow
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_info
// @grant           GM_xmlhttpRequest
// @grant      GM_getResourceText
// @grant      GM_addStyle
// @resource pathcss https://fastly.jsdelivr.net/gh/Freddd13/file/ztree4cloudreve/css/path.css
// @resource zTreeStyle https://fastly.jsdelivr.net/gh/Freddd13/file/ztree4cloudreve/ztree_v3/css/zTreeStyle/zTreeStyle.css
// @resource ztreeCustom https://fastly.jsdelivr.net/gh/Freddd13/file/ztree4cloudreve/ztree_v3/ztree_custom.css
// @require https://fastly.jsdelivr.net/gh/Freddd13/file/ztree4cloudreve/js/jquery-2.1.1.min.js
// @require https://fastly.jsdelivr.net/gh/Freddd13/file/ztree4cloudreve/ztree_v3/js/jquery.ztree.core-3.5.min.js
// @require https://fastly.jsdelivr.net/gh/Freddd13/file/ztree4cloudreve/ztree_v3/js/jquery.ztree.excheck-3.5.min.js
// @require https://fastly.jsdelivr.net/gh/Freddd13/file/ztree4cloudreve/ztree_v3/js/jquery.ztree.exedit-3.5.min.js
// @require https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/axios/0.26.0/axios.min.js

// ==/UserScript==
GM_addStyle(GM_getResourceText("pathcss"));
GM_addStyle(GM_getResourceText("zTreeStyle"));
GM_addStyle(GM_getResourceText("ztreeCustom"));


const currentUrl = window.location.href;
const baseUrl = window.location.protocol + "//" + window.location.hostname
console.log(baseUrl);
class Cloudreve
{
    constructor() {
        this.userid = '';
        this.userpwd = '';
        this.cap = '';
    }
    readFromStorage(){
    }
    readFromUserInput() {
    }
    checkCloudreve(){
    }
    submitToCloudreve() {
    }
}

class ACGRIP {
    constructor() {
        this.isRunning = true;
        this.initData();
    };
    initData() {
        this.getDownloadUrl();
        this.addDownloadBtn();
    }
    getDownloadUrl() {

    }
    addDownloadBtn() {

    }



}

// tree
let setting = {
    view: {
        showLine: false, //不显示连接线
        //showIcon: showIconForTree //不显示文件夹图标（调用showIconForTree()）
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
            beforeDrag: false,
        onClick: zTreeOnClick
},
};

let cachedNode = [];
async function zTreeOnClick(event, treeId, treeNode) {
    if (cachedNode.indexOf(treeNode.tId) === -1) {
        cachedNode.push(treeNode.tId);
        let thisTree =  $.fn.zTree.getZTreeObj(treeId)
        // 获取新的node
        let newJson = await dealWithPathJson(treeNode.path + '/' + treeNode.name)
        newJson.forEach((item) => thisTree.addNodes(treeNode, item))
}
}
// todo 整理、格式化代码
// 修改nodes属性解决折叠的问题
// 修复css，增加浮动
// 离线下载 直链、BT
// 检测登录是否需要
// 整理到类中

let mydiv=document.createElement("div");
mydiv.className = 'login'
mydiv.innerHTML=`
<div class="content_wrap">
            <div class="zTreeDemoBackground left">
                <ul id="sys" class="ztree"></ul>
            </div>
        </div>
        `
        
document.body.append(mydiv);


function getPathFromCloudreve(path)
{
    let finalUrl = `https://pan.yunzd.cf/api/v3/directory${encodeURIComponent(path)}`
    return new Promise((resolve, reject) => { 
        GM_xmlhttpRequest({
        method: "GET",
        url: finalUrl,
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        onload: function(response){
            console.log("成功");
            resolve(response.response)
        },
        onerror: function(response){
            console.log("失败");
            resolve(response.response)
        }
    }
);
    })
}

async function dealWithPathJson(path) {
    let response = await getPathFromCloudreve(path);
    let after = []
    response = JSON.parse(response).data.objects;
    for(let item of response) {
        if (item.type === 'file') {
            console.log(1)
            continue;
        }
        delete item.size;
        delete item.pic;
        delete item.date;
        delete item.id;
        after.push(item)
}
return after
}




(async function() {
    'use strict';
    const ACGInstance = new ACGRIP();
    //let name = $(".table.table-hover.table-condensed.post-index .action").each( (index,item)=>console.log( $($(item)[0])).firstChild );
    let tmpUrl = [];
    let name = $(".table.table-hover.table-condensed.post-index .action a");
    // https://acg.rip/t/253104.torrent
    // name.each(function(){console.log(`${baseUrl}${$(this).get(0).getAttribute('href')}`)})
    name.each(function(){tmpUrl.push(`${baseUrl}${$(this).get(0).getAttribute('href')}`)})
    name = $(".table.table-hover.table-condensed.post-index thead tr");
    name.append("<th>Cloudreve</th>")

    name = $(".table.table-hover.table-condensed.post-index tbody tr");
    name.each(
        function(){
            $(this).append("<td class='action' id='cloudreve'><i class='fa fa-download'></a></td>");
            $(this).on( "click", function( e ) {console.log('11111')} )
        }
    )

    let data = {"userName":"admin@cloudreve.org","Password":"cloud3365424882","captchaCode":""};
    console.log(name)
    // login
    // GM_xmlhttpRequest({
    //     method: "POST",
    //     url: "https://pan.yunzd.cf/api/v3/user/session",
    //     headers: {
    //         "Content-Type": "application/json; charset=utf-8"
    //     },
    //     data: JSON.stringify(data),
    //     onload: function(response){
    //         console.log("登录成功");
    //         console.log(response.responseText);
    //     },
    //     onerror: function(response){
    //         console.log("请求失败");
    //     }
    // });

    // get storage

    // get paths https://pan.yunzd.cf/api/v3/directory%2F

    let initJson = await dealWithPathJson('/')

    
    $(document).ready(function() {
        $.fn.zTree.init($("#sys"), setting, initJson);
    });

    // GM_xmlhttpRequest({
    //     method: "GET",
    //     url: "https://pan.yunzd.cf/api/v3/directory%2F",
    //     headers: {
    //         "Content-Type": "application/json; charset=utf-8"
    //     },
    //     onload: function(response){
    //         console.log("成功");
    //         console.log(response);
    //     },
    //     onerror: function(response){
    //         console.log("失败");
    //     }
    // });
    // // add directlink download

    // const link = "";
    // data = {"url":"","dst":""};

    // GM_xmlhttpRequest({
    //     method: "POST",
    //     url: "https://pan.yunzd.cf/api/v3/user/session",
    //     headers: {
    //         "Content-Type": "application/json; charset=utf-8"
    //     },
    //     data: JSON.stringify(data),
    //     onload: function(response){
    //         console.log("登录成功");
    //         console.log(response.responseText);
    //     },
    //     onerror: function(response){
    //         console.log("请求失败");
    //     }
    // });





    // acg.rip



    // Your code here...
})();