console.log(document.getElementById("lessonGrid"));
console.log(document.body.innerHTML);

console.log("현재 페이지:", window.location.pathname);

const container = document.getElementById("lessonGrid");

console.log("container =", container);

if (container === null) {
    alert("lessonGrid를 찾을 수 없습니다!");
}

console.log(document.body.innerHTML);

const lessons =
JSON.parse(localStorage.getItem("lessons")) || {};

const container =
document.getElementById("lessonGrid");

const progress =
currentUser.progress || 0;

for(let i=1;i<=24;i++){

    const card =
    document.createElement("div");

    if(i<=progress){

        card.className="lesson-box";

        card.innerHTML=`

            <h3>📚 ${i}차시</h3>

            <p>✅ 완료</p>

            <button
            onclick="location.href='lesson.html?id=${i}'">

            다시 보기

            </button>

        `;

    }

    else if(i===progress+1){

        card.className="lesson-box";

        card.innerHTML=`

            <h3>📚 ${i}차시</h3>

            <p>🟢 학습 가능</p>

            <button
            onclick="location.href='lesson.html?id=${i}'">

            학습하기

            </button>

        `;

    }

    else{

        card.className=
        "lesson-box lesson-lock";

        card.innerHTML=`

            <h3>📚 ${i}차시</h3>

            <p>🔒 잠김</p>

            <button disabled>

            잠김

            </button>

        `;

    }

    grid.appendChild(card);

}