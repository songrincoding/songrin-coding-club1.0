// ===========================================
// 송린중 코딩 동아리 관리자 시스템 v1.0
// ===========================================

// ---------- 데이터 ----------

let students = JSON.parse(localStorage.getItem("students")) || [];
let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
let classes = JSON.parse(localStorage.getItem("classes")) || [];
let lessons = JSON.parse(localStorage.getItem("lessons")) || [];
let notices = JSON.parse(localStorage.getItem("notices")) || [];

let settings = JSON.parse(localStorage.getItem("settings")) || {
    adminName: "관리자"
};

// ---------- 저장 ----------

function saveAll() {

    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("teachers", JSON.stringify(teachers));
    localStorage.setItem("classes", JSON.stringify(classes));
    localStorage.setItem("lessons", JSON.stringify(lessons));
    localStorage.setItem("notices", JSON.stringify(notices));
    localStorage.setItem("settings", JSON.stringify(settings));

}

// ---------- 페이지 ----------

const pages = [

    "dashboardPage",
    "studentPage",
    "teacherPage",
    "classPage",
    "lessonPage",
    "noticePage",
    "statisticsPage",
    "settingsPage"

];

function hideAllPages(){

    pages.forEach(id=>{

        document.getElementById(id).style.display="none";

    });

}

function openPage(id,title){

    hideAllPages();

    document.getElementById(id).style.display="block";

    document.getElementById("pageTitle").innerText=title;

}

// ---------- 메뉴 ----------

function showDashboard(){

    openPage("dashboardPage","관리자 대시보드");

    updateDashboard();

}

function showStudents(){

    openPage("studentPage","학생 관리");

    loadStudents();

}

function showTeachers(){

    openPage("teacherPage","선생님 관리");

    loadTeachers();

}

function showClasses(){

    openPage("classPage","클래스 관리");

    loadClasses();

}

function showLessons(){

    openPage("lessonPage","학습 관리");

    loadLessons();

}

function showNotices(){

    openPage("noticePage","공지사항");

    loadNotices();

}

function showStatistics(){

    openPage("statisticsPage","통계");

    updateStatistics();

}

function showSettings(){

    openPage("settingsPage","설정");

    loadSettings();

}
function updateServerTime(){

    const now = new Date();

    document.getElementById("serverTime").innerText =
        now.toLocaleTimeString("ko-KR");

    document.getElementById("serverDate").innerText =
        now.toLocaleDateString("ko-KR");

}

setInterval(updateServerTime,1000);
function logoutAdmin(){

    if(confirm("로그아웃 하시겠습니까?")){

        location.href="../index.html";

    }

}
window.onload=function(){

    updateServerTime();

    loadStudents();

    loadTeachers();

    updateStudentClassSelect();

    updateTeacherSelect();

    showDashboard();

};
// ===========================================
// 학생 추가
// ===========================================

function addStudent() {

    const name = document.getElementById("studentName").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const username = document.getElementById("studentUsername").value.trim();
    const classId = document.getElementById("studentClass").value;

    if (!name || !studentId || !username) {
        alert("모든 정보를 입력하세요.");
        return;
    }

    students.push({
        id: Date.now(),
        name,
        studentId,
        username,
        classId,
        approved: false,
        progress: 0,
        score: 0
    });

    saveAll();

    clearStudentForm();

    loadStudents();

    updateDashboard();

}

function clearStudentForm(){

    document.getElementById("studentName").value="";
    document.getElementById("studentId").value="";
    document.getElementById("studentUsername").value="";
    document.getElementById("studentClass").value="";

}
function loadStudents(list = students){

    const table = document.getElementById("studentTable");

    table.innerHTML="";

    if(list.length===0){

        table.innerHTML=`
        <tr>
            <td colspan="6">등록된 학생이 없습니다.</td>
        </tr>
        `;

        return;

    }

    list.forEach((student,index)=>{

        const cls = classes.find(c=>c.id==student.classId);

        table.innerHTML+=`

        <tr>

            <td>${student.name}</td>

            <td>${student.studentId}</td>

            <td>${student.username}</td>

            <td>${cls ? cls.name : "-"}</td>

            <td>

            ${student.approved
                ? "<span class='success'>승인</span>"
                : "<span class='warning'>대기</span>"}

            </td>

            <td>

                <button onclick="editStudent(${index})">수정</button>

                <button onclick="approveStudent(${index})">승인</button>

                <button onclick="deleteStudent(${index})">삭제</button>

            </td>

        </tr>

        `;

    });

}
function approveStudent(index){

    students[index].approved=true;

    saveAll();

    loadStudents();

    updateDashboard();

}
function deleteStudent(index){

    if(!confirm("삭제하시겠습니까?")) return;

    students.splice(index,1);

    saveAll();

    loadStudents();

    updateDashboard();

}
function editStudent(index){

    const student = students[index];

    const newName = prompt("학생 이름", student.name);
    if(newName === null) return;

    const newStudentId = prompt("학번", student.studentId);
    if(newStudentId === null) return;

    const newUsername = prompt("아이디", student.username);
    if(newUsername === null) return;

    student.name = newName;
    student.studentId = newStudentId;
    student.username = newUsername;

    saveStorage("students", students);

    loadStudents();
    updateDashboard();
    updateStatistics();

}
function searchStudents(){

    const keyword=document
    .getElementById("studentSearch")
    .value
    .trim()
    .toLowerCase();

    if(keyword===""){

        loadStudents();

        return;

    }

    const result=students.filter(student=>

        student.name.toLowerCase().includes(keyword) ||

        student.studentId.includes(keyword) ||

        student.username.toLowerCase().includes(keyword)

    );

    loadStudents(result);

}
function updateStudentClassSelect(){

    const select=document.getElementById("studentClass");

    if(!select) return;

    select.innerHTML="<option value=''>클래스 선택</option>";

    classes.forEach(cls=>{

        select.innerHTML+=`

        <option value="${cls.id}">

            ${cls.name}

        </option>

        `;

    });

}
// ===========================================
// 선생님 추가
// ===========================================

