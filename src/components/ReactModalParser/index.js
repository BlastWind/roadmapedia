import React, { Component } from "react";
import ReactModal from "react-modal";
import "./ReactModalParser.css"

const ReactModalParser = ({ isOpen, closeModal, children }) => {
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: 0,
            borderRadius: 0,
            border: "none",
            overflow: "none",

        }
    };
    return (
        <ReactModal
            isOpen={isOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={closeModal}
            style={customStyles}
            overlayClassName="ReactModalOverlay"
        >
            {children}
        </ReactModal>
    );
};

export default ReactModalParser;
