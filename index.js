function handleError(){
    console.log('error');
}

function renderGitRepos(responseJson){
    console.log('res is ' + responseJson.length);
    responseJson.forEach(repo => {
        console.log(repo.name)
        console.log(repo.owner.html_url)
    })

}


function handleAPICall(searchTerm){   
    fetch(`https://api.github.com/users/${searchTerm}/repos`)
    .then(response =>   {
        console.log(response)
        if (response.ok) {
            return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(responseJson => renderGitRepos(responseJson))
      .catch(error => {
          console.log(error);
          handleError();
    })
}

function resetField() {
    $('.results').empty();
    $('input[name="search-term"]').val('');
  }

function onFormSubmit(){
    $('form').submit(() => {
        event.preventDefault();
        const searchTerm = $('input[name="search-term"]').val();
        // resetField();
        handleAPICall(searchTerm);
    })
}


$(onFormSubmit)