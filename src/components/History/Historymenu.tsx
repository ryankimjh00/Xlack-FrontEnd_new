import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ClickedChannel } from "../../variable/ClickedChannelSlice";

const Historymenu = () => {
  const [historyData, sethistoryData] = useState<string[]>();
  const dispatch = useDispatch();
  useEffect(() => sethistoryData(Object.keys(window.localStorage)), []);

  return (
    <div className="relative inline-block text-left">
      <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
        <div
          className="py-1 "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <a
            className="block block px-4 py-2 text-md text-gray-700 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
            role="menuitem"
          >
            <span className="flex flex-col">
              <h1>Recent</h1>
            </span>
          </a>
          {historyData &&
            historyData.map((h, i) => {
              return (
                <>
                  <a
                    key={i}
                    className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                    role="menuitem"
                    onClick={() => {
                      dispatch(ClickedChannel(window.localStorage.getItem(h)));
                    }}
                  >
                    <span className="flex flex-col">
                      <Op key={i}># {h}</Op>
                    </span>
                  </a>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const Op = styled.span`
  border-bottom: 1px solid #49274b;
`;

export default Historymenu;
