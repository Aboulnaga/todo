import React, { useEffect } from "react";
import logoSVG from "./logoSvg";
import { Link } from "react-router-dom";
import useAppContext from "../../Utils/useAppContext";
export default function Header() {
  const {
    state: { searchInput },
    despatch,
  } = useAppContext();

  // console.log(searchInput);
  return (
    <header>
      <div className="container max">
        <div className="logo">
          <Link>
            {logoSVG} <h1>LOGO</h1>
          </Link>
        </div>
        <div className="search">
          <form onSubmit={e => e.preventDefault()}>
            <input
              onInput={e => {
                e.preventDefault();
                if (e.target.value) {
                  despatch({ searchInput: e.target.value });
                } else {
                  despatch({ searchInput: null });
                }
              }}
              type="search"
              name="q"
              placeholder="search by title...."
            />
          </form>
        </div>
      </div>
    </header>
  );
}
