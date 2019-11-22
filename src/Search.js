import Cities from './Cities';

class Search {
  constructor(selectID, inputID, defCountry = "PL", defCity = "Warsaw") {
    this._cities = new Cities();
    this._select = document.getElementById(selectID);
    this._input = document.getElementById(inputID);
    this._selectedCountry = defCountry;
    this._selectedCity = defCity;
    this._input.value = this._selectedCity;
    this._select.value = defCountry;
    this._countryCitiesNames = this._cities.getCountryCitiesNames(this._selectedCountry);

    this._sugestionsDiv = document.createElement("div");
    this._sugestionsDiv.setAttribute("id", "sugestion");                       
    this._sugestionsDiv.setAttribute("class", "sugestion-item");
    this._input.parentNode.appendChild(this._sugestionsDiv);
  
    this.initSelect();
    this.autocomplete();
  }

  initSelect() {
    this._cities.getAllCountries().forEach(element => {
      let option = document.createElement("option");
      option.value = element;
      option.text = element;
      this._select.add(option);
    });

    this._select.selectedIndex = this._cities.getAllCountries().indexOf(this._selectedCountry);

    this._select.addEventListener("change", () => {
      this._selectedCountry = this._select.options[this._select.selectedIndex].value;
      this._countryCitiesNames = this._cities.getCountryCitiesNames(this._selectedCountry);
    });
}

  getSelectedCoutry() {
    return this._selectedCountry;
  }

  getSelectedCity() {
    return this._selectedCity;
  }

  getSelectedLng() {
    return this._selectedCountry;
  }

  getSelectedLat() {
    return this._selectedCity;
  }
  
autocomplete() {
      let currentFocus;

      this._input.addEventListener("input", () => {
    
      if (!this._input.value) { return false;}
      currentFocus = -1;
      closeAllLists();

      /*for each item in the array...*/
      this._countryCitiesNames.forEach(element => {
        /*check if the item starts with the same letters as the text field value:*/

        if (element.substr(0, this._input.value.length).toUpperCase() == this._input.value.toUpperCase()) {
          
          /*create a DIV element for each matching element:*/
          let sugestionsElementDiv = document.createElement("div");

          /*make the matching letters bold:*/
          sugestionsElementDiv.innerHTML = "<strong>" + element.substr(0, this._input.value.length) + "</strong>";
          sugestionsElementDiv.innerHTML += element.substr(this._input.value.length);

          sugestionsElementDiv.innerHTML += "<input type='hidden' value='" + element + "'>";
          sugestionsElementDiv.addEventListener("click", () => {
            this._input.value = sugestionsElementDiv.getElementsByTagName("input")[0].value;
            this._selectedCity = this._input.value;
            closeAllLists();
          });
          this._sugestionsDiv.appendChild(sugestionsElementDiv);
        }
      });
  });


  this._input.addEventListener("keydown", (event) => {
      if (event.keyCode == 40) {
        currentFocus++;
        console.log(this._sugestionsDiv.children[currentFocus]);
        addActive(this._sugestionsDiv.children[currentFocus]);
      } else if (event.keyCode == 38) { //up
        currentFocus--;
        addActive(this._sugestionsDiv.children[currentFocus]);
      } else if (event.keyCode == 13) {
        event.preventDefault();
        if (currentFocus > -1) {
          if (this._sugestionsDiv.children[currentFocus]) {this._sugestionsDiv.children[currentFocus].click();}
        }
      }
  });

  const addActive = (element) => {
    if (!element) return false;
    removeActive();
    if (currentFocus >= this._sugestionsDiv.children.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (this._sugestionsDi.children.length - 1);
    element.classList.add("sugestionActive");
  }
  const removeActive = () => {
    for (let i = 0; i < this._sugestionsDiv.length; i++) {
      this._sugestionsDiv[i].classList.remove("sugestionActive");
    }
  }

  const closeAllLists = () => {
  while (this._sugestionsDiv.firstChild) {
    this._sugestionsDiv.removeChild( this._sugestionsDiv.firstChild);
  }
}
/*execute a function when someone clicks in the document:*/
// this._sugestionsDiv.addEventListener("click",  (event) => {
//     closeAllLists();
// });
}

}

export default Search;