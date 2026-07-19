const currentUser =
JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {

    alert("로그인이 필요합니다.");

    window.location.href =
    "login.html";

}

document.getElementById("studentName").innerText =
currentUser.name + "님\n환영합니다!";

document.getElementById("progressText").innerText =
(currentUser.progress || 0) + " / 24 완료";
document.getElementById("characterImage").src =
"images/" +
(currentUser.character || "boy1") +
".png";

function loadLessons() {

    const lessonList =
    document.getElementById("lessonList");

    lessonList.innerHTML = "";

    const progress =
    currentUser.progress || 0;

    for (
        let lesson = 1;
        lesson <= 24;
        lesson++
    ) {

        if (lesson <= progress + 1) {

            lessonList.innerHTML += `
                <div class="lesson-card">

                    <h3>${lesson}차시</h3>

                    <button
                        onclick="completeLesson(${lesson})">
                        학습하기
                    </button>

                </div>
            `;

        } else {

            lessonList.innerHTML += `
                <div class="lesson-card locked">

                    <h3>${lesson}차시</h3>

                    <button>
                        🔒 잠금
                    </button>

                </div>
            `;

        }

    }

}

function completeLesson(lesson) {

    if (
        !confirm(
            lesson + "차시 완료 처리할까요?"
        )
    ) {
        return;
    }

    let students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];

    const index =
    students.findIndex(
        student =>
        student.username ===
        currentUser.username
    );

    students[index].progress =
    lesson;

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    currentUser.progress =
    lesson;

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    document.getElementById(
        "progressText"
    ).innerText =
    lesson + " / 24 완료";

    loadLessons();

}

loadLessons();
function loadDashboardNotices() {

    const notices =
    JSON.parse(
        localStorage.getItem("notices")
    ) || [];

    const noticeList =
    document.getElementById(
        "dashboardNoticeList"
    );

    if (!noticeList) return;

    noticeList.innerHTML = "";

    notices.forEach(notice => {

        noticeList.innerHTML += `
            <li>
                ${notice.pinned ? "📌 " : ""}
                ${notice.text}
            </li>
        `;

    });

}

loadDashboardNotices();
function openCharacterEditor() {

    alert(
        "캐릭터 편집창은 다음 단계에서 만들 예정!"
    );

}
function openCharacterEditor() {

    document.getElementById(
        "characterModal"
    ).style.display = "flex";

}

function closeCharacterEditor() {

    document.getElementById(
        "characterModal"
    ).style.display = "none";

}

function selectCharacter(character) {

    let currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

    currentUser.character = character;

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    document.getElementById(
        "characterImage"
    ).src =
    "images/" + character + ".png";

    closeCharacterEditor();

}
// =========================
// 프로필 수정
// =========================

function openProfileEditor() {

    document.getElementById(
        "profileModal"
    ).style.display = "flex";

}

function closeProfileEditor() {

    document.getElementById(
        "profileModal"
    ).style.display = "none";

}

function changePassword() {

    const newPassword =
    document.getElementById(
        "newPassword"
    ).value.trim();

    if (newPassword === "") {

        alert("새 비밀번호를 입력해주세요.");

        return;

    }

    let students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];

    const index =
    students.findIndex(
        student =>
        student.username ===
        currentUser.username
    );

    if (index === -1) {

        alert("계정을 찾을 수 없습니다.");

        return;

    }

    students[index].password =
    newPassword;

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    currentUser.password =
    newPassword;

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    alert("비밀번호가 변경되었습니다.");

    document.getElementById(
        "newPassword"
    ).value = "";

    closeProfileEditor();

}

// =========================
// 로그아웃
// =========================

function logout() {

    if (
        !confirm(
            "로그아웃 하시겠습니까?"
        )
    ) {
        return;
    }

    localStorage.removeItem(
        "currentUser"
    );

    location.href =
    "login.html";

}
// ================================
// 공지사항 불러오기
// ================================

function loadDashboardNotices() {

    const notices =
        JSON.parse(localStorage.getItem("notices")) || [];

    const list =
        document.getElementById("dashboardNoticeList");

    if (!list) return;

    list.innerHTML = "";

    if (notices.length === 0) {

        list.innerHTML =
            "<li>등록된 공지가 없습니다.</li>";

        return;

    }

    notices.slice(0,5).forEach(notice => {

        list.innerHTML += `
            <li>
                📢 <strong>${notice.title}</strong><br>
                <small>${notice.date}</small>
            </li>
        `;

    });

}