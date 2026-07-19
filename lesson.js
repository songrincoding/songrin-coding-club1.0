const lessons =
JSON.parse(localStorage.getItem("lessons")) || {};

const container =
document.getElementById("lessonContainer");

for(let lesson in lessons){

    const data =
    lessons[lesson];

    container.innerHTML += `

    <div class="lessonCard">

        <h2>${lesson}차시</h2>

        <h3>${data.title}</h3>

        <p>${data.description}</p>

        <button
        onclick="openLesson(${lesson})">

        학습하기

        </button>

    </div>

    `;

}
function openLesson(number){

    localStorage.setItem(
        "currentLesson",
        number
    );

    location.href =
    "study.html";

}