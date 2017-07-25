$ ->
  performSearch = ->
    searchStr = document.getElementById("search-input").value
    searchURL = "https://www.google.com/search?q=site:xtube.com+%22PIN%22+-disabled+#{searchStr}"
    chrome.tabs.create url: searchURL

  $('#search-button').click ->
    console.log "click"
    performSearch()

  $('#search-input').on 'keyup', (e) ->
    if e.keyCode == 13
        e.preventDefault()
        performSearch()
        return false
