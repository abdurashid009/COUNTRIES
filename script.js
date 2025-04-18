const countriesContainer = document.getElementById("countries");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

let allCountries = [];

async function fetchCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();
  allCountries = countries;
  displayCountries(countries);
}

// Фильтрация при вводе текста или выборе региона
function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedRegion = filterSelect.value;

  const filtered = allCountries.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchValue);
    const matchesRegion = selectedRegion === "all" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  displayCountries(filtered);
}

function displayCountries(countries) {
  countriesContainer.innerHTML = "";
  countries.forEach(country => {
    const card = document.createElement("div");
    card.classList.add("country-card");
    card.innerHTML = `
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
      <p><strong>${country.name.common}</strong></p>
      <p>Region: ${country.region}</p>
      <p>Population: ${country.population.toLocaleString()}</p>
    `;
    countriesContainer.appendChild(card);
  });
}

// Инициализация
fetchCountries();

// Слушатели
searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);

// Dark mode toggle
document.getElementById("dark-mode").onclick = function () {
  document.body.classList.toggle("dark-mode");
};
