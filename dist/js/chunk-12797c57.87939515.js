(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-12797c57"],{"0ccb":function(t,n,e){var i=e("50c4"),a=e("1148"),r=e("1d80"),s=Math.ceil,o=function(t){return function(n,e,o){var c,u,l=String(r(n)),f=l.length,d=void 0===o?" ":String(o),h=i(e);return h<=f||""==d?l:(c=h-f,u=a.call(d,s(c/d.length)),u.length>c&&(u=u.slice(0,c)),t?l+u:u+l)}};t.exports={start:o(!1),end:o(!0)}},1148:function(t,n,e){"use strict";var i=e("a691"),a=e("1d80");t.exports="".repeat||function(t){var n=String(a(this)),e="",r=i(t);if(r<0||r==1/0)throw RangeError("Wrong number of repetitions");for(;r>0;(r>>>=1)&&(n+=n))1&r&&(e+=n);return e}},"12aa":function(t,n,e){},"3a5e":function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement;t._self._c;return t._m(0)},a=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"loading"},[e("div",[e("i"),e("i"),e("i")])])}],r=(e("f537"),e("2877")),s={},o=Object(r["a"])(s,i,a,!1,null,"656d67de",null);n["a"]=o.exports},"4d90":function(t,n,e){"use strict";var i=e("23e7"),a=e("0ccb").start,r=e("9a0c");i({target:"String",proto:!0,forced:r},{padStart:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},5576:function(t,n,e){"use strict";e("8f24")},"8f24":function(t,n,e){},"99af":function(t,n,e){"use strict";var i=e("23e7"),a=e("d039"),r=e("e8b5"),s=e("861d"),o=e("7b0b"),c=e("50c4"),u=e("8418"),l=e("65f0"),f=e("1dde"),d=e("b622"),h=e("2d00"),g=d("isConcatSpreadable"),m=9007199254740991,v="Maximum allowed index exceeded",p=h>=51||!a((function(){var t=[];return t[g]=!1,t.concat()[0]!==t})),b=f("concat"),_=function(t){if(!s(t))return!1;var n=t[g];return void 0!==n?!!n:r(t)},w=!p||!b;i({target:"Array",proto:!0,forced:w},{concat:function(t){var n,e,i,a,r,s=o(this),f=l(s,0),d=0;for(n=-1,i=arguments.length;n<i;n++)if(r=-1===n?s:arguments[n],_(r)){if(a=c(r.length),d+a>m)throw TypeError(v);for(e=0;e<a;e++,d++)e in r&&u(f,d,r[e])}else{if(d>=m)throw TypeError(v);u(f,d++,r)}return f.length=d,f}})},"9a0c":function(t,n,e){var i=e("342f");t.exports=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i)},e864:function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container_hot"},[e("div",{staticClass:"hotsong"},[e("div",{staticClass:"top_img"},[e("div",{staticClass:"bg_img hot_icon"}),e("div",{staticClass:"hot_time"},[t._v("更新日期 : "+t._s(t.Month)+"月"+t._s(t.Day)+"日")])])]),t._l(t.newHotMusicitem,(function(n,i){return e("Musicitem",{key:n.id,attrs:{playerlist:t.newHotMusicitem,num:i+1,item:n,tag:"li",to:""}},[e("div",{staticClass:"li_title"},[t._v(t._s(t._f("spg1_length")(i+1)))])])})),t.newHotMusicitem<=0?e("Loading"):t._e(),t.more?e("div",{staticClass:"hot_bottom"},[e("span",{staticClass:"hotview",on:{click:t.full_list}},[t._v("查看完整榜单")])]):t._e()],2)},a=[],r=(e("99af"),e("d81d"),e("fb6a"),e("b0c0"),e("d3b7"),e("25f0"),e("4d90"),e("b85c")),s=e("d0d1"),o=e("3a5e"),c={components:{Musicitem:s["a"],Loading:o["a"]},data:function(){return{Month:"",Day:"",newHotMusicitem:[],more:!1,musicids:[],num:0}},methods:{full_list:function(){var t=this;this.$http.defaults.baseURL="http://music.kele8.cn";var n=[],e="";this.num++,this.$http.get("/top/list?idx=1").then((function(e){console.log(e),n=e.data.playlist.trackIds.slice(20*t.num,20*(t.num+1))})).then((function(){var t,i=Object(r["a"])(n);try{for(i.s();!(t=i.n()).done;){var a=t.value;e=e+a.id+","}}catch(s){i.e(s)}finally{i.f()}e=e.substring(0,e.length-1)})).then((function(){var n=[];t.$http.get("song/detail?ids="+e).then((function(e){n=e.data.songs.map((function(t){return{name:t.name,id:t.id,song:{artists:[{name:t.al.name}],privilege:{maxbr:t.h.br}}}})),t.newHotMusicitem=t.newHotMusicitem.concat(n)}))}))}},filters:{spg1_length:function(t){return t.toString().length>1?"".concat(t):"0".concat(t)}},beforeRouteEnter:function(t,n,e){e((function(t){t.$http.defaults.baseURL="http://music.kele8.cn";var n="";t.$http.get("/top/list?idx=1").then((function(n){t.musicids=n.data.playlist.trackIds.slice(0,20)})).then((function(){var e,i=Object(r["a"])(t.musicids);try{for(i.s();!(e=i.n()).done;){var a=e.value;n=n+a.id+","}}catch(s){i.e(s)}finally{i.f()}})).then((function(){n=n.substring(0,n.length-1),t.$http.get("song/detail?ids="+n).then((function(n){t.newHotMusicitem=n.data.songs.map((function(t){return{name:t.name,id:t.id,song:{artists:[{name:t.al.name}],privilege:{maxbr:t.h.br}}}})),t.more=!0}))}))}))},mounted:function(){var t=new Date;this.Month=t.getMonth()+1,this.Day=t.getDate().toString().padStart(2,"0")}},u=c,l=(e("5576"),e("2877")),f=Object(l["a"])(u,i,a,!1,null,"791f7fb0",null);n["default"]=f.exports},f537:function(t,n,e){"use strict";e("12aa")}}]);
//# sourceMappingURL=chunk-12797c57.87939515.js.map