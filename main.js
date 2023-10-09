// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
// `https://fr.wikipedia.org/?curid=${article.pageid}`

const formContainer = document.querySelector(`.form-container`);
let message = document.querySelector(`.message`);

formContainer.addEventListener("submit",evt=>{
    evt.preventDefault();
    let searchInput = document.querySelector(`.search-input`).value;
    if (!searchInput){
        message.textContent = `Veuillez renseigner le champs de recherche !`;
        resultArea.textContent = '';
    }
    else{
        resultArea.textContent = '';
        message.textContent = ``;
        wikiSearch(searchInput);
    }
}, false)

const resultArea = document.querySelector(`.result-area`);
async function wikiSearch(searchInput){
    const query = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`)
    const resultTab = await query.json();
    for (result of resultTab.query.search){
        console.log(result);
        const div = document.createElement('div');
        div.className = "result";

        const resultTitle = document.createElement('a');
        resultTitle.className ="result-title";
        resultTitle.setAttribute('href',`https://fr.wikipedia.org/?curid=${result.pageid}`);
        resultTitle.setAttribute('target', 'blank');
        resultTitle.textContent = result.title;
        div.appendChild(resultTitle);

        const resultLink = document.createElement('a');
        resultLink.className ="result-link";
        resultLink.setAttribute('href',`https://fr.wikipedia.org/?curid=${result.pageid}`);
        resultLink.setAttribute('target', 'blank');
        resultLink.textContent = `https://fr.wikipedia.org/?curid=${result.pageid}`;
        div.appendChild(resultLink);

        const resultDescription = document.createElement('p');
        resultDescription.className ="result-description";
        resultDescription.innerHTML = result.snippet;
        div.appendChild(resultDescription);

        resultArea.appendChild(div);
    }
}