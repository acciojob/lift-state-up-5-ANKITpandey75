const tablesContainer = document.querySelector("#tablesContainer");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const sortButtons = document.querySelectorAll("[data-action]");

let students = [];
let activeAction = "default";

const columns = ["ID", "Name", "Gender", "Class", "Marks", "Passing", "Email"];

const getFullName = (student) => `${student.first_name} ${student.last_name}`;

const getSearchResults = () => {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (!searchTerm) {
    return [...students];
  }

  return students.filter((student) => {
    return (
      student.first_name.toLowerCase().includes(searchTerm) ||
      student.last_name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm)
    );
  });
};

const getSortedStudents = () => {
  const filteredStudents = getSearchResults();

  if (activeAction === "az") {
    return filteredStudents.sort((a, b) => getFullName(a).localeCompare(getFullName(b)));
  }

  if (activeAction === "za") {
    return filteredStudents.sort((a, b) => getFullName(b).localeCompare(getFullName(a)));
  }

  if (activeAction === "marks") {
    return filteredStudents.sort((a, b) => a.marks - b.marks);
  }

  if (activeAction === "passing") {
    return filteredStudents.filter((student) => student.passing);
  }

  if (activeAction === "class") {
    return filteredStudents.sort((a, b) => a.class - b.class);
  }

  return filteredStudents;
};

const createStudentRow = (student) => {
  const row = document.createElement("tr");

  row.innerHTML = `
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
  `;

  return row;
};

const createTable = (studentList, title = "") => {
  const block = document.createElement("article");
  block.className = "table-block";

  if (title) {
    const heading = document.createElement("h2");
    heading.textContent = title;
    block.appendChild(heading);
  }

  if (studentList.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent = "No students found.";
    block.appendChild(emptyMessage);
    return block;
  }

  const scrollWrapper = document.createElement("div");
  scrollWrapper.className = "table-scroll";

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  thead.innerHTML = `<tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr>`;
  studentList.forEach((student) => tbody.appendChild(createStudentRow(student)));

  table.append(thead, tbody);
  scrollWrapper.appendChild(table);
  block.appendChild(scrollWrapper);

  return block;
};

const renderStudents = () => {
  tablesContainer.innerHTML = "";

  if (activeAction === "gender") {
    const filteredStudents = getSearchResults();
    const femaleStudents = filteredStudents.filter((student) => student.gender.toLowerCase() === "female");
    const maleStudents = filteredStudents.filter((student) => student.gender.toLowerCase() === "male");

    tablesContainer.append(
      createTable(femaleStudents, "Female Students"),
      createTable(maleStudents, "Male Students")
    );
    return;
  }

  tablesContainer.appendChild(createTable(getSortedStudents()));
};

const loadStudents = async () => {
  try {
    const response = await fetch("students.json");
    students = await response.json();
    renderStudents();
  } catch (error) {
    tablesContainer.innerHTML = '<p class="empty-message">Unable to load student data.</p>';
  }
};

searchInput.addEventListener("input", renderStudents);
searchButton.addEventListener("click", renderStudents);

sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeAction = button.dataset.action;
    renderStudents();
  });
});

loadStudents();
