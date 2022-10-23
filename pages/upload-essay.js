import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {config} from "../components/Firebase/config";
import {doc, getDoc, getFirestore, setDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import SearchBar from "../components/Searchbar";
import {useRouter} from "next/router";

export default function UploadEssay() {
    const [user, loading, error] = useAuthState(getAuth(initializeApp(config)));
    const [userData, setUserData] = useState()
    const [school, setSchool] = useState()
    const [allDepts, setAllDepts] = useState()
    const [essay, setEssay] = useState("")
    const [essaySaved, setEssaySaved] = useState(false)
    const [selectedDept, setSelectedDept] = useState()
    const db = getFirestore(initializeApp(config));
    const router = useRouter()

    async function fetchDepts() {
        const userDatas = (await getDoc(doc(db, 'schools', school.id))).data()
        let depts = []
        for (const dept of userDatas.departments) {
            depts.push({...(await getDoc(dept)).data(), id: dept.id})
            // depts.push((await getDoc(dept)).data())
        }
        console.log(depts)
        setSelectedDept(depts[0])
        setAllDepts(depts)
    }
    useEffect(() => {
        if (school) {
            fetchDepts()
        }
    }, [school])

    async function saveEssay() {
        const userRef = doc(db, 'users', user.uid)
        const deptRef = doc(db, 'departments', selectedDept.id)
        await setDoc(doc(db, "essays", (user.uid+school.name+selectedDept.name).replaceAll(' ', '').toLowerCase()), {
            author:userRef,
            department:deptRef,
            essayPrompt:selectedDept.essayPrompt,
            essay:essay
        });
        await setEssaySaved(true)
        await router.push("/profile")
    }

    return <div>
        <Navbar noSearchBar/>
        <Hero backgroundColor="purple" header="Upload Your Essay" subheader="It’s as easy as ‘Select, Copy and Paste!’"/>
        <div className="mx-auto max-w-3xl mt-10 mb-24">
            <h1 className="font-semibold text-2xl">School</h1>
            {
                !school ? <SearchBar overrideLink={setSchool}/> : <div>
                    <h1 className="text-xl font-medium px-2 py-3 bg-purple-500 text-white">{school.name}</h1>
                    <h2 className="font-medium text-lg mt-3">Pick a department</h2>
                    {
                        allDepts && <>
                            <select value={selectedDept.name} onChange={(e) => {
                                for (let i =0; i < allDepts.length; i++) {
                                    if (allDepts[i].name == e.target.value) {
                                        console.log("match " + allDepts[i].name)
                                        setSelectedDept(allDepts[i])
                                    }
                                }
                            }} className="border border-l-1 border-black px-2 py-3 rounded" name="depts" id="depts">
                            {
                                allDepts.map((dept) => (
                                    <option key={dept.index}>{dept.name}</option>
                                ))
                            }
                        </select>
                            <h2 className="font-medium text-lg mt-3">Essay Prompt</h2>
                            <p className="italic mb-5">{selectedDept.essayPrompt}</p>
                            <textarea value={essay} onChange={(e) => setEssay(e.target.value)} placeholder="Paste your essay here" className="mb-5 px-3 py-3 w-full border border-dashed border-black"/>
                            <div>
                                <button
                                    onClick={saveEssay}
                                    disabled={essaySaved}
                                    className="bg-pink-600 text-white px-3 py-3 rounded hover:opacity-80 active:opacity-90">
                                    Submit</button>
                            </div>
                            {
                                essaySaved && <p className="text-green-600">Essay Saved! Redirecting :)</p>
                            }

                            <small className="text-slate-500">secure af</small>
                        </>
                    }

                </div>
            }
        </div>
    </div>
}