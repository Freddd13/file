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

(function() {
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
    function dealPathJson(path='/') {
        let finalUrl = `https://pan.yunzd.cf/api/v3/directory${encodeURIComponent(path)}`
        let after = [];
        GM_xmlhttpRequest({
        method: "GET",
        url: finalUrl,
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        onload: function(response){
            console.log("成功");
            let myjson = JSON.parse(response.response).data.objects;
            for(let item of myjson) {
                if (item.type === 'file') {
                    continue;
                }
                item.cache = 0;
                delete item.size;
                delete item.pic;
                delete item.date;
                delete item.id;
                after.push(item)
            }

            console.log(typeof myjson)
            console.log(after)
        },
        onerror: function(response){
            console.log("失败");
        }
    });
        return after;
    }

    dealPathJson();

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
    function zTreeOnClick(event, treeId, treeNode) {
        if (cachedNode.indexOf(treeNode.tId) === -1) {
            cachedNode.push(treeNode.tId);
            // imitate
            // 折叠之后的问题，event
            // if  get dealed json not empty:
            let thisTree =  $.fn.zTree.getZTreeObj(treeId)
            thisTree.addNodes(treeNode,{ name: 'Music', path: '/', type: 'dir' })

}
}

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

    $(document).ready(function() {
        $.fn.zTree.init($("#sys"), setting, after);
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