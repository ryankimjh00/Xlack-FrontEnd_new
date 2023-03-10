import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SidebarOption from "./SidebarOption";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import AddChannel from "../Channel/AddChannel";
import { RootState } from "../../app/store";
import ChannelMenu from "../Channel/ChannelMenu";
import { ClickedChannel } from "../../variable/ClickedChannelSlice";
import Workspace from "../Workspace/Workspace";
import Channel from "../Channel/Channel";
import Modal from "../Modal";

function Sidebar() {
  const max_history_size = 6;
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [historyMap, setHistoryMap] = useState(new Map<string, string>());
  const WorkspaceData = useSelector(
    (state: RootState) => state.getMyWorkSpace.hashed
  );

  const UpdateChannel = useSelector(
    (state: RootState) => state.UpdateChannel.title
  );
  const [ChannelList, setChannelList] = useState<string[]>([]); // 기존에 가입되어있던 채널들 정보
  // const [showProfileMenu, setshowProfileMenu] = useState(false);
  const [showChannelMenu, setshowChannelMenu] = useState(false);
  const [showChannels, setshowChannels] = useState(false);
  const channelMenuRef = useRef<HTMLDivElement>(null);
  // const editProfile = async () => {
  //     try {
  //         const res = await axios.patch(`${backUrl}accounts/user/`,
  //         {
  //             username : `${userName}`,
  //             first_name: `${firstName}`.
  //             last_name: `${lastName}`
  //         },
  //         {
  //             headers: {
  //                 Authorization: `Bearer ${at}`
  //             }
  //         });

  //     } catch (err) {
  //         console.log(err);
  //     }
  // };

  useEffect(() => {
    if (window.localStorage.getItem("history") !== null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const h = JSON.parse(window.localStorage.getItem("history"));
      // 새로고침할떄 history 남아있게

      const arrMap = h.reduce(
        (map: Map<string, string>, obj: { name: string; value: string }) => {
          map.set(obj.name, obj.value);
          return map;
        },
        new Map()
      );
      setHistoryMap(arrMap);
    }
    if (WorkspaceData !== null) {
      console.log(
        "내 workspace와 내부 channle들의 hashed_value : ",
        WorkspaceData
      );

      WorkspaceData.forEach((element) => {
        element.chat_channel.forEach((cha) => {
          setChannelList([...ChannelList, cha.hashed_value]);
        });
      });
    }
  }, [WorkspaceData]);
  useEffect(() => {
    // channelMenuRef 를 이용해 이외의 영역이 클릭되면 채널메뉴 없애기
    function handleClickOutside(e: MouseEvent): void {
      if (
        channelMenuRef.current &&
        !channelMenuRef.current.contains(e.target as Node)
      ) {
        setshowChannelMenu(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [channelMenuRef]);
  const storeHistory = (name: string, hv: string) => {
    historyMap.delete(name);
    historyMap.set(name, hv);
    console.log(historyMap.get(name));
    const array = Array.from(historyMap, ([name, value]) => ({
      name,
      value,
    })).reverse();
    if (array.length > max_history_size) array.pop();
    window.localStorage.setItem("history", JSON.stringify(array));
  };
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  const onClickshowChannelMenu = useCallback(() => {
    setshowChannelMenu((prev) => !prev);
  }, []);

  const onClickshowChannels = useCallback(() => {
    setshowChannels((prev) => !prev);
  }, []);
  return (
    <SidebarContainer>
      <SidebarHeader onClick={onClickToggleModal}>
        {isOpenModal && <Modal onClickToggleModal={onClickToggleModal}></Modal>}
        <SidebarTop className="sidebarTop">
          <div className="sidebarHeaderButton">
            <div className="sidebarHeaderInfo">
              <div className="teamName">
                <div className="loadingSpacer"></div>
                <span>
                  {WorkspaceData.map((element, i) => {
                    return <Workspace {...element} key={i} />;
                  })}
                </span>
              </div>
            </div>
          </div>
        </SidebarTop>

        {/* <span onClick={editProfile}>
                    <CreateIcon />
                </span> */}
      </SidebarHeader>

      <hr />
      <span onClick={onClickshowChannels}>
        <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      </span>
      <hr />
      {showChannels && <AddChannel Icon={AddIcon} title="Add Channel" />}
      {showChannels &&
        WorkspaceData.map((element, i) => {
          return (
            <div key={i}>
              <Workspace {...element} />
              {element.chat_channel.map((c, index) => {
                return (
                  <span
                    key={index}
                    ref={channelMenuRef}
                    onClick={(e) => {
                      e.preventDefault();
                      storeHistory(c.name, c.hashed_value);
                      dispatch(ClickedChannel(c.hashed_value)); //enterRoomId 를 channel id로 변경
                      //connectChat(enterRoomId)
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      console.log("채널 메뉴열기!");
                      setx(e.clientX);
                      sety(e.clientY);
                      showChannelMenu && onClickshowChannelMenu(); //새로 우클릭 한 곳에 메뉴가 다시 나오게 초기화
                      onClickshowChannelMenu();
                    }}
                  >
                    <Channel {...c} />
                  </span>
                );
              })}
            </div>
          );
        })}

      {showChannelMenu && (
        <div style={{ position: "absolute", top: y, left: x }}>
          <ChannelMenu />
        </div>
      )}
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
`;
const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  justify-content: space-between;
  align-items: center;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;

    :hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
`;
const SidebarInfo = styled.div`
  flex: 1;
  //???
  > div > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > div > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > div > h3 > .MuiSvgIcon-root {
    font-size: 13px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;

    :hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
`;
const SidebarTop = styled.div`
  .sidebarTop {
    align-items: stretch;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    position: relative;
    font-size: 18px;
    font-weight: 900;
    line-height: 1.33334;
    min-height: 50px;
    background: rgb(82, 38, 83);
    color: #ffffff;

    .sidebarHeaderButton {
      outline: none;
      display: flex;
      cursor: pointer;
      padding: 12px 54px 0 16px;
      align-items: flex-start;
      min-height: inherit;
      min-width: 0;
      flex-direction: row-reverse;
      background-color: initial;
      border-color: rgb(82, 38, 83);

      .sidebarHeaderInfo {
        flex: 1;
        min-width: 0;
        box-sizing: border-box;

        .teamName {
          display: flex;
          align-items: center;
          padding-left: 4px;
          max-width: 100%;
          margin-left: -4px;

          .loadingSpacer {
            width: 65%;
            border-radius: 8px;
            height: 15px;
            background-color: #ffffff1a;
            margin-right: 16px;
            box-sizing: inherit;
          }
        }
      }
    }
`;
