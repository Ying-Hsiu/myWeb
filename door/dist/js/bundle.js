!function e(n,r,i){function t(a,o){if(!r[a]){if(!n[a]){var c="function"==typeof require&&require;if(!o&&c)return c(a,!0);if(v)return v(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var s=r[a]={exports:{}};n[a][0].call(s.exports,function(e){var r=n[a][1][e];return t(r||e)},s,s.exports,e,n,r,i)}return r[a].exports}for(var v="function"==typeof require&&require,a=0;a<i.length;a++)t(i[a]);return t}({1:[function(e,n,r){"use strict";$(function(){var e,n;return console.log("hello!!!!"),n=0,$("#wave-panel").on("click",function(r){var i,t;return i=r.clientX-150,t=r.clientY-200,n+=1,e(i,t,n)}),e=function(e,n,r){var i,t;return i='<div class="wave"></div>\n<div class="wave"></div>\n<div class="wave"></div>\n<div class="wave"></div>\n<div class="wave"></div>\n<div class="wave"></div>',t='<div class="wave-container" id="wave'+r+'" style="top:'+n+"px;left:"+e+'px">'+i+"</div>",$("#wave-panel").append($(t)),setTimeout(function(){$("#wave"+r).remove()},3e3)}})},{}]},{},[1]);
//# sourceMappingURL=bundle.js.map
