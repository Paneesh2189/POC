import React from 'react';
import Modal from "@paprika/modal";
import Button from "@paprika/button";
import Collapsible from "@paprika/collapsible";
import Spinner from "@paprika/spinner";
import Input from "@paprika/input";
import Toast from "@paprika/toast";
import L10n from "@paprika/l10n";

const btnType = {info:0, install:1, upgrade:2, delete:3};
let modalFooterBtn ="";
let toastContent = "";
let toolkitHeader = "";
function calToolkitHeader(modalType, reqCompleted, enableDelete, modalAction, isPending){
  switch(modalType){
    case btnType.info:
      toolkitHeader =  "Toolkit Info";
      break;
    case btnType.install:
      modalFooterBtn =<Button kind="primary" isDisabled={!reqCompleted} isPending={isPending} onClick={() => installAction(isPending,modalAction)}>Install</Button>;
      toolkitHeader = "Install toolkits?";
      break;
    case btnType.upgrade:
      modalFooterBtn =<Button kind="default" isDisabled={!reqCompleted} onClick={() => console.log('Upgrade in progress...')}>Upgrage</Button>;
      toastContent = <L10n><Toast hasCloseButton={false} isOpen={true} kind="warning" id="upgrade_toast">
                      On upgrade, all changes made to be installed version will be lost.</Toast></L10n>;
      toolkitHeader =  "Upgrade toolkits?";
      break
    case btnType.delete:
      toastContent = <L10n><Toast hasCloseButton={false} isOpen={true} kind="warning" id="upgrade_toast">
                      You will not be able to restore this toolkit.</Toast></L10n>;
      modalFooterBtn =<Button kind="destructive" isDisabled={!enableDelete} onClick={() => console.log('Delete in progress...')}>Delete</Button>;
      toolkitHeader =  "Delete toolkits?";
      break
    default:
    break;
  }
}
const installAction = (isPending,modalAction) =>{
  toastContent = <L10n><Toast hasCloseButton={false} isOpen={true} kind="info" id="install_progress">
    One moment, install in progress.</Toast></L10n>;
  toolkitHeader = "Installing toolkit"; 
  modalAction();  
  //   toastContent = <L10n><Toast hasCloseButton={false} isOpen={true} kind="success" id="install_progress">
  //  Toolkit has been successfully installed.</Toast></L10n>;   
}

function ModalContent(props){    
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const [enableDelete, setEnableDelete] = React.useState(false);
    calToolkitHeader(props.modalType, props.isReqCompleted, enableDelete, props.modalAction, props.isPending);    
    const validateDelete = (evtTarget) => {
      evtTarget.value = evtTarget.value.toUpperCase();
      if (evtTarget.value === "DELETE"){
        setEnableDelete(true);
      }else{
        setEnableDelete(false);
      }
    }

   const handleCollapse = (event) =>{
      debugger;
    }
    
    let modalContent;
  if(!props.isReqCompleted){
    modalContent = <Spinner caption='loading...'size='medium'/>
  }else{
    modalContent = <React.Fragment>
    <p>(Tollkit Name) contains</p>
    <Collapsible a11yText="collapsible section" isCollapsed={true} isDisabled={false} id="1" data-collapse="1"
      label={(isCollapsed)? "Robotic Scripts - 3":"Robotic Scripts:"} iconAlign="left" 
      onClick={event => {handleCollapse(event);}} >
      <ul>
        <li>Script A</li>
        <li>Script B</li>
        <li>Script C</li>
      </ul>
    </Collapsible>
    <Collapsible a11yText="collapsible section" isCollapsed={isCollapsed} isDisabled={false}
      label={(isCollapsed)? "Storyboards - 4":"Storyboards:"}iconAlign="left"
      onClick={() => setIsCollapsed(!isCollapsed)} >
      <ul>
        <li>Storyboard A</li>
        <li>Storyboard B</li>
        <li>Storyboard C</li>
        <li>Storyboard D</li>
      </ul>
    </Collapsible>
    <Collapsible
      a11yText="collapsible section" isCollapsed={isCollapsed} isDisabled={false}
      label={(isCollapsed)? "Collections - 5":"Collections:"} iconAlign="left"
      onClick={() => setIsCollapsed(!isCollapsed)} >
      <ul>
        <li>Collection A</li>
        <li>Collection B</li>
        <li>Collection C</li>
        <li>Collection D</li>
        <li>Collection E</li>
      </ul>
    </Collapsible>
    <div className={(props.modalType !== btnType.delete) ? "hide":"deleteValidation magin10"}>
      <span> Type "DELETE" into the field to authorize deleteing the toolkit:</span>
      <Input className="magin10 width50" onChange={e => {validateDelete(e.target);}} data-autofocus="true"/>
    </div>
  </React.Fragment>
  }

    return(
        <React.Fragment>
          <Modal isOpen={props.isOpen} onClose={() => props.onClick()} size='small'>
            <Modal.Header>{toolkitHeader}</Modal.Header>
            <Modal.Content>
              {toastContent}
              {modalContent}
            </Modal.Content>
            <Modal.Footer className={(props.modalType === btnType.info) ? "hide":""}>
    {/* <Button kind="primary" isDisabled={!props.isReqCompleted} className={(props.modalType !== btnType.install) ? "hide":""} 
    onClick={() => console.log('Install in progress...')}>Install</Button>
    <Button kind="default" isDisabled={!props.isReqCompleted} className={(props.modalType !== btnType.upgrade) ? "hide":""} 
    onClick={() => console.log('Upgrade in progress...')}>Upgrage</Button>
    <Button kind="destructive" isDisabled={!enableDelete} className={(props.modalType !== btnType.delete) ? "hide":""} 
    onClick={() => console.log('Delete in progress...')}>Delete</Button> */}
    {modalFooterBtn}
    <Button kind="minor" isDisabled={props.isPending} onClick={() => props.onClick()}>
      Cancel
    </Button>
  </Modal.Footer>
          </Modal>                    
          </React.Fragment>
    );
}

export default ModalContent;