// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as pdf from "pdf-parse"
import * as formidable from "formidable"
import * as fs from "fs";
export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(req, res) {

    const form = formidable.formidable()
    let returned = {}
    await form.parse(req, (err, fields, files) => {
        if (err) reject({ err })
        var oldPath = files.pdf.filepath;
        var rawData = fs.readFileSync(oldPath)
        pdf(rawData).then(function(data) {
            const name = fields.name
            const major = getMajor(data.text, name)

            const courses = getCourses(data.text)
            returned = {
                name,
                major,
                courses
            }
            res.status(200).json({ returned })
        })
    })
}


// Questions
// What is your full name as typed on your transcript?
// * call getStanding(lines, name) <- String "name" being their full name | String "lines" being all of the PDF data

function getLineByLine(text) {
    return text.split("\n")
}

function getMajor(lines, name) {
    lines = getLineByLine(lines);
    let major = "";
    for (const line of lines) {
        if (line.includes(name)) {
            major = line.replace(name,'')
        }
    }

    return major;
}

// Upload Transcript

const potentialQuarters = [
    "AUTUMN",
    "WINTER",
    "SPRING",
    "SUMMER"
]

// Quarter begins with saying the quarter
// The quarter documentation ends with saying "QTR"


function getCourses(lines) {
    const courses = [];
    lines = lines.split("----------------------------------------------------")[1]
    lines = getLineByLine(lines);
    let quarterStart = false;
    for (const line of lines) {
        // Don't include current classes
        if (line.includes("* WORK IN PROGRESS *")) break;
        // First let's check when a quarter <starts>
        let quarterLine = false;
        if (!quarterStart) {
            for (const quarter of potentialQuarters) {
                if (line.includes(quarter)) {
                    quarterLine = true
                    quarterStart = true
                }
            }
        } else {
            if (line.includes("QTR  ATTEMPTED:")) {
                quarterStart = false
            }
        }
        if (quarterStart && !quarterLine) {
            const newLine = line.substring(1);
            const lineArray = newLine.split(/\s+/);
            let dept = "";
            let courseCode;
            // Some courses have goofy dept. codes, let's separate that efficiently
            for (const item of lineArray) {
                if (isNaN(item)) {
                    dept += item
                } else {
                    courseCode = item
                    break;
                }
            }
            let grade = lineArray.reverse()[0];

            // console.log(dept, courseCode, grade)
            courses.push(
                {
                    dept,courseCode,grade
                }
            )
            // console.log(courseName[0] + courseName[1])
        }
    }
    return courses;
}