const API_KEY = "2746e0601fae4cf4ac3e2c6d67c850bf";

const currentTimezoneDiv = document.getElementById("current-timezone");
const addressInput = document.getElementById("address");
const searchButton = document.getElementById("search-btn");
const addressTimezoneDiv = document.getElementById("address-timezone");
const errorText = document.getElementById("error");

function getTimezoneName(data) {
  if (data.features && data.features.length > 0) {
    return data.features[0].properties.timezone.name;
  }

  if (data.results && data.results.length > 0 && data.results[0].timezone) {
    return data.results[0].timezone.name;
  }

  return null;
}

async function fetchTimezoneByCoordinates(lat, lon) {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch timezone");
  }

  const data = await response.json();
  return getTimezoneName(data);
}

function getCurrentTimezone() {
  if (!navigator.geolocation) {
    currentTimezoneDiv.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async function (position) {
      try {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const timezone = await fetchTimezoneByCoordinates(lat, lon);

        if (timezone) {
          currentTimezoneDiv.textContent = `Your current timezone is ${timezone}.`;
        } else {
          currentTimezoneDiv.textContent = "Timezone not found for your location.";
        }
      } catch (error) {
        currentTimezoneDiv.textContent = "Error fetching current timezone.";
      }
    },
    function () {
      currentTimezoneDiv.textContent = "Location permission denied.";
    }
  );
}

async function getCoordinatesFromAddress(address) {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&format=json&apiKey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch address details");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Address not found");
  }

  return {
    lat: data.results[0].lat,
    lon: data.results[0].lon,
  };
}

async function handleAddressSearch() {
  const address = addressInput.value.trim();

  errorText.textContent = "";
  addressTimezoneDiv.textContent = "";

  if (address === "") {
    errorText.textContent = "Please enter an address.";
    return;
  }

  try {
    addressTimezoneDiv.textContent = "Fetching timezone...";

    const coordinates = await getCoordinatesFromAddress(address);
    const timezone = await fetchTimezoneByCoordinates(coordinates.lat, coordinates.lon);

    if (timezone) {
      addressTimezoneDiv.textContent = `The timezone for this address is ${timezone}.`;
    } else {
      addressTimezoneDiv.textContent = "Timezone not found for this address.";
    }
  } catch (error) {
    addressTimezoneDiv.textContent = "";
    errorText.textContent = error.message;
  }
}

searchButton.addEventListener("click", handleAddressSearch);

getCurrentTimezone();