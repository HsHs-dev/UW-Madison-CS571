function buildStudents(studs) {
  const container = document.querySelector(".container-fluid");
  container.classList.add("row");

  studs.forEach((stud) => {
    const stud_div = document.createElement("div");

    stud_div.classList = "col-12 col-md-6 col-lg-4 col-xl-3";

    const name = document.createElement("h2");
    name.textContent = `${stud.name.first} ${stud.name.last}`;
    stud_div.appendChild(name);

    const major = document.createElement("h6");
    major.textContent = `${stud.major}`;
    stud_div.appendChild(major);

    const cred_desc = document.createElement("p");
    cred_desc.textContent = `${stud.name.first} is taking ${stud.numCredits} credits and is ${stud.fromWisconsin ? "" : "NOT"} from Wisconsin`;
    stud_div.appendChild(cred_desc);

    const inter_desc = document.createElement("p");
    inter_desc.textContent = `They have ${stud.interests.length} interests including...`;
    stud_div.appendChild(inter_desc);

    const interests = document.createElement("ul");
    stud.interests.forEach((inter) => {
      const li = document.createElement("li");
      li.textContent = inter;
      interests.appendChild(li);
    });

    stud_div.appendChild(interests);
    container.appendChild(stud_div);
  });

  document.body.appendChild(container);
}

function handleSearch(e) {
  e?.preventDefault(); // You can ignore this; prevents the default form submission!

  // TODO Implement the search
}

document.getElementById("search-btn").addEventListener("click", handleSearch);

const data_link = "https://cs571.org/rest/s25/hw2/students";

// fetching student
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
    buildStudents(data);
  })
  .catch((err) => {
    console.error("error fetching data:", err);
  });
