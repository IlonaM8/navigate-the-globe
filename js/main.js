
//dom elements
const search = document.getElementById('search');
const countryList = document.getElementById('countryList')


//search the countries.json and filter it
const searchCountries = async searchText => {
 const xhr = new XMLHttpRequest();
 xhr.open('GET', 'https://restcountries.com/v3.1/all', true);

 xhr.onload = function(){
    if(this.status === 200){
        const countries = JSON.parse(this.responseText);

         //get matches to text input
        let matches = countries.filter(country => {
            const regex = new RegExp(`^${searchText}`, 'gi');
            return country.name.common.match(regex) || country.cca3.match(regex);
        });

        if(searchText.length === 0){
            matches = [];
            countryList.innerHTML = '';
        }

        showHtml(matches)
    }
 };
  xhr.send();
};

//show result in html
const showHtml = matches => {
    if(matches.length > 0){
       const html = matches.map(match => `
       <div class="card-body">
         <h4>${match.name.common}</h4>
         <span>The capital is: ${match.capital}</span>
       </div>
       `)
       .join('');
       countryList.innerHTML = html;
    }
}


//event listener
search.addEventListener('input', () => searchCountries(search.value));

