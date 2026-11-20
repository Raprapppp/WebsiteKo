        const form = document.getElementById("studentForm");
        const nameInput = document.getElementById("nameInput");
        const emailInput = document.getElementById("emailInput");
        const courseSelect = document.getElementById("courseSelect");
        const table = document.getElementById("studentTable");
        const title = document.getElementById("formTitle");
        const saveBtn = document.getElementById("saveBtn");
        const cancelBtn = document.getElementById("cancelBtn");

        let students = JSON.parse(localStorage.getItem("students")) || [];
        let editIndex = -1;

        function displayStudents() {
            table.innerHTML = "";

            if (students.length === 0) {
                table.innerHTML =
                    "<tr><td colspan='4'>No students found.</td></tr>";
            }

            for (let i = 0; i < students.length; i++) {
                let row = document.createElement("tr");

                row.innerHTML = `
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <button type="button" onclick="editStudent(${i})">Edit</button>
                        <button type="button" onclick="deleteStudent(${i})">Delete</button>
                    </td>
                `;

                row.children[0].textContent = students[i].name;
                row.children[1].textContent = students[i].email;
                row.children[2].textContent = students[i].program;

                table.appendChild(row);
            }
        }

        form.addEventListener("submit", function(event) {
            event.preventDefault();

            let name = nameInput.value.trim();
            let email = emailInput.value.trim();
            let program = courseSelect.value;

            if (name === "" || email === "" || program === "") {
                return;
            }

            if (editIndex === -1) {
                students.push({
                    name: name,
                    email: email,
                    program: program
                });
            } else {
                students[editIndex].name = name;
                students[editIndex].email = email;
                students[editIndex].program = program;
            }

            localStorage.setItem("students", JSON.stringify(students));

            resetForm();
            displayStudents();
        });

        function editStudent(index) {
            nameInput.value = students[index].name;
            emailInput.value = students[index].email;
            courseSelect.value = students[index].program;

            editIndex = index;

            title.textContent = "Edit Student";
            saveBtn.textContent = "Update";
            cancelBtn.hidden = false;
        }

        function deleteStudent(index) {
            students.splice(index, 1);

            localStorage.setItem("students", JSON.stringify(students));

            resetForm();
            displayStudents();
        }

        function resetForm() {
            form.reset();

            editIndex = -1;
            title.textContent = "Add Student";
            saveBtn.textContent = "Add Student";
            cancelBtn.hidden = true;
        }

        cancelBtn.addEventListener("click", resetForm);

        displayStudents();