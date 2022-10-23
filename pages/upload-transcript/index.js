import React from "react";
import axios from "axios";
import {useAuth} from "../../components/Firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import {useDb} from "../../components/Firebase/db";

import {useRouter} from "next/router";
import {useApp} from "../../components/Firebase/app";
import {getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {config} from "../../components/Firebase/config";
import {getFirestore, doc, setDoc} from "firebase/firestore";
import Navbar from "../../components/Navbar";

export default function UploadTranscript() {
    const [user, loading, error] = useAuthState(getAuth(initializeApp(config)));

    const auth = useAuth();
    const db = getFirestore(initializeApp(config));

    const router = useRouter();

    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    const [name, setName] = React.useState("")
    const [confirmed, setConfirmed] = React.useState(false)
    const [uploading, setUploading] = React.useState(false)
    const [uploaded, setUploaded] = React.useState(false)
    const [data, setData] = React.useState({})
    // ref
    const inputRef = React.useRef(null);

    const handleConfirm = function (e) {
        e.preventDefault();
        if (name.length > 0) {
            setName(name.trim())
            setConfirmed(true)
        }
    }

    // handle drag events
    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = async function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            console.log(e)
            const formData = new FormData();

            await formData.append("pdf", e.dataTransfer.files[0])
            await formData.append("name", name)
            console.log('response', formData);
            const config = {
                headers: { 'content-type': 'multipart/form-data' },
            };

            await setUploading(true)
            const response = await fetch('/api/upload-transcript', {
                method:"POST",
                body:formData
            })
            const {returned} = await response.json()
            setData(returned)
            console.log(returned)
            await setUploading(false)
            await setUploaded(true)

        }
    };

    // triggers when file is selected with click
    const handleChange = async function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0])
        }
    };

// triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    if (auth.loading) {
        return <p>Loading...</p>;
    }

    async function saveToProfile() {
        await setDoc(doc(db, "users", user.uid), {
            ...data,
            essays: {}
        });
        await router.push("/profile")
        console.log(user)
    }

    // if a user is logged in, redirect to a page of your liking
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
        console.log(user)
        if (!loading) {
            if (!user?.uid) {
                router.push("/login")
            }
        }
    }, [loading])




    return <div>
        <Navbar noSearchBar/>
        <div className="px-5 max-w-sm mx-auto mt-24">
            {
                !uploaded && <>
                    <h1 className="text-center text-2xl font-bold mb-1 capitalize">Upload your transcript</h1>
                    <p className="text-center text-slate-500 mb-5">We will use your transcript to verify your admission. Your Courses
                        will also be shown but your name will be anonymized.
                    </p>
                </>
            }

            {
                !uploaded ? !confirmed ?  <form
                    onSubmit={handleConfirm}
                    className="">
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Confirm your full name from transcript"
                        className="w-full border border-slate-800 rounded py-2 px-2 mb-4"/>
                    <button
                        type="submit"
                        className="font-semibold bg-blue-500 w-full px-3 py-2 text-white rounded-lg">
                        Confirm
                    </button>
                </form> : <form className="" id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                    <input ref={inputRef} type="file" id="input-file-upload" multiple={false} onChange={handleChange} />
                    <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
                        <div>
                            <p>Drag and drop your transcript here or</p>
                            <button className="upload-button" onClick={onButtonClick}>Upload your transcript</button>
                        </div>
                    </label>
                    {
                        uploading && <h1>Uploading</h1>
                    }
                    { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
                </form> : <div className="w-full">
                    <h1 className="text-center text-2xl font-bold mb-1 capitalize">Thanks for uploading, {name.split(" ")[0]}!</h1>
                    <p className="text-center text-slate-500 mb-5">Here is what we know about you:</p>
                    <div className="flex flex-col items-center">
                        <h3 className="font-bold text-blue-600 text-center mb-3">{data.major}</h3>

                        <details>
                            <summary>Your parsed courses:</summary>
                            <div>
                                {
                                    data.courses.map(({dept, courseCode, grade}) => {
                                        return <div className="gap-4 justify-center bg-white shadow-lg px-4 py-2 w-full flex flex-col mb-3" key={courseCode}>
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
                                    })
                                }
                            </div>
                        </details>
                        <button
                            onClick={saveToProfile}
                            className="font-semibold bg-blue-500 w-full px-3 py-2 text-white rounded-lg mt-4 mb-6">
                            Submit Profile
                        </button>

                    </div>

                </div>
            }
        </div>




    </div>
}