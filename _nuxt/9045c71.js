(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{351:function(t,e,r){"use strict";r.r(e);var n=r(9),o=(r(19),r(122),r(60),{name:"write",mixins:[r(155)],data:function(){var t,e=this;return{"분류":"자유","제목":"","내용":"",Options:{language:"ko",hooks:{addImageBlobHook:(t=Object(n.a)(regeneratorRuntime.mark((function t(r,n){var o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.imgUpLoad(r);case 2:return o=t.sent,n(o,"addImage"),t.abrupt("return",!1);case 5:case"end":return t.stop()}}),t)}))),function(e,r){return t.apply(this,arguments)})}}}},methods:{"글등록":function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,param,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.유저아이디){e.next=3;break}return t.페이지이동("login"),e.abrupt("return");case 3:if(t.분류){e.next=6;break}return alert("분류를 선택해 주세요."),e.abrupt("return");case 6:if(t.제목){e.next=9;break}return alert("제목을 입력해 주세요."),e.abrupt("return");case 9:if(t.$refs.내용.invoke("getMarkdown")){e.next=12;break}return alert("내용을 입력해 주세요."),e.abrupt("return");case 12:if(null==(r=t.$refs.내용.invoke("getMarkdown").match(/\[addImage\]/g))){e.next=17;break}if(!(r.length>10)){e.next=17;break}return alert("이미지는 최대 10개까지만 첨부 가능합니다."),e.abrupt("return");case 17:return param={id:t.유저아이디,nickname:t.유저닉네임,category:t.분류,subject:t.제목,content:t.$refs.내용.invoke("getMarkdown"),file:0},null!=r&&(param.file=1),e.next=21,t.$axios.post("/write",t.$qs.stringify(param));case 21:200==(n=e.sent).data.code?t.라우터이동("../view",{bd_no:n.data.bd_no}):alert("오류가 발생했습니다.");case 23:case"end":return e.stop()}}),e)})))()},imgUpLoad:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var data,n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return(data=new FormData).append("img",t),r.next=4,e.$axios.post("http://50.16.27.105:3001/upload",data);case 4:if(200!=(n=r.sent).data.code){r.next=9;break}return r.abrupt("return","http://50.16.27.105:3001/"+n.data.file.filename);case 9:alert("오류가 발생했습니다.");case 10:case"end":return r.stop()}}),r)})))()},"취소":function(){history.go(-1)}}}),c=o,l=r(21),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"px-4"},[r("div",{staticClass:"select is-primary"},[r("select",{directives:[{name:"model",rawName:"v-model",value:t.분류,expression:"분류"}],on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.분류=e.target.multiple?r:r[0]}}},[r("option",[t._v("자유")]),t._v(" "),r("option",[t._v("유머")]),t._v(" "),r("option",[t._v("이슈")])])]),t._v(" "),r("div",{staticClass:"mt-2"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.제목,expression:"제목"}],staticClass:"input is-primary",attrs:{type:"text",placeholder:"제목"},domProps:{value:t.제목},on:{input:function(e){e.target.composing||(t.제목=e.target.value)}}})]),t._v(" "),r("editor",{ref:"내용",staticClass:"mt-2",attrs:{height:"500px",initialEditType:"wysiwyg",options:t.Options}}),t._v(" "),r("div",{staticClass:"buttons mt-3",staticStyle:{float:"right"}},[r("button",{staticClass:"button is-light",on:{click:function(e){t.취소()}}},[t._v("취소")]),t._v(" "),r("button",{staticClass:"button is-primary",on:{click:function(e){t.글등록()}}},[t._v("작성완료")])])],1)])}),[],!1,null,null,null);e.default=component.exports}}]);