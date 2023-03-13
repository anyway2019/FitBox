import React, { useState } from "react";
import styles from "./Tab.module.scss"

const Tab = React.memo(({children,value,onChange})=>{
    const header = React.Children.map(children, child => child.type.name === 'Header' ? child : null);
    const body = React.Children.map(children, child => child.type.name === 'Body' ? child : null);
    return (
    <>
        <div>
            {header.map((item)=>{
                return React.Children.map(item.props.children, child => {
                    return React.cloneElement(child, {
                        key:child.props.id,
                        onClick: () => {
                            onChange(child.props.id);
                        },
                    });
                });
            })}
        </div>
        <div>
            {body}
        </div>
    </>
    );
});

const Header = ({ children }) => children;
Tab.Header = Header;

const Body = ({ children }) => children;
Tab.Body = Body;

const Label = ({ children }) => children;
Tab.Label = Label;

const Item = ({ children }) => children;
Tab.Item = Item;

export default Tab;