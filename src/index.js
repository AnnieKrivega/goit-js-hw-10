// import './css/styles.css';
// import Notiflix from 'notiflix';
// import { onFetch } from './fetchCountries'
// const DEBOUNCE_DELAY = 300;

// import debounce from "lodash.debounce";

// const refs ={
//     inputEl: document.querySelector('#search-box'),
//     ulEl: document.querySelector('.country-list'),
//     countryEl: document.querySelector('.country-info')
// }

// refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY, ));

// function onInput(evt) {

//     let inputText = refs.inputEl.value.trim() ;
//     if(!inputText){
//       refs.ulEl.innerHTML = '';
//       refs.countryEl.innerHTML = '';
//       return
//   }

//     evt.preventDefault()
//     onFetch(inputText)
//       .then(selCont => {
//         console.log(selCont);
//         if (selCont.length > 10) {
//           refs.countryEl.innerHTML = '';
//           refs.ulEl.innerHTML = '';
//           console.log('too much');
//           Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
//           return;
//         }
  
//         let selCountries = '';
//         if(selCont.length > 1){
//             selCont.forEach(cont => {
//                 refs.countryEl.innerHTML = '';
//                 refs.ulEl.innerHTML = '';
//                 selCountries += `<li style='display: flex; align-items: center; margin-bottom: 20px ' ><img style='width: 40px; margin-right:20px;  ' src='${cont.flags.svg}'></img><p>${cont.name.official}</p></li>`;
//               });
//               refs.ulEl.innerHTML = selCountries;
//             }
//             if(selCont.length === 1){
//               refs.countryEl.innerHTML = '';
//               refs.ulEl.innerHTML = '';
//                 onFullCard(selCont)
                
//             }
            
//         }

//       )
//       .catch(error => {
//         if(error.message === "404" ) {

//           console.log(error); Notiflix.Notify.failure("Oops, there is no country with that name");
//       } else { Notiflix.Notify.failure("error.message");
//     }
//       });
  
// function onFullCard(selCont){
//     let selCountries = '';
//     refs.ulEl.innerHTML = '';
//     selCountries  += `<li style=' align-items: center; margin-bottom: 20px ' ><img style='width: 80px; margin-right:20px;  ' src='${selCont[0].flags.svg}'></img><h3>${selCont[0].name.official}</h3><div><p><b>Capital</b>: ${selCont[0].capital}</p><p><b>Population</b>: ${selCont[0].population}</p><p><b>Languages</b>: ${Object.values(selCont[0].languages).join(', ')}</p></div></li>`;
//     refs.countryEl.innerHTML = selCountries;
// }
// $(document).ready(function() {
//   $('.elemClass').click(function(event) {
//   console.log(event.target.id);
//   });
//   });

//   const myElement = document.getElementById('event.target.id'); 
//   if (errorOccurred) {
//     myElement.innerHTML = ''; 
//   }}

import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const infoCountry = document.querySelector('.country-info');
const listCountry = document.querySelector('.country-list');

inputCountry.addEventListener(
  'input',
  debounce(handlerCountry, DEBOUNCE_DELAY)
);

function handlerCountry(event) {
  event.preventDefault();
  const name = inputCountry.value.trim();
  if (!name) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    return;
  }

  fetchCountries(name)
    .then(countries => {
      infoCountry.innerHTML = ' ';
      listCountry.innerHTML = ' ';
      if (countries.length > 10) {
        Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
      } else if (countries.length === 1) {
        createCardCountry(countries);
      } else if (name === '') {
        infoCountry.innerHTML = ' ';
        listCountry.innerHTML = ' ';

      } else {
        createFlagCountry(countries);
      }
    })
    .catch(error => {
      console.error(error);

      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function createCardCountry(countries) {
  const markup = countries
    .map(
      ({
        flags: { svg },
        name: { official },
        capital,
        population,
        languages,
      }) => {
        return `<div class="flag-name-country">
      <img
        src="${svg}"
        alt="Flag of country"
        class = "flag";
        width="50"/>
      <h2 class="country-name">${official}</h2>
    </div>
    <ul class="list-of-properties">
      <li class="property-item"><p><b>Capital: </b>${capital}</p></li>
      <li class="property-item"></l<p><b>Population: </b>${population}</p></li>
      <li class="property-item"><><b>Languages: </b>${Object.values(
        languages
      )}</p></li>
      </ul>`;
      }
    )
    .join('');

  infoCountry.innerHTML = markup;
}
function createFlagCountry(countries) {
  const markup = countries
    .map(({ flags: { svg }, name: { official } }) => {
      return `<div class="flag-name-country">
      <img
        src="${svg}"
        class = "flag";
        alt="Flag of country"
        width="40"/>
      <h3 class="country-name">${official}</h3>
    </div>`;
    })
    .join('');

  listCountry.innerHTML = markup;
}
