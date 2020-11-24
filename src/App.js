import React, {useState} from 'react';
import './App.scss';
import Button from "@paprika/button";
import Tabs from "@paprika/tabs";
import Pill from "@paprika/pill";
import ModalContent from "./ModalData";
import Delete from "@paprika/icon/lib/Trashbin";
import InfoIcon from "@paprika/icon/lib/InfoCircle";
import { UploaderContext } from "@paprika/uploader/lib/Uploader";

function YourUI() {
  const {
    /*provided by context*/ 
    cancelFile,
    FileInput,
    files,
    isCompleted,
    isDisabled,
    isDraggingOver,
    isDragLeave,
    removeFile,
    upload,
  } = React.useContext(UploaderContext);
 
  return (
    <>
      <FileInput>
        <div>FILE INPUT ZONE</div>
      </FileInput>
      {files.length ? (
        <ul>
          {files.map(file => (
            <li>{file.filename}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

function App() {  
  const btnType = {info:0, install:1, upgrade:2, delete:3};

  const list =[{
    id: '1',
    name: 'JHU COVID-19 Case Data Robot and Storyboard (Non-Unicode)',
    description: 'spaghetti yarn steal the warm chair right after you get',
    version: '1.0.0'
  }, {
    id: '2',
    name: 'JHU COVID-19 Case Data Robot and Storyboard (Unicode)',
    description: 'spaghetti yarn steal the warm chair right after you get',
    version: '1.0.0'
  },{
    id: '3',
    name: 'Example 2',
    description: 'spaghetti yarn steal the warm chair right after you get',
    version: '1.0.0'
  },{
    id: '4',
    name: 'Example 3',
    description: 'spaghetti yarn steal the warm chair right after you get',
    version: '1.0.0'
  }
];

  const [isOpen, setIsOpen] = useState(false);
  const [isReqCompleted, setIsReqCompleted] = useState(false);
  const [modalType, setModalType] = useState();
  const [actionInProgress, setActionInProgress] = useState(false);

  const handleOpenModal = (isOpen, type, enableActionBtn = false) => {    
    setIsReqCompleted(false)
    setModalType(type);
    setIsOpen(true);
    setTimeout(function(){      
      setIsReqCompleted(true)    
    },500);
  };  
  const handleCloseModal = () => {
    if(!actionInProgress){
      setIsOpen(false);
    }    
  };
  const handleModalAction = () => {
    setActionInProgress(true);
    setTimeout(function(){      
      setActionInProgress(false);  
    },3000);
  }
  let listRendering = (
    <ul className="sil-list">
      {list.map((item) => {
        return (
          <li className="sil-list__item" key={item.id || 0}>
            <div>
              <span>{item.name} </span>
              <Button.Icon className="icon_bg info_icon" onClick={() => handleOpenModal(true, btnType.info)}>
                <InfoIcon />
              </Button.Icon>
              <Pill size="small"> {item.version ? ` (v${item.version})` : ''}</Pill>              
              <p>
                {item.description}                
              </p>
            </div>
            <div className="sil-list__buttons">
              <div>
                <Button onClick={() => handleOpenModal(true, btnType.install)}>Install</Button>
                <Button.Icon className="icon_bg delete_icon" onClick={() => handleOpenModal(true, btnType.delete)}>
                  <Delete />
                </Button.Icon>
              </div>              
            </div>
          </li>
        );
      })}
    </ul>
  );  

  return (
    <React.Fragment>
    <Tabs>
      <Tabs.List>
        <Tabs.Tab>Installed</Tabs.Tab>
        <Tabs.Tab>Available to install</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel>
          {listRendering}
          <Uploader>
            <YourUI />
          </Uploader>
        </Tabs.Panel>
        <Tabs.Panel>{listRendering}</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>

<ModalContent isOpen={isOpen} isReqCompleted={isReqCompleted} modalType={modalType} isPending={actionInProgress}
onClick= {handleCloseModal} modalAction={handleModalAction}/>
</React.Fragment>
  );
}

export default App;
