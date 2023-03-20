
//dom elements
const search = document.getElementById('search');
const countryList = document.getElementById('countryList')


//search the countries.json and filter it
const searchCountries = async searchText => {
 const res = await fetch('../data/countries.json');
 const countries = await res.json();

 //get matches to text input
 let matches = countries.filter(country => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return country.name.match(regex) || country.abbr.match(regex);
 });

 if(searchText.length === 0){
    matches = [];
    countryList.innerHTML = '';
 }

 showHtml(matches)
};

//show result in html
const showHtml = matches => {
    if(matches.length > 0){
       const html = matches.map(match => `
       <div class="card-body">
       <h4>${match.name} (${match.abbr})</h4>
       <p>The capital is: ${match.capital}</p>
       </div>
       `)
       .join('');
       countryList.innerHTML = html;
    }
}


//event listener
search.addEventListener('input', () => searchCountries(search.value));




