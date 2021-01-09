import React from "react";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import "@reach/dialog/styles.css";

import { logout } from "./../scripts/remoteActions";

const UserDialog = ({ userDialog, setUserDialog, userStore }) => {
    const close = () => setUserDialog(false);
    return (
        <div>
            <Dialog isOpen={userDialog} onDismiss={close}>
                <DialogOverlay
                    style={{ background: "hsla(0, 100%, 100%, 0.3)" }}
                    isOpen={userDialog}
                    onDismiss={close}
                >
                    <DialogContent
                        style={{
                            boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)",
                        }}
                    >
                        <button className="close-button" onClick={close}>
                            <VisuallyHidden>Close</VisuallyHidden>
                            <span aria-hidden>×</span>
                        </button>
                        <h4>Email: {userStore.currentUser.email}</h4>
                        <button onClick={() => logout()}>Logout</button>
                    </DialogContent>
                </DialogOverlay>
            </Dialog>
        </div>
    );
};

export default UserDialog;
