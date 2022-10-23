import Navbar from "../components/Navbar";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {config} from "../components/Firebase/config";
import React, {useEffect, useState} from "react";
import {getFirestore, doc, getDoc, collection, query, where, getDocs} from "firebase/firestore";
import Link from "next/link";
import {useRouter} from "next/router";
import {data} from "autoprefixer";

export default function Profile () {
    const [user, loading, error] = useAuthState(getAuth(initializeApp(config)));
    const [userData, setUserData] = useState()
    const [requestsMade, setRequestsMade] = useState(false)
    const [essays, setEssays] = useState()
    const db = getFirestore(initializeApp(config));
    const router = useRouter()

    useEffect(async () => {
        if (user) {
            const userDatas = (await getDoc(doc(db, 'users', user.uid))).data()
            const userCollectionRef = collection(db, 'essays')
            const essayDataQuery = await query(userCollectionRef, where("author", "==", doc(db, 'users', user.uid)))
            const essayData = (await getDocs(essayDataQuery)).docs
            let essaysTemp = []
            for (const doc1 of essayData) {
                console.log(doc1.id)
                // doc.data() is never undefined for query doc snapshots
                const {name} = (await getDoc(doc1.data().department)).data()
                essaysTemp.push({...doc1.data(), name, id:doc1.id})
            }
            console.log(essaysTemp)
            setEssays(essaysTemp)
            setUserData(userDatas)
            setRequestsMade(true)
        } else {
            if (!loading) {
                router.push("/login")
            }
        }
    }, [user, loading])
    if (!loading && requestsMade) return <div>
        <Navbar noSearchBar/>
        <div className="px-5 md:px-0 mt-24 max-w-3xl mx-auto">
            {
                userData ? <>
                    <h1 className="font-bold text-4xl mb-5">Hi, {userData.name.split(" ")[0]}</h1>
                    <h2 className="mt-12 font-semibold text-xl mb-6 ">Your Essays</h2>
                <div className="flex mb-10">
                    {
                        essays && essays.map(({essayPrompt, name, index, id}) => {
                            return <Link key={index} href={"/essay/" + id}>
                                <a  className="flex flex-col items-center bg-white shadow-lg px-2 py-3">
                                    <h3 className="font-bold">{name}</h3>
                                    <small>{essayPrompt}</small>
                                </a>
                            </Link>
                        })
                    }
                </div>
                    <Link href="/upload-essay"><a className="bg-pink-600 text-white px-3 py-3 rounded hover:opacity-80 active:opacity-90">
                        Upload Essay +</a></Link>

                    <h2 className="mt-12 font-semibold text-xl mb-4">Your Transcript Data</h2>
                    {
                        userData.courses ? userData.courses.map(({dept, courseCode, grade, index}) => (
                            <div className="gap-4 justify-center bg-white shadow-lg px-4 py-2 w-full flex flex-col mb-3" key={courseCode}>
                                <div>
                                    <small>Department</small>
                                    <h4>{dept}</h4>
                                </div>
                                <div>
                                    <small>Course Code</small>
                                    <h4>{courseCode}</h4>
                                </div>
                                <div>
                                    <small>Grade</small>
                                    <h4>{grade}</h4>
                                </div>

                            </div>
                        )) : <Link href="/upload-transcript"><a className="bg-pink-600 text-white px-3 py-3 rounded hover:opacity-80 active:opacity-90">Add Transcript</a></Link>
                    }
                </> : <div className="max-w-sm mx-auto flex justify-center flex-col">
                    <h1 className="font-bold mb-5 text-2xl capitalize text-center">You must add your transcript before you can begin submitting essays</h1>
                    <Link href="/upload-transcript"><a className="bg-pink-600 text-white px-3 py-3 rounded hover:opacity-80 active:opacity-90">Add Transcript &rarr;</a></Link>
                </div>
            }

        </div>
    </div>
    return <div>
        <Navbar noSearchBar/>
        <p>Loading</p>
    </div>
}