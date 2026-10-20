// ดึง elements ที่ต้องใช้จากหน้าเว็บ
const todo_input = document.getElementById("todo-input");
const add_btn = document.getElementById("add-btn");
const todo_list = document.getElementById("todo-list");

// เก็บรายการทั้งหมดไว้ใน Array
let name_list = [];

// บันทึกรายการลง Local Storage (แปลง Array เป็น String)
function updateStorage() {
  localStorage.setItem("name_list", JSON.stringify(name_list));
}

// สร้าง <li> หนึ่งรายการ พร้อมปุ่มลบ
function createLi(text) {
  const li = document.createElement("li");

  // ข้อความของรายการ
  const span = document.createElement("span");
  span.textContent = text;

  // ปุ่มลบรายการ
  const del_btn = document.createElement("button");
  del_btn.type = "button";
  del_btn.textContent = "ลบ";

  // กดลบ: ลบออกจากหน้าเว็บและ Local Storage
  del_btn.addEventListener("click", () => {
    const index = Array.from(todo_list.children).indexOf(li);
    name_list.splice(index, 1);
    todo_list.removeChild(li);
    updateStorage();
  });

  li.appendChild(span);
  li.appendChild(del_btn);
  return li;
}

// กดปุ่มเพิ่ม: เพิ่มรายการใหม่ต่อท้าย
add_btn.addEventListener("click", () => {
  const text = todo_input.value.trim();

  // ถ้าช่องว่างหรือมีแต่ช่องว่าง ให้ไม่ต้องเพิ่ม
  if (text === "") {
    return;
  }

  name_list.push(text);
  todo_list.appendChild(createLi(text));
  updateStorage();

  // ล้างช่องพิมพ์
  todo_input.value = "";
});

// โหลดข้อมูลจาก Local Storage เมื่อเปิดหรือรีเฟรชหน้า
function loadList() {
  const saved_data = localStorage.getItem("name_list");

  // ยังไม่เคยมีข้อมูล ให้เริ่มด้วยรายการว่าง
  if (saved_data === null) {
    return;
  }

  try {
    const saved_list = JSON.parse(saved_data);

    // ตรวจสอบว่าเป็น Array ก่อนนำมาแสดง
    if (Array.isArray(saved_list)) {
      name_list = saved_list;

      saved_list.forEach((text) => {
        todo_list.appendChild(createLi(text));
      });
    }
  } catch (error) {
    // ข้อมูลเสียหาย ให้เริ่มด้วยรายการว่าง
    name_list = [];
  }
}

loadList();
