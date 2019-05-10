$(function () {

    if (localStorage.chkbox && localStorage.chkbox != '') {
        $('#customCheck').attr('checked', 'checked');
        $('#exampleInputEmail').val(localStorage.username);
        $('#exampleInputPassword').val(localStorage.pass);
    } else {
        $('#customCheck').removeAttr('checked');
        $('#exampleInputEmail').val('');
        $('#exampleInputPassword').val('');
    }

    $('#customCheck').click(function () {

        if ($('#customCheck').is(':checked')) {
            localStorage.username = $('#exampleInputEmail').val();
            localStorage.pass = $('#exampleInputPassword').val();
            localStorage.chkbox = $('#customCheck').val();
        } else {
            localStorage.username = '';
            localStorage.pass = '';
            localStorage.chkbox = '';
        }
    });
});