import Hero from "../../components/Hero";
import Chip from "../../components/Chip";
import {useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {config} from "../../components/Firebase/config";
import {collection, doc, getDoc, getDocs, getFirestore, query, where} from "firebase/firestore";
import {useRouter} from "next/router";

export default function Essay() {
    const [user, loading, error] = useAuthState(getAuth(initializeApp(config)));
    const db = getFirestore(initializeApp(config));
    const router = useRouter()
    const { id } = router.query

    const [essayData, setEssayData] = useState();
    const [deptData, setDeptData] = useState();
    const [authorData, setAuthorData] = useState();
    const [gpa, setGpa] = useState(0);

    useEffect(async () => {
        if (user) {
            // Fetch essay info
            const essayDatas = (await getDoc(doc(db, 'essays', id))).data()
            setEssayData(essayDatas)
            // Fetch dept info
            const deptDatas = (await getDoc(essayDatas.department)).data()
            setDeptData(deptDatas)
            // Fetch author grades
            const authorDatas = (await getDoc(essayDatas.author)).data()
            let gpa = 0.0;
            let len = 0;
            for (const {grade} of authorDatas.courses) {
                if (!isNaN(grade)) {
                    gpa+=parseInt(grade);
                    len++
                }
            }
            console.log(gpa)
            setGpa(Math.round((gpa / len) * (100)) / 100)
            setAuthorData(authorDatas)

            console.log(deptDatas, authorDatas)
        }
         else {
            if (!loading) {
                await router.push("/login")
            }
        }
    }, [user, loading])

    if (deptData && essayData && authorData) return (
        <div>
            <Navbar noSearchBar/>
            <Hero header={deptData.name}
                  backgroundColor="blue"
                  subheader={"University of Washington | " + authorData.major}>
                <Chip textColor="blue">Direct to major</Chip>
                <Chip>Current second year</Chip>
            </Hero>
            <div className="mt-16 px-6 max-w-4xl mx-auto">
                <div className="grid gap-20 grid-cols-1 md:grid-cols-4">
                    <div className="col-span-1">
                        <div className="sticky top-10 mt-4">
                            <h1 className="font-bold text-2xl mb-10">2021-22 Application Cycle</h1>
                            <h2 className="font-semibold text-xl mb-3">About the Student</h2>
                            <div className="mb-3">
                                <h3 className="font-semibold text-md">Internship Experience</h3>
                                <p className="text-md">Yes</p>
                            </div>
                            <div className="mb-3">
                                <h3 className="font-semibold text-md">GPA</h3>
                                <p className="text-md">{gpa}</p>
                            </div>
                            <div className="mb-3">
                                <details>
                                    <summary className="font-semibold text-md">Full Course History</summary>
                                {
                                    authorData.courses.map(({courseCode, dept, grade, index}) => {
                                        let backgroundColor ="skyblue";
                                        if (grade < 2.0) backgroundColor = "red";
                                        if (grade < 3.0) backgroundColor = "orange";
                                        if (grade >= 3.0) backgroundColor = "green";
                                        return <div key={index} className="mb-3">
                                            <h4 className="font-medium">{dept} {courseCode}</h4>
                                            <div
                                                style={{backgroundColor}}
                                                className={`flex justify-center rounded-full w-10 px-2 py-1 font-medium text-xs text-white`}>
                                                {grade}
                                            </div>
                                        </div>
                                    })
                                }
                                </details>

                            </div>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <h1 className="font-bold text-3xl">Personal Statement</h1>
                        <h2 className="mt-4 text-lg primary-color font-medium">{essayData.essayPrompt}</h2>
                        <div className="prose mt-12 text-md leading-loose">
                            {essayData.essay}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
    return <div>
        <Navbar noSearchBar/>
        <p>Loading</p>
    </div>
}
