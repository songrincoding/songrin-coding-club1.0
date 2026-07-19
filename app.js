function signup() {

    const name = document.getElementById("name").value;
    const studentId = document.getElementById("studentId").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const passwordCheck = document.getElementById("passwordCheck").value;

    // 이름 검사
    if (name.trim() === "") {
        alert("이름을 입력해주세요.");
        return;
    }

    // 이름: 한글 2~4글자
    const nameRule = /^[가-힣]{2,4}$/;

    if (!nameRule.test(name)) {
        alert("이름은 한글 2~4글자로 입력해주세요.");
        return;
    }

    // 학번 검사
    if (!/^\d{5}$/.test(studentId)) {
        alert("학번은 5자리 숫자로 입력해주세요.");
        return;
    }

    // 아이디 검사
    if (username.trim() === "") {
        alert("아이디를 입력해주세요.");
        return;
    }

    // 아이디 규칙
    const usernameRule = /^[a-z0-9_]{4,20}$/;

    if (!usernameRule.test(username)) {
        alert(
            "아이디는\n" +
            "영문 소문자, 숫자, 밑줄(_)만 사용 가능하며\n" +
            "4~20글자여야 합니다."
        );
        return;
    }

    // 저장된 학생 목록 가져오기
    let students =
        JSON.parse(localStorage.getItem("students")) || [];

    // 아이디 중복 검사
    const duplicateUser = students.some(
        student => student.username === username
    );

    if (duplicateUser) {
        alert("이미 사용 중인 아이디입니다.");
        return;
    }

    // 학번 중복 검사
    const duplicateStudentId = students.some(
        student => String(student.studentId) === String(studentId)
    );

    if (duplicateStudentId) {
        alert("이미 가입된 학번입니다.");
        return;
    }

    // 비밀번호 일치 검사
    if (password !== passwordCheck) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    // 비밀번호 규칙 검사
    const passwordRule =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!?\*\^]).{8,}$/;

    if (!passwordRule.test(password)) {
        alert(
            "비밀번호는\n" +
            "영문 + 숫자 + 특수문자(! ? * ^)\n" +
            "포함하여 8자 이상이어야 합니다."
        );
        return;
    }

    // 학생 정보 생성
    const student = {
        name: name,
        studentId: studentId,
        username: username,
        password: password,
        status: "pending",
        progress: 0
    };

    // 학생 추가
    students.push(student);

    // 저장
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    alert(
        "가입 신청 완료!\n\n" +
        "관리자 승인 후 로그인할 수 있습니다."
    );

    // 입력창 초기화
    document.getElementById("name").value = "";
    document.getElementById("studentId").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("passwordCheck").value = "";
}


// =========================
// 로그인 기능
// =========================

function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const students =
        JSON.parse(localStorage.getItem("students")) || [];

    const student =
        students.find(
            s => s.username === username
        );
// 관리자 로그인

if (
    username === "songrincoding" &&
    password === "songrincoding1543!"
) {

    localStorage.setItem(
        "currentUser",
        JSON.stringify({
            username: "admin",
            role: "admin"
        })
    );

    alert("관리자 로그인 성공!");

    window.location.href =
    "admin.html";

    return;
}
    // 아이디 확인
    if (!student) {
        alert("존재하지 않는 아이디입니다.");
        return;
    }

    // 비밀번호 확인
    if (student.password !== password) {
        alert("비밀번호가 올바르지 않습니다.");
        return;
    }

    // 관리자 승인 확인
    if (student.status !== "approved") {
        alert(
            "아직 관리자 승인이 완료되지 않았습니다."
        );
        return;
    }

    // 로그인 정보 저장
    localStorage.setItem(
        "currentUser",
        JSON.stringify(student)
    );

    alert(
        student.name + "님 로그인 성공!"
    );

    // 학생 대시보드 이동
    window.location.href = "dashboard.html";
}
// =========================
// 아이디 찾기
// =========================

function findId() {

    const name =
    prompt("이름을 입력하세요.");

    if (!name) return;

    const studentId =
    prompt("학번을 입력하세요.");

    if (!studentId) return;

    const students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];

    const student =
    students.find(
        s =>
        s.name === name &&
        String(s.studentId) === String(studentId)
    );

    if (!student) {

        alert(
            "일치하는 회원을 찾을 수 없습니다."
        );

        return;
    }

    alert(
        "회원님의 아이디는\n\n" +
        student.username +
        "\n\n입니다."
    );

}

// =========================
// 비밀번호 재설정
// =========================

function resetPassword() {

    const username =
    prompt("아이디를 입력하세요.");

    if (!username) return;

    const studentId =
    prompt("학번을 입력하세요.");

    if (!studentId) return;

    let students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];

    const index =
    students.findIndex(
        s =>
        s.username === username &&
        String(s.studentId) === String(studentId)
    );

    if (index === -1) {

        alert(
            "일치하는 회원을 찾을 수 없습니다."
        );

        return;
    }

    const newPassword =
    prompt(
        "새 비밀번호를 입력하세요.\n\n영문 + 숫자 + 특수문자(! ? * ^)\n8자 이상"
    );

    if (!newPassword) return;

    const passwordRule =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!?\*\^]).{8,}$/;

    if (!passwordRule.test(newPassword)) {

        alert(
            "비밀번호 형식이 올바르지 않습니다."
        );

        return;
    }

    students[index].password =
    newPassword;

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    alert(
        "비밀번호가 변경되었습니다."
    );

}