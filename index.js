function loadHomeNotices() {

    const notices =
    JSON.parse(
        localStorage.getItem("notices")
    ) || [];

    const noticeList =
    document.getElementById(
        "homeNoticeList"
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

loadHomeNotices();