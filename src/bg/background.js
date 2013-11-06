// Generated by CoffeeScript 1.6.3
var ports, requestDomFlags, updateContextMenus,
  __hasProp = {}.hasOwnProperty;

updateContextMenus = function(flags, port) {
  var key, onClickHandler, value, _results;
  onClickHandler = function(info, tab) {
    return port.postMessage({
      name: "contextMenuClick",
      key: info.menuItemId,
      tab: tab
    });
  };
  if (flags.length > 0) {
    _results = [];
    for (key in flags) {
      if (!__hasProp.call(flags, key)) continue;
      value = flags[key];
      _results.push(chrome.contextMenus.create({
        title: value,
        id: "" + key,
        contexts: ['all'],
        onclick: onClickHandler
      }));
    }
    return _results;
  }
};

requestDomFlags = function(tabs, port) {
  return chrome.tabs.sendMessage(tabs[0].id, "Give me domflags", function(response) {
    if (response) {
      return updateContextMenus(response.flags, port);
    }
  });
};

ports = [];

chrome.runtime.onConnect.addListener(function(port) {
  if (port.name !== "devtools") {
    return;
  }
  return chrome.tabs.query({
    lastFocusedWindow: true,
    active: true
  }, function(tabs) {
    var panelClick, tabChange, tabPort;
    ports[tabs[0].id] = {
      port: port,
      portId: port.portId_,
      tab: tabs[0].id
    };
    tabPort = ports[tabs[0].id].port;
    port.onMessage.addListener(function(msg) {
      return requestDomFlags(tabs, tabPort);
    });
    tabChange = function() {
      if (tabPort) {
        return requestDomFlags(tabs, tabPort);
      }
    };
    panelClick = function(message, sender, sendResponse) {
      if (sender.tab.id === tabs[0].id) {
        return port.postMessage({
          name: "panelClick",
          key: message.key
        });
      }
    };
    chrome.tabs.onActivated.addListener(tabChange);
    chrome.runtime.onMessage.addListener(panelClick);
    return port.onDisconnect.addListener(function(port) {
      chrome.contextMenus.removeAll();
      chrome.runtime.onMessage.removeListener(panelClick);
      chrome.tabs.onActivated.removeListener(tabChange);
      return delete ports[tabs[0].id];
    });
  });
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  return chrome.contextMenus.removeAll();
});
