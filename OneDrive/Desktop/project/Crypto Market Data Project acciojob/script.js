const api =
"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let coins = [];

// ------------------------
// Fetch using .then()
// ------------------------

function fetchDataThen() {

    fetch(api)
        .then((response) => response.json())
        .then((data) => {

            coins = data;
            displayData(coins);

        })
        .catch((error) => console.log(error));

}

// ------------------------
// Fetch using async await
// ------------------------

async function fetchDataAsync() {

    try{

        const response = await fetch(api);

        const data = await response.json();

        coins = data;

        displayData(coins);

    }

    catch(error){

        console.log(error);

    }

}

// Render Table

function displayData(data){

    const tbody = document.getElementById("tableBody");

    tbody.innerHTML="";

    data.forEach((coin)=>{

        const row=document.createElement("tr");

        row.innerHTML=`

        <td>
            <img src="${coin.image}">
        </td>

        <td>${coin.name}</td>

        <td>${coin.symbol.toUpperCase()}</td>

        <td>$${coin.current_price}</td>

        <td>${coin.total_volume.toLocaleString()}</td>

        <td>${coin.market_cap.toLocaleString()}</td>

        <td class="${
            coin.price_change_percentage_24h>=0
            ?"green":"red"
        }">

        ${coin.price_change_percentage_24h.toFixed(2)}%

        </td>

        `;

        tbody.appendChild(row);

    });

}

// Search

document.getElementById("searchBtn").addEventListener("click",()=>{

    const value=document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const filtered=coins.filter((coin)=>{

        return(
            coin.name.toLowerCase().includes(value) ||
            coin.symbol.toLowerCase().includes(value)
        );

    });

    displayData(filtered);

});

// Sort by Market Cap

document.getElementById("marketCapBtn").addEventListener("click",()=>{

    const sorted=[...coins].sort((a,b)=>{

        return b.market_cap-a.market_cap;

    });

    displayData(sorted);

});

// Sort by Percentage Change

document.getElementById("percentageBtn").addEventListener("click",()=>{

    const sorted=[...coins].sort((a,b)=>{

        return b.price_change_percentage_24h-a.price_change_percentage_24h;

    });

    displayData(sorted);

});

// Call either one

fetchDataAsync();

// fetchDataThen();