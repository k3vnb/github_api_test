function handleError(err){
    $('.results').append(err.message).show(5);
}

function renderGitRepos(responseJson){
    $('.results').show(5);
    responseJson.forEach(repo => {
        $('.results-ul').append(`<li><a href="${repo.html_url}" class="repo-link">${repo.name}</a></li>`)     
    })

}


function handleAPICall(searchTerm){   
    fetch(`https://api.github.com/users/${searchTerm}/repos?sort=updated`)
    .then(response =>   {
        console.log(response)
        if (response.ok) {
            return response.json();
        } else {
          throw new Error('Oops. Something went wrong! Maybe check the spelling of your requested Github user?');
        }
      })
      .then(responseJson => {
          renderGitRepos(responseJson)
        })
      .catch(error => {
          handleError(error);
    })
}

function resetResultsField() {
    $('.results').hide();
    $('.results-ul').empty();
  }
function resetSearchField() {
    $('input[name="search-term"]').val('');
  }

function onFormSubmit(){
    $('form').submit(() => {
        event.preventDefault();
        resetResultsField();
        const searchTerm = $('input[name="search-term"]').val();
        handleAPICall(searchTerm);
        resetSearchField();
    })
}


$(onFormSubmit)