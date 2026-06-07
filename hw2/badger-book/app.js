const data_link = "https://cs571.org/rest/s25/hw2/students";
let all_students = [];

// fetching students
fetch(data_link, {
  headers: {
    "X-CS571-ID": CS571.getBadgerId(),
  },
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.table(data);
    document.querySelector("#num-results").textContent = data.length;
    all_students = data;
    buildStudents(data);
  })
  .catch((err) => {
    console.error("error fetching data:", err);
  });

function buildStudents(studs) {
  const container = document.querySelector(".container-fluid");
  container.classList.add("row");

  studs.forEach((stud) => {
    const stud_div = document.createElement("div");

    stud_div.classList = "col-12 col-md-6 col-lg-4 col-xl-3 student";

    const name = document.createElement("h2");
    name.classList.add("name");
    name.textContent = `${stud.name.first} ${stud.name.last}`;
    stud_div.appendChild(name);

    const major = document.createElement("h6");
    major.classList.add("major");
    major.textContent = `${stud.major}`;
    stud_div.appendChild(major);

    const cred_desc = document.createElement("p");
    cred_desc.textContent = `${stud.name.first} is taking ${stud.numCredits} credits and is ${stud.fromWisconsin ? "" : "NOT"} from Wisconsin`;
    stud_div.appendChild(cred_desc);

    const inter_desc = document.createElement("p");
    inter_desc.textContent = `They have ${stud.interests.length} interests including...`;
    stud_div.appendChild(inter_desc);

    const interests = document.createElement("ul");
    interests.classList.add("interests");
    stud.interests.forEach((inter) => {
      const li = document.createElement("li");
      li.classList.add("interest");
      li.textContent = inter;
      interests.appendChild(li);
    });

    stud_div.appendChild(interests);
    container.appendChild(stud_div);
  });

  document.body.appendChild(container);
}

function handleSearch(e, search_name, search_major, search_interests) {
  e?.preventDefault(); // You can ignore this; prevents the default form submission!

  // extract fields content
  const name = search_name ?? document.getElementById("search-name").value;
  const major = search_major ?? document.getElementById("search-major").value;
  const interests =
    search_interests ?? document.getElementById("search-interest").value;

  if (search_interests) {
    document.getElementById("search-interest").value = search_interests;
  }

  /* get the students that follow the searching criteria */
  const matched = findStudents(name, major, interests);

  // clear the dom
  const container = document.querySelector(".container-fluid");
  container.textContent = "";

  // display matched students
  document.querySelector("#num-results").textContent = matched.length;
  buildStudents(matched);
}

function findStudents(name, major, interests) {
  name = name.toLowerCase();
  major = major.toLowerCase();
  interests = interests.toLowerCase();

  const filtered = all_students.filter((student) => {
    const name_cont =
      `${student.name.first} ${student.name.last}`.toLowerCase();
    const major_cont = student.major.toLowerCase();
    const interests_cont = student.interests.join(" ").toLowerCase();
    return (
      name_cont.includes(name) &&
      major_cont.includes(major) &&
      interests_cont.includes(interests)
    );
  });

  return filtered;
}

document.getElementById("search-btn").addEventListener("click", handleSearch);

// add similar interest functionality
const container = document.querySelector(".container-fluid");

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("interest")) {
    const interest = e.target.textContent;
    handleSearch(undefined, "", "", interest);
  }
});
