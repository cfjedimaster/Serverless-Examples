
let lock;
let idToken;

$(document).ready( () => {
    console.log('lets do this');

    lock = new Auth0Lock('asKI36rzsbOyY40DaGv6mPWODbexIO-R','raymondcamden.auth0.com');

    $('#loginBtn').on('click',doLogin);

    $('#testFooBtn').on('click',doTestFoo);

    idToken = localStorage.getItem('id_token');
    if(idToken) {
        getProfile();
    }

    lock.on("authenticated", function(authResult) {
        console.dir(authResult);
        localStorage.setItem('id_token', authResult.idToken);
        idToken = authResult.idToken;
        getProfile();
    });

});

function doLogin() {
    lock.show();
}

function getProfile() {
    lock.getProfile(idToken, function(error, profile) {
        if (error) {
            // Handle error
            return;
        }
        // Display user information
        //show_profile_info(profile);
        console.dir(profile);
    });
}

function doTestFoo() {
    $.get('https://3b1fd5b1-e8cc-4871-a7d8-cc599e3ef852-gws.api-gw.mybluemix.net/auth1/foo?token='+idToken+'&name=Ray').then((res) => {
        console.log(res);
    });
}