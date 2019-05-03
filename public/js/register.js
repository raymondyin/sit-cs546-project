let dropdown = $('#locality-dropdown');
dropdown.empty();

dropdown.append('<option selected="true" disabled>Choose country</option>');
dropdown.prop('selectedIndex', 0);

const url = 'https://gist.githubusercontent.com/Goles/3196253/raw/9ca4e7e62ea5ad935bb3580dc0a07d9df033b451/CountryCodes.json';

// Populate dropdown with list of provinces
$.getJSON(url, function (data) {
  $.each(data, function (key, entry) {
    dropdown.append($('<option></option>').attr('value', entry.code).text(entry.name));
  })
});