const $ = (id) => document.getElementById(id);

let userIP = "";
let postOffices = [];

async function getUserIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();

    userIP = data.ip;
    $("ipAddress").textContent = userIP;
    $("getDataButton").disabled = false;
  } catch {
    $("ipAddress").textContent = "Unable to fetch IP";
    $("status").textContent = "Please check your internet connection.";
  }
}

async function getUserDetails() {
  try {
    $("status").textContent = "Fetching data...";
    $("getDataButton").disabled = true;

    const response = await fetch(`https://ipinfo.io/${userIP}/geo`);

    if (!response.ok) {
      throw new Error("Unable to retrieve location details.");
    }

    const data = await response.json();
    const [lat, lon] = data.loc.split(",");

    $("resultIp").textContent = userIP;
    $("latitude").textContent = lat;
    $("longitude").textContent = lon;
    $("city").textContent = data.city || "Not available";
    $("region").textContent = data.region || "Not available";
    $("organisation").textContent = data.org || "Not available";
    $("hostname").textContent = data.hostname || "Not available";
    $("timezone").textContent = data.timezone || "Not available";
    $("pincode").textContent = data.postal || "Not available";

    $("map").innerHTML = `
      <iframe
        title="User location"
        src="https://maps.google.com/maps?q=${lat},${lon}&z=13&output=embed">
      </iframe>
    `;

    $("localTime").textContent = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "full",
      timeStyle: "medium",
      timeZone: data.timezone
    }).format(new Date());

    $("results").hidden = false;

    await getPostOffices(data.postal);
    $("status").textContent = "";
  } catch (error) {
    $("status").textContent = error.message;
  } finally {
    $("getDataButton").disabled = false;
  }
}

async function getPostOffices(pincode) {
  const response = await fetch(
    `https://api.postalpincode.in/pincode/${pincode}`
  );

  const data = await response.json();

  if (data[0].Status !== "Success") {
    throw new Error(data[0].Message || "No post offices found.");
  }

  $("postOfficeMessage").textContent = data[0].Message;
  postOffices = data[0].PostOffice || [];
  displayPostOffices(postOffices);
}

function displayPostOffices(offices) {
  const container = $("postOffices");

  if (!offices.length) {
    container.innerHTML = "<p>No post offices found.</p>";
    return;
  }

  container.innerHTML = offices
    .map(
      (office) => `
      <article class="post-office">
        <p><b>Name:</b> ${office.Name}</p>
        <p><b>Branch Type:</b> ${office.BranchType}</p>
        <p><b>Delivery Status:</b> ${office.DeliveryStatus}</p>
        <p><b>District:</b> ${office.District}</p>
        <p><b>Division:</b> ${office.Division}</p>
      </article>
    `
    )
    .join("");
}

$("getDataButton").addEventListener("click", getUserDetails);

$("search").addEventListener("input", (event) => {
  const searchText = event.target.value.toLowerCase();

  const filteredOffices = postOffices.filter((office) => {
    return (
      office.Name.toLowerCase().includes(searchText) ||
      office.BranchType.toLowerCase().includes(searchText)
    );
  });

  displayPostOffices(filteredOffices);
});

getUserIP();