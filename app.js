chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('main.html', {
    bounds: {
      width: 800,
      height: 600,
      left: 100,
      top: 100
    },
    minWidth: 800,
    minHeight: 600
  });
});

 //onInstalled() event to store local settings using Storage API and storage.sync to prevent loss on reinstall
 //onSuspend() event to do simple clean-up tasks before the event page is unloaded