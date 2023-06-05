function login() {
    // console.log('loginnnnnnn');
    if (validate_login() != 0) {
        var data = $('#login__form').serialize();
        // console.log(data);
        ajaxPromise(friendlyURL('?module=login&op=login'), 'POST', 'JSON', data)
            .then(function(result) {
                // console.log(result);
                if (result == "error_user") {
                    document.getElementById('error_username_log').innerHTML = "El usario no existe,asegurase de que lo has escrito correctamente"
                } else if (result == "error_passwd") {
                    document.getElementById('error_passwd_log').innerHTML = "La contraseña es incorrecta"
                } else if (result == "activate error") {
                    toastr.error("Not verified");
                } else {
                    localStorage.setItem("heidi", result);
                    toastr.success("Loged succesfully");
                    setTimeout(' window.location.href = friendlyURL("?module=shop"); ', 1000);
                }
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            });
    }
}


function recover(){
    // console.log('funcion recoverrrrr');

    if (validate_recover() != 0) {
        var data = $('#recover__form').serialize();
        // console.log(data);
        ajaxPromise(friendlyURL('?module=login&op=send_recover_email'), 'POST', 'JSON', data)
            .then(function(result) {
                console.log(result);
                // if (result == "error_user") {
                //     document.getElementById('error_username_log').innerHTML = "El usario no existe,asegurase de que lo has escrito correctamente"
                // } else if (result == "error_passwd") {
                //     document.getElementById('error_passwd_log').innerHTML = "La contraseña es incorrecta"
                // } else if (result == "activate error") {
                //     toastr.error("Not verified");
                // } else {
                //     localStorage.setItem("heidi", result);
                //     toastr.success("Loged succesfully");
                //     setTimeout(' window.location.href = friendlyURL("?module=shop"); ', 1000);
                // }
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            });
    }



}

function key_login() {
    $("#login").keypress(function(e) {
        // console.log('boton login');
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            login();
        }
    });
}

function button_login() {
    $('#login').on('click', function(e) {
        // console.log('boton login');
        e.preventDefault();
        login();

    });
}

function button_recover_form() {
    $('#recover_form_btn').on('click', function(e) {
        // console.log('boton recover');
        $('.login').hide();
        $('.recover').show();
        e.preventDefault();
      
    });
}

function button_recover() {
    $('#recover_btn').on('click', function(e) {
        // console.log('boton recover');
        e.preventDefault();
        recover();

    });
}

function validate_login() {
    var error = false;

    if (document.getElementById('username_log').value.length === 0) {
        document.getElementById('error_username_log').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('username_log').value.length < 5) {
            document.getElementById('error_username_log').innerHTML = "El usuario tiene que tener 5 caracteres como minimo";
            error = true;
        } else {
            document.getElementById('error_username_log').innerHTML = "";
        }
    }

    if (document.getElementById('passwd_log').value.length === 0) {
        document.getElementById('error_passwd_log').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        document.getElementById('error_passwd_log').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}



function validate_recover() {
    var error = false;
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;


    if (document.getElementById('email_forg').value.length === 0) {
        document.getElementById('error_email_forg').innerHTML = "Tienes que escribir un correo";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('email_forg').value)) {
            document.getElementById('error_email_forg').innerHTML = "El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_email_forg').innerHTML = "";
        }
    }

    if (error == true) {
        return 0;
    }
}





function load_content() {
    let path = window.location.pathname.split('/');
    console.log(path);
    if(path[4] === 'recover'){
        window.location.href = friendlyURL("?module=login&op=recover_view");
        localStorage.setItem("token_email", path[5]);
    }else if (path[4] === 'verify') {
        // console.log('verificandome');
        ajaxPromise(friendlyURL("?module=login&op=verify_email"), 'POST', 'JSON', {'token_email': path[5]})
        .then(function(data) {
            // console.log(data);
            toastr.options.timeOut = 3000;
            toastr.success('Email verified');
            setTimeout('window.location.href = friendlyURL("?module=login&op=view_login")', 1000);
        })
        .catch(function() {
          console.log('Error: verify email error');
        });
    }else if (path[3] === 'view_login') {
        $(".login-wrap").show();
        $(".forget_html").hide();
    }else if (path[3] === 'recover_view') {
        load_form_new_password();
    }
}

$(document).ready(function() {
    // console.log('patata login');
    $('#header').hide();
    $('#footer').hide();
    $('#menu').hide();
    $('.recover').hide();
    load_content();
    key_login();
    button_login();
    button_recover_form();
    button_recover();
});