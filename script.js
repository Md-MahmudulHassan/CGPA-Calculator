function generateCourseInputs() {
    const numTheoryCourses = parseInt(document.getElementById('numTheoryCourses').value);
    const numLabCourses = parseInt(document.getElementById('numLabCourses').value);
    const courseInputs = document.getElementById('courseInputs');
    courseInputs.innerHTML = '';
    
    // Generate theory course inputs
    for (let i = 0; i < numTheoryCourses; i++) {
        courseInputs.innerHTML += `
            <div class="course">
                <h3>Theory Course ${i + 1}</h3>
                <label>Course Name:</label>
                <input type="text" name="theoryCourseName${i}" required>

                <label>Final Exam Score (out of 210):</label>
                <input type="number" name="theoryFinalScore${i}" required>

                <label>Class Test Score (out of 60):</label>
                <input type="number" name="theoryTestScore${i}" required>

                <label>Attendance & Assignment Score (out of 30):</label>
                <input type="number" name="theoryAssignmentScore${i}" required>

                <label>Credits:</label>
                <input type="number" name="theoryCredits${i}" required>
            </div>`;
    }

    // Generate lab course inputs
    for (let i = 0; i < numLabCourses; i++) {
        courseInputs.innerHTML += `
            <div class="course">
                <h3>Lab Course ${i + 1}</h3>
                <label>Course Name:</label>
                <input type="text" name="labCourseName${i}" required>

                <label>Performance & Lab Report (out of 50):</label>
                <input type="number" name="labPerformance${i}" required>

                <label>Lab Test & Quiz (out of 20):</label>
                <input type="number" name="labQuiz${i}" required>

                <label>Central Viva (out of 20):</label>
                <input type="number" name="labViva${i}" required>

                <label>Attendance (out of 10):</label>
                <input type="number" name="labAttendance${i}" required>

                <label>Credits:</label>
                <input type="number" name="labCredits${i}" required>
            </div>`;
    }

    document.getElementById('initialForm').style.display = 'none';
    document.getElementById('courseForm').style.display = 'block';
}

function calculateSemesterCGPA() {
    const form = document.getElementById('courseForm');
    const courseInputs = form.elements;
    let totalWeightedCGPA = 0;
    let totalCredits = 0;
    let resultHTML = "<h2>Results</h2>";

    // Theory courses
    for (let i = 0; courseInputs[`theoryCredits${i}`]; i++) {
        const courseName = courseInputs[`theoryCourseName${i}`].value;
        const finalScore = parseFloat(courseInputs[`theoryFinalScore${i}`].value);
        const testScore = parseFloat(courseInputs[`theoryTestScore${i}`].value);
        const assignmentScore = parseFloat(courseInputs[`theoryAssignmentScore${i}`].value);
        const credits = parseFloat(courseInputs[`theoryCredits${i}`].value);

        const totalScore = finalScore + testScore + assignmentScore;
        const percentage = (totalScore / 300) * 100;
        let gradePoint = 0;

        if (percentage >= 80) gradePoint = 4;
        else if (percentage >= 75) gradePoint = 3.75;
        else if (percentage >= 70) gradePoint = 3.5;
        else if (percentage >= 65) gradePoint = 3.25;
        else if (percentage >= 60) gradePoint = 3;
        else if (percentage >= 55) gradePoint = 2.75;
        else if (percentage >= 50) gradePoint = 2.5;
        else if (percentage >= 45) gradePoint = 2.25;
        else if (percentage >= 40) gradePoint = 2;
        else gradePoint = 0;

        totalWeightedCGPA += gradePoint * credits;
        totalCredits += credits;
        resultHTML += `<p>${courseName} GPA: ${gradePoint}</p>`;
    }

    // Lab courses
    for (let i = 0; courseInputs[`labCredits${i}`]; i++) {
        const courseName = courseInputs[`labCourseName${i}`].value;
        const performanceScore = parseFloat(courseInputs[`labPerformance${i}`].value) * 0.5;
        const quizScore = parseFloat(courseInputs[`labQuiz${i}`].value) * 0.2;
        const vivaScore = parseFloat(courseInputs[`labViva${i}`].value) * 0.2;
        const attendanceScore = parseFloat(courseInputs[`labAttendance${i}`].value) * 0.1;
        const credits = parseFloat(courseInputs[`labCredits${i}`].value);

        const totalScore = performanceScore + quizScore + vivaScore + attendanceScore;
        const percentage = (totalScore / 100) * 100;
        let gradePoint = 0;

        if (percentage >= 80) gradePoint = 4;
        else if (percentage >= 75) gradePoint = 3.75;
        else if (percentage >= 70) gradePoint = 3.5;
        else if (percentage >= 65) gradePoint = 3.25;
        else if (percentage >= 60) gradePoint = 3;
        else if (percentage >= 55) gradePoint = 2.75;
        else if (percentage >= 50) gradePoint = 2.5;
        else if (percentage >= 45) gradePoint = 2.25;
        else if (percentage >= 40) gradePoint = 2;
        else gradePoint = 0;

        totalWeightedCGPA += gradePoint * credits;
        totalCredits += credits;
        resultHTML += `<p>${courseName} GPA: ${gradePoint}</p>`;
    }

    const semesterCGPA = (totalWeightedCGPA / totalCredits).toFixed(2);
    resultHTML += `<h3>Semester CGPA: ${semesterCGPA}</h3>`;

    document.getElementById('result').innerHTML = resultHTML;
    document.getElementById('printButton').style.display = 'block';
}
