(function(){var e,t;t=function(){var e,t;return e=document.getElementById("autoInspectOpen").checked,t=document.getElementById("autoInspectReload").checked,chrome.storage.local.set({autoInspectOpen:e,autoInspectReload:t})},e=function(){return chrome.storage.local.get({autoInspectOpen:!0,autoInspectReload:!0},function(e){return document.getElementById("autoInspectOpen").checked=e.autoInspectOpen,document.getElementById("autoInspectReload").checked=e.autoInspectReload})},$(document).ready(function(){return e(),$("form").on("click","input",function(){return t()})})}).call(this);