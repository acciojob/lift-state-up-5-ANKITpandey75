const tablesContainer = document.querySelector("#tablesContainer");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const sortButtons = document.querySelectorAll("[data-action]");

let students = [];
let activeAction = "default";

const columns = ["ID", "Name", "Gender", "Class", "Marks", "Passing", "Email"];

const getFullName = (student) => `${student.first_name} ${student.last_name}`;

const getSearchResults = () => {
  const term = searchInput.value.trim().toLowerCase();

  if (!term) return [...students];

  return students.filter((student) =>
    student.first_name.toLowerCase().includes(term) ||
    student.last_name.toLowerCase().includes(term) ||
    student.email.toLowerCase().includes(term)
  );
};

const getSortedStudents = () => {
  const data = getSearchResults();

  if (activeAction === "az") {
    return data.sort((a, b) => getFullName(a).localeCompare(getFullName(b)));
  }

  if (activeAction === "za") {
    return data.sort((a, b) => getFullName(b).localeCompare(getFullName(a)));
  }

  if (activeAction === "marks") {
    return data.sort((a, b) => a.marks - b.marks);
  }

  if (activeAction === "passing") {
    return data.filter((student) => student.passing);
  }

  if (activeAction === "class") {
    return data.sort((a, b) => a.class - b.class);
  }

  return data;
};

const createTable = (data, title = "") => {
  let html = title ? `<h2>${title}</h2>` : "";

  html += `
    <table>
      <thead>
        <tr>${columns.map((col) => `<th>${col}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${data.map((student) => `
          <tr>
            <td>${student.id}</td>
            <td>
              <div class="student-name">
                <img src="${student.img_src}" alt="${getFullName(student)}" />
                <span>${getFullName(student)}</span>
              </div>
            </td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? "passing" : "failed"}</td>
            <td>${student.email}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  return html;
};

const renderStudents = () => {
  if (activeAction === "gender") {
    const data = getSearchResults();
    const female = data.filter((student) => student.gender.toLowerCase() === "female");
    const male = data.filter((student) => student.gender.toLowerCase() === "male");

    tablesContainer.innerHTML =
      createTable(female, "Female Students") +
      createTable(male, "Male Students");

    return;
  }

  tablesContainer.innerHTML = createTable(getSortedStudents());
};

fetch("students.json")
  .then((res) => res.json())
  .then((data) => {
    students = data;
    renderStudents();
  });

searchInput.addEventListener("input", renderStudents);
searchButton.addEventListener("click", renderStudents);

sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeAction = button.dataset.action;
    renderStudents();
  });
});