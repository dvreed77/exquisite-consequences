import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

interface IComp {
  next?: any;
  prev?: any;
}

export function BottomNav({ onSubmit }: { onSubmit: any }) {
  let location = useLocation();
  const history = useHistory();

  const onClick = () => {
    onSubmit();
    history.push("/output");
  };

  const comps: { [key: string]: any } = {
    "/": (
      <div>
        <Link
          to={"/language"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded leading-normal text-base"
        >
          Next
        </Link>
      </div>
    ),
    "/language": (
      <div>
        <Link
          to={"/"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded leading-normal text-base mr-1"
        >
          Back
        </Link>
        <Link
          to={"/color"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded leading-normal text-base ml-1"
        >
          Next
        </Link>
      </div>
    ),
    "/color": (
      <div>
        <Link
          to={"/language"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded leading-normal text-base mr-1"
        >
          Back
        </Link>
        <Link
          to={"/draw"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded leading-normal text-base ml-1"
        >
          Next
        </Link>
      </div>
    ),
    "/draw": (
      <div>
        <Link
          to={"/color"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded leading-normal text-base mr-1"
        >
          Back
        </Link>
        <Link
          to={"/draw2"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded leading-normal text-base ml-1"
        >
          Next
        </Link>
      </div>
    ),
    "/draw2": (
      <div>
        <Link
          to={"/draw"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded leading-normal text-base mr-1"
        >
          Back
        </Link>
        <button
          onClick={onClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded leading-normal text-base ml-1"
        >
          Submit
        </button>
      </div>
    ),
    "/final": (
      <div>
        <Link
          to={"/draw"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded leading-normal text-base mr"
        >
          Back
        </Link>
        <Link
          to={"/output"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded leading-normal text-base"
        >
          Next
        </Link>
      </div>
    ),
    "/output": <div></div>,
  };

  return (
    <div className="w-full text-center my-5">{comps[location.pathname]}</div>
  );
}
