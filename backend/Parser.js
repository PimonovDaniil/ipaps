import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useEffect, useState} from "react";
//import 'fast-html-parser';
//import DOMParser from 'react-native-html-parser';

const lesson = {
    name: "",
    lessonType: "",
    teacher: "",
    classroom: "",
    isReal: false,
    isCancelled: false,
    isHoliday: false,
    isDistant: false,
    timeStart: "",
    timeEnd: "",
}

const semester = {
    name: "",
    disciplines: [],
}

const discipline = {
    name: "",
    needToStudy: false,
    marks: [],
}
const mark = {
    value: 0,
    type: "",
    passed: false,
}

const skip = {
    name: "",
    date: "",
}

export const getTimetable = async (faculty, week, group) => {
    if (isNaN(week)) {
        console.log("Week must be a number")
        return [[], "error", 0]
    }
    let response
    if (week === 0) {
        response = await fetch('https://timetable.tusur.ru/searches/common_search?utf8=✓&search[common]=' + group +
            '&commit=')
    } else {
        response = await fetch('https://timetable.tusur.ru/faculties/' + faculty + '/groups/' + group + '?week_id=' + week.toString())
    }
    if (response.ok !== true) {
        console.log("Fail")
        return [[], "error", 0]
    }
    const html = await response.text()
    const htmlString = html.toString()
    const facultyStart = response.url.indexOf("faculties/") + 10
    const facultyEnd = response.url.indexOf("/", facultyStart)
    const facultyUsed = response.url.substring(facultyStart, facultyEnd)
    if (htmlString.includes("На данную неделю еще не опубликовано расписание")) {
        return [[], "empty", 0]
    }

    const weekIdStart = htmlString.indexOf("week_id=", htmlString.indexOf("current")) + 8
    const weekIdEnd = htmlString.indexOf("\"", weekIdStart)
    const weekId = parseInt(htmlString.substring(weekIdStart, weekIdEnd))
    let res = []
    const splitToTables = htmlString.split('table-lessons noprint')
    for (let i = 1; i < splitToTables.length; i++) {
        const currentDay = splitToTables[i]
        let day = []
        for (let j = 1; j <= 7; j++) {
            const currentLessonObject = Object.create(lesson)
            const currentLessonStart = currentDay.indexOf("<tr class='lesson_" + j.toString() + "'")
            const currentLessonEnd = currentDay.indexOf("</tr>", currentLessonStart)
            const currentLesson = currentDay.substring(currentLessonStart, currentLessonEnd)
            const lessonSplitBySpan = currentLesson.split("<span>")
            const startTime = lessonSplitBySpan[1].substring(0, 5)
            const endTime = lessonSplitBySpan[2].substring(0, 5)
            currentLessonObject.timeStart = startTime
            currentLessonObject.timeEnd = endTime
            if (currentLesson.includes("'hidden'")) {
                currentLessonObject.isReal = true
                const dataStart = currentLesson.indexOf("<div class='hidden for_print'")
                const dataEnd = currentLesson.indexOf("</div>", dataStart)
                const data = currentLesson.substring(dataStart, dataEnd)
                const disciplineStart = currentLesson.indexOf(">", currentLesson.indexOf("<abbr")) + 1
                const disciplineEnd = currentLesson.indexOf("</abbr>")
                const discipline = currentLesson.substring(disciplineStart, disciplineEnd)
                const lessonTypeStart = data.indexOf(">", data.indexOf("<span class='kind'")) + 1
                const lessonTypeEnd = data.indexOf("</span>", lessonTypeStart)
                const lessonType = data.substring(lessonTypeStart, lessonTypeEnd)
                const classroomStart = data.indexOf(">", data.indexOf("<span class='auditoriums'")) + 1
                const classroomEnd = data.indexOf("</span>", classroomStart)
                const classroom = data.substring(classroomStart, classroomEnd)
                const teacherStart = data.indexOf(">", data.indexOf("<span class='group'")) + 1
                const teacherEnd = data.indexOf("</span>", teacherStart)
                const teacher = data.substring(teacherStart, teacherEnd)
                currentLessonObject.name = discipline
                currentLessonObject.lessonType = lessonType
                currentLessonObject.classroom = classroom
                currentLessonObject.teacher = teacher
            }
            if (currentLesson.includes("Занятие отменено")) {
                currentLessonObject.isCancelled = true
            }
            if (currentLesson.includes("реализуется в эиос")) {
                currentLessonObject.isDistant = true
            }
            if (currentLesson.includes("Праздничный день")) {
                currentLessonObject.isHoliday = true
            }
            day.push(currentLessonObject)
        }
        res.push(day)
    }
    return [res, facultyUsed, weekId]
}

