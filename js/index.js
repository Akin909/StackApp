var queryString;


var makeRequest = function(url) {
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function() {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var responseObject = JSON.parse(xhr.response);
            console.log(responseObject);
            return responseObject;
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}


function getInput(id) {
    var input = document.getElementById(id)
    return input;
}
// This function takes the query and formats it to work as a tags array with
// semicolons as per the stack api
function queryToTags(queryString) {
    var tags = queryString.split(' ').join(';')
    return tags;
}

//This function takes our user's input and returns it (it is used above)

function submitSearch() {
    var input = getInput("inputText");
    input.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            console.log(input.value);
            queryString = input.value;
            var request = urlConstructor(input.value)
            makeRequest(request);
            return input.value
        }
    })
    var inputButton = getInput('inputButton');
    inputButton.addEventListener('click', function() {
        console.log(input.value);
        queryString = input.value;
        var request = urlConstructor(input.value)
        makeRequest(request);
        return input.value
    })

}


function urlConstructor(usersQuery) {
    console.log('usersQuery',usersQuery);
    var submission = queryToTags(usersQuery);
    var access_key = 'UcfoxNCNMRw57sKFF83MgQ(('
    var url = 'https://api.stackexchange.com/docs/questions/unanswered?tagged=' + submission + '&site=stackoverflow';
    return url;
}
console.log(makeRequest(urlConstructor('javascript array')));
console.log(urlConstructor('javascrip'));
// var javasScript = urlConstructor()
// makeRequest();
