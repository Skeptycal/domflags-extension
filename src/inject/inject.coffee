#### CONTENT SCRIPT
@toggleDomflag = (el) ->
  if el.hasAttribute('domflag')
    el.removeAttribute('domflag', '')
  else
    el.setAttribute('domflag', '')

class startXPin
  constructor: ->
    @newURL = undefined
    @username = undefined
    @checkDomain()

  checkDomain: ->
    urlArray = window.location.pathname.split "/"
    return if !document.getElementById('postPinForm')
    if urlArray[1] == "video-watch"
      pathStr = urlArray[urlArray.length - 1]
      @newURL = "http://www.xtube.com/video-watch/embedded/" + pathStr
      @username = document.querySelector('.userInfoRow .nickname').innerHTML
      @appendButton()

  appendButton: ->
    cssPath = chrome.extension.getURL("src/inject/inject.css")
    styleTag = """<style type="text/css" media="screen">@import url(#{cssPath});</style>"""
    panelHTML =  """
            <xpin-panel id="xpin-panel" class="bottom">
              <a class="pin" href="#{@newURL}">BYPASS PIN</a>
              <a class="search" href="https://www.google.com/search?q=site:xtube.com+%22PIN%22+#{@username}">MORE...</a>
            </xpin-panel>
            """
    unless document.getElementById('xpin-root')?
      rootEl = document.createElement 'xpin'
      rootEl.setAttribute "id", "xpin-root"
      document.body.appendChild(rootEl, document.body.childNodes[0])
      @shadowRoot = document.getElementById('xpin-root').createShadowRoot()
      @shadowRoot.innerHTML = styleTag
    @shadowRoot.innerHTML += panelHTML
    # @button = @shadowRoot.getElementById('xpin-panel')

  # createPanelListeners: ->
  #   @button.addEventListener 'click', (event) =>
  #     # urlPath = window.location.pathname.split "/"
  #     # lastPath = urlPath[urlPath.length - 1]
  #     console.log "Clicked"

## Start inject script
new startXPin
