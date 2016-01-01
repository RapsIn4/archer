// functions that handle the requests

function isValidUrl(url) {
  return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

function trimmedUrl() {
  var trimmed = $('#request-url').val().trim()
  $('#request-url').val(trimmed);
  return trimmed;
}

function sendRequest() {
  var url = trimmedUrl();
  if (!url) {
    alert('Blank Request URL');
    return;
  } else if (!isValidUrl(url)) {
    url = 'http://' + url;

    if (!isValidUrl(url)) {
      alert('Invalid Request URL');
      return;
    }
  }

  var method = $('#request-method').val();

  $.ajax({
    type: method,
    url: url,
    error: function(err) {
      $('#result').text(err);
    },
    success: function(response, status, xhr) { 
      var jsonStr = JSON.stringify(result, null, 2);
      var jsonStr = JSON.stringify(xhr, null, 2);

      var output = $('<code>', {
        text: result
      });

      $('#result').text(jsonStr);
    }
  });
  var sidebarItem = $('<div>', {
    class: "sidebar-item",
    html: $('<div>', {
      class: "col-xs-2 sidebar-item-label",
      text: method
    })
  });

  sidebarItem.append($('<div>', {
    class: "col-xs-10 sidebar-url",
    html: $('<code>', {
      text: url
    })
  }));

  $('#sidebar-list').prepend(sidebarItem);
}


$('#request-form').on('submit', function() {
  sendRequest();
  return false;
});