export const getAttendance = async (name, surname, group) => {
    const response = await fetch('https://attendance.tusur.ru/search?utf8=✓&q=' + surname + " " + name + " " + group + '&commit=Найти')
    if (response.ok !== true) {
        console.log("Fail")
        return [[], [], []]
    }
    const html = await response.text()
    const htmlString = html.toString()
    if (htmlString.includes("Ничего не найдено")) {
        console.log("Wrong name")
        return [[], [], []]
    }
    const fullResponse = await fetch(response.url + '?filter=from_semester_begin')
    if (response.ok !== true) {
        console.log("Fail")
        return [[], [], []]
    }
    const fullHtml = await fullResponse.text()
    const fullHtmlString = fullHtml.toString()
    const firstChartStart = fullHtmlString.indexOf("new LineChart('chart-1',") + 25
    const firstChartEnd = fullHtmlString.indexOf(");", firstChartStart)
    const firstChartString = fullHtmlString.substring(firstChartStart, firstChartEnd)
    const firstChart = JSON.parse(firstChartString)
    const secondChartStart = fullHtmlString.indexOf("new BarChart('chart-2',") + 24
    const secondChartEnd = fullHtmlString.indexOf(");", secondChartStart)
    const secondChartString = fullHtmlString.substring(secondChartStart, secondChartEnd)
    const secondChart = JSON.parse(secondChartString)
    const skipsStart = fullHtmlString.indexOf("<tbody>") + 35
    const skipsEnd = fullHtmlString.indexOf("</tbody>", skipsStart) - 20
    const skips = fullHtmlString.substring(skipsStart, skipsEnd)
    const skipsSplit = skips.split("</tr>\n          <tr>")
    let skipArray = []
    for (let i = 0; i < skipsSplit.length; i++) {
        const currentSkips = skipsSplit[i]
        const nameStart = currentSkips.indexOf("<td>") + 4
        const nameEnd = currentSkips.indexOf("</td>")
        const name = currentSkips.substring(nameStart, nameEnd).trim().replace("\n", "").replace(/  +/g, ' ')
        const dateStart = currentSkips.indexOf("<td>", nameEnd) + 4
        const dateEnd = currentSkips.indexOf("</td>", dateStart)
        const date = currentSkips.substring(dateStart, dateEnd).trim()
        const currentSkip = Object.create(skip)
        currentSkip.name = name
        currentSkip.date = date
        skipArray.push(currentSkip)
    }
    return [firstChart, secondChart, skipArray]
}


export const getGrades = async (name, surname, group, course) => {
    if (isNaN(course)) {
        console.log("Course must be a number")
        return [[], [], 0]
    }
    let response = await fetch('https://ocenka.tusur.ru/student_search?utf8=✓&surname=' + surname + '&name=' + name + '&group=' + group + '&commit=Найти')
    if (response.ok !== true) {
        console.log("Fail")
        return [[], [], 0]
    }

    const html = await response.text()
    const htmlString = html.toString()
    if (!htmlString.includes("context_id&quot;:")) {
        console.log("Wrong name")
        return [[], [], 0]
    }
    const contextIdStart = htmlString.indexOf("context_id&quot;:") + 17
    const contextIdEnd = htmlString.indexOf(",", contextIdStart)
    const contextId = htmlString.substring(contextIdStart, contextIdEnd)
    if (course === 0) {
        response = await fetch('https://ocenka.tusur.ru/api/students/' + contextId + '?context_id=' + contextId + '&context_type=student&role=student_search')
    } else {
        response = await fetch('https://ocenka.tusur.ru/api/students/' + contextId + '?context_id=' + contextId + '&context_type=student&course=' + course.toString() + '&role=student_search')
    }
    if (response.ok !== true) {
        console.log("Fail")
        return [[], [], 0]
    }
    const jsonResponse = await response.text()
    const json = JSON.parse(jsonResponse)
    const availableCourses = json.available_courses
    const currentCourse = json.course
    let res = []
    for (let i = 0; i < json.semesters.length; i++) {
        let currentSemester = Object.create(semester)
        currentSemester.name = json.semesters[i].title
        currentSemester.disciplines = []
        for (let j = 0; j < json.semesters[i].disciplines.length; j++) {
            let currentDiscipline = Object.create(discipline)
            currentDiscipline.name = json.semesters[i].disciplines[j].title
            currentDiscipline.marks = []
            currentDiscipline.needToStudy = json.semesters[i].disciplines[j].need_to_study
            if (currentDiscipline.needToStudy === true) {
                const currentMarks = json.marks[json.semesters[i].disciplines[j].id]
                for (let k = 0; k < currentMarks.length; k++) {
                    let currentMark = Object.create(mark)
                    currentMark.passed = currentMarks[k].passed
                    currentMark.type = currentMarks[k].kind
                    currentMark.value = currentMarks[k].grade
                    currentDiscipline.marks.push(currentMark)
                }
            }
            currentSemester.disciplines.push(currentDiscipline)
        }
        res.push(currentSemester)
    }
    return [res, availableCourses, currentCourse]
}

// export default function App() {
//     useEffect(() => {
//         getTimetable("", 0, "439-3").then(function(result) {
//             console.log(JSON.stringify(result, null, 2));
//         })
//
//     }, []);
//     return (
//         <View style={styles.container}>
//             <Button onPress={() => {
//                 console.log("sus")
//                 getTimetable("", 0, "439-3").then(function(result) {
//                     console.log(JSON.stringify(result, null, 2));
//                 })
//             }}
//                     title="Get Timetable"
//             />
//             <Button onPress={() => {
//                 console.log("amog")
//                 getAttendance("Иван", "Климов", "439-3").then()
//             }}
//                     title="Get Attendance"
//             />
//             <Button onPress={() => {
//                 console.log("us")
//                 getGrades("Сергей", "Краснов", "439-3", 0).then()
//             }}
//                     title="Get Grades"
//             />
//             <StatusBar style="auto"/>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });