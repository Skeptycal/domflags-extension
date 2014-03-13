// Generated by CoffeeScript 1.6.3
(function() {
  var port, showDomFlag;

  showDomFlag = function(key) {
    return chrome.devtools.inspectedWindow["eval"]("inspect($$('[domflag]')[" + key + "])");
  };

  showDomFlag(0);

  port = chrome.runtime.connect({
    name: "devtools"
  });

  port.postMessage({
    msg: "initiate"
  });

  port.onMessage.addListener(function(msg) {
    if (msg.name === "contextMenuClick" || "panelClick" || "pageReloaded") {
      return showDomFlag(msg.key);
    }
  });

}).call(this);