function addTeacher(){

    const input =
    document.getElementById("teacherName");


    let name =
    input.value.trim();


    if(name===""){

        alert("선생님 성함을 입력하세요.");

        return;

    }


    // 자동으로 선생님 붙이기

    if(!name.endsWith("선생님")){

        name += "선생님";

    }


    teachers.push({

        id: Date.now(),

        name:name

    });


    saveAll();


    input.value="";


    loadTeachers();


    updateTeacherSelect();


    updateDashboard();

}
// ===========================================
// 선생님 목록
// ===========================================

function loadTeachers(){

    const table =
    document.getElementById("teacherTable");


    if(!table) return;


    table.innerHTML="";


    if(teachers.length===0){

        table.innerHTML=`

        <tr>

        <td colspan="3">

        등록된 선생님이 없습니다.

        </td>

        </tr>

        `;

        return;

    }



    teachers.forEach((teacher,index)=>{


        const teacherClass =

        classes

        .filter(c=>c.teacherId==teacher.id)

        .map(c=>c.name)

        .join(",");



        table.innerHTML+=`

        <tr>


        <td>

        ${teacher.name}

        </td>


        <td>

        ${teacherClass || "-"}

        </td>


        <td>


        <button onclick="editTeacher(${index})">

        수정

        </button>


        <button onclick="deleteTeacher(${index})">

        삭제

        </button>


        </td>


        </tr>


        `;


    });


}
// ===========================================
// 선생님 수정
// ===========================================

function editTeacher(index){

    const teacher = teachers[index];

    const newName = prompt("선생님 이름", teacher.name);

    if(newName === null) return;

    teacher.name = newName;

    saveStorage("teachers", teachers);

    loadTeachers();

    updateTeacherSelect();

}
// ===========================================
// 선생님 삭제
// ===========================================

function deleteTeacher(index){


    if(!confirm(
        "선생님을 삭제하시겠습니까?"
    )) return;



    teachers.splice(index,1);



    saveAll();


    loadTeachers();


    updateTeacherSelect();


    updateDashboard();


}
// ===========================================
// 담당 선생님 선택
// ===========================================

function updateTeacherSelect(){


    const select =
    document.getElementById(
        "classTeacher"
    );


    if(!select) return;



    select.innerHTML=`

    <option value="">

    담당 선생님 선택

    </option>

    `;



    teachers.forEach(teacher=>{


        select.innerHTML+=`

        <option value="${teacher.id}">

        ${teacher.name}

        </option>

        `;


    });


}
// =======================================
// 클래스 추가
// =======================================

function addClass(){

    const name =
    document.getElementById("className")
    .value.trim();


    const teacherId =
    document.getElementById("classTeacher")
    .value;



    if(name===""){

        alert("클래스 이름을 입력하세요.");

        return;

    }



    const classes =
    getStorage("classes",[]);



    classes.push({

        id:Date.now(),

        name:name,

        teacherId:teacherId

    });



    saveStorage(

        "classes",

        classes

    );



    document.getElementById("className").value="";


    loadClasses();

    loadTeacherSelect();

    updateStudentClass();

}
// =======================================
// 클래스 목록
// =======================================

function loadClasses(){

    const table =
    document.getElementById("classTable");


    if(!table) return;



    const classes =
    getStorage("classes",[]);


    const teachers =
    getStorage("teachers",[]);



    table.innerHTML="";



    if(classes.length===0){

        table.innerHTML=`

        <tr>

        <td colspan="4">

        등록된 클래스가 없습니다.

        </td>

        </tr>

        `;

        return;

    }



    classes.forEach((cls,index)=>{


        const teacher =
        teachers.find(
            t=>t.id==cls.teacherId
        );



        const students =
        getStorage("students",[]);



        const count =
        students.filter(
            s=>s.classId==cls.id
        ).length;



        table.innerHTML+=`

        <tr>

        <td>
        ${cls.name}
        </td>


        <td>
        ${teacher ? teacher.name:"미지정"}
        </td>


        <td>
        ${count}명
        </td>


        <td>

        <button onclick="deleteClass(${index})">

        삭제

        </button>


        </td>


        </tr>

        `;


    });

}
// =======================================
// 클래스 삭제
// =======================================

