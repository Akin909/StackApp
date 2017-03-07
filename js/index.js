var queryString;


var makeRequest = function(url,cb) {
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function() {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var responseObject = JSON.parse(xhr.response);
            // console.log(responseObject);
            cb(responseObject);
        }
      }
    xhr.open('GET', url, true);
    xhr.send();
}

function cb (response) {
  console.log(response);
  renderToDOM(response,'results-body')
  //  return response;
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

(function submitSearch() {
    var input = getInput("inputText");
    input.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            console.log(input.value);
            queryString = input.value;
            var request = urlConstructor(input.value)
            makeRequest(request,cb);
            return input.value
        }
    })
    var inputButton = getInput('inputButton');
    inputButton.addEventListener('click', function() {
        console.log(input.value);
        queryString = input.value;
        var request = urlConstructor(input.value)
        makeRequest(request,cb);
        return input.value
    })

})();


function urlConstructor(usersQuery) {
    console.log('usersQuery',usersQuery);
    var submission = queryToTags(usersQuery);
    var access_key = 'UcfoxNCNMRw57sKFF83MgQ(('
    var url = 'https://api.stackexchange.com/2.2/questions/unanswered?tagged=' + submission + '&site=stackoverflow&key=' + access_key;
    return url;
}
// console.log(makeRequest(urlConstructor('javascript array'),cb));
// console.log(urlConstructor('javascrip'));
// var javasScript = urlConstructor()
// makeRequest();

function renderToDOM (result,id) {
  document.getElementById(id).innerText = result.items[2].title;
      // console.log(el);
}
