import React, {useEffect, useState} from "react";
import {useDb} from "../Firebase/db";
import {useRouter} from "next/router";

export default function SearchBar({className, overrideLink}) {
  const db = useDb();
  const [query, setQuery] = useState("");
  const [schoolData, setSchoolData] = useState(null);
  const router = useRouter();

  useEffect(async () => {
    if (!db) return;
    setSchoolData(await db.getSchools());
  }, [db === null]);

  if (!db) return <p>Loading...</p>;

  let filteredSchools = [];
  if (query !== "" && schoolData) {
    schoolData.forEach((doc) => {
      const name = doc.data().name;
      if (!name.toLowerCase().startsWith(query.toLowerCase())) return;
      filteredSchools.push({
        "id": doc.id,
        "name": name
      });
    });
  }

  console.log(filteredSchools);

  const ListItem = ({key, schoolId, schoolName}) => (
    <li key={key}>
      <button type="button" className="inline-flex py-1 px-2 w-full hover:bg-gray-100" onClick={() => {
        if (!overrideLink) {
          router.push(`/school?id=${schoolId}`)
        } else {
          overrideLink({
            id:schoolId,
            name:schoolName,
          })
        }
      }}>{schoolName}</button>
    </li>
  );

  return (
    <div className={className}>
      <form className="max-w-sm py-4">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="w-full py-1 pl-12 pr-20 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </form>
      <div className={`${query === "" ? "hidden" : ""} z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow relative`}>
        <ul className="py-1 text-sm text-gray-700" aria-labelledby="dropdown-button">
          {filteredSchools.map((school) => {
            return <ListItem key={school.id} schoolId={school.id} schoolName={school.name}/>;
          })}
        </ul>
      </div>
    </div>
  );
}