function deleteClass(index){

    if(!confirm("클래스를 삭제하시겠습니까?")){

        return;

    }


    const classes =
    getStorage("classes",[]);



    classes.splice(index,1);



    saveStorage(

        "classes",

        classes

    );



    loadClasses();

    updateStudentClass();

}
function updateStudentClass(){

    const select =
    document.getElementById("studentClass");


    if(!select) return;



    const classes =
    getStorage("classes",[]);



    select.innerHTML=
    `
    <option value="">
    클래스 선택
    </option>
    `;



    classes.forEach(cls=>{


        select.innerHTML+=`

        <option value="${cls.id}">

        ${cls.name}

        </option>

        `;


    });

}
loadClasses();

updateStudentClass();

loadTeacherSelect();
function addLesson() {

    const title = document.getElementById("lessonTitle").value.trim();
    const video = document.getElementById("lessonVideo").value.trim();

    if (title === "") {
        alert("차시 제목을 입력하세요.");
        return;
    }

    lessons.push({
        id: Date.now(),
        title: title,
        video: video,
        createdAt: new Date().toLocaleDateString("ko-KR")
    });

    saveStorage("lessons", lessons);

    document.getElementById("lessonTitle").value = "";
    document.getElementById("lessonVideo").value = "";

    loadLessons();
    updateDashboard();
    updateStatistics();
}
function loadLessons() {

    const table = document.getElementById("lessonTable");

    table.innerHTML = "";

    if (lessons.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="3">
                등록된 차시가 없습니다.
            </td>
        </tr>
        `;

        return;
    }

    lessons.forEach((lesson,index)=>{

        table.innerHTML += `
        <tr>

            <td>${lesson.title}</td>

            <td>${lesson.video || "-"}</td>

            <td>

                <button onclick="editLesson(${index})">
                수정
                </button>

                <button onclick="deleteLesson(${index})">
                삭제
                </button>

            </td>

        </tr>
        `;

    });

}
function deleteLesson(index){

    if(!confirm("삭제하시겠습니까?")) return;

    lessons.splice(index,1);

    saveStorage("lessons",lessons);

    loadLessons();

    updateDashboard();

    updateStatistics();

}
function editLesson(index){

    const lesson = lessons[index];

    const newTitle = prompt("차시 제목",lesson.title);

    if(newTitle===null) return;

    const newVideo = prompt("영상 주소",lesson.video);

    if(newVideo===null) return;

    lesson.title = newTitle;
    lesson.video = newVideo;

    saveStorage("lessons",lessons);

    loadLessons();

}
document.getElementById("totalLessons").innerText =
lessons.length + "개";
function addNotice() {

    const title = document.getElementById("noticeTitle").value.trim();
    const content = document.getElementById("noticeContent").value.trim();

    if (title === "" || content === "") {
        alert("제목과 내용을 입력하세요.");
        return;
    }

    notices.unshift({
        id: Date.now(),
        title: title,
        content: content,
        date: new Date().toLocaleDateString("ko-KR")
    });

    saveStorage("notices", notices);

    document.getElementById("noticeTitle").value = "";
    document.getElementById("noticeContent").value = "";

    loadNotices();
    updateDashboard();
}
function loadNotices() {

    const list = document.getElementById("noticeList");

    list.innerHTML = "";

    if (notices.length === 0) {

        list.innerHTML = "등록된 공지가 없습니다.";

        return;

    }

    notices.forEach((notice,index)=>{

        list.innerHTML += `

        <div class="notice-card">

            <h3>${notice.title}</h3>

            <small>${notice.date}</small>

            <p>${notice.content}</p>

            <button onclick="editNotice(${index})">
            수정
            </button>

            <button onclick="deleteNotice(${index})">
            삭제
            </button>

        </div>

        <hr>

        `;

    });

}
function deleteNotice(index){

    if(!confirm("삭제하시겠습니까?")) return;

    notices.splice(index,1);

    saveStorage("notices",notices);

    loadNotices();

    updateDashboard();

}
function editNotice(index){

    const notice = notices[index];

    const title = prompt("공지 제목",notice.title);

    if(title===null) return;

    const content = prompt("공지 내용",notice.content);

    if(content===null) return;

    notice.title = title;
    notice.content = content;

    saveStorage("notices",notices);

    loadNotices();

    updateDashboard();

}
const recent = document.getElementById("recentNotices");

if (recent) {

    if (notices.length === 0) {

        recent.innerHTML = "공지가 없습니다.";

    } else {

        recent.innerHTML = notices
            .slice(0,3)
            .map(n=>`
                <p>
                <strong>${n.title}</strong><br>
                ${n.date}
                </p>
            `)
            .join("");

    }

}