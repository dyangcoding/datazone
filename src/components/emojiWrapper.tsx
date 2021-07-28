import React, { Fragment, useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { BaseEmoji, Emoji, EmojiData, Picker } from "emoji-mart";

const EmojiPicker = ( { id, name, onChange } : { id: string, name: string, onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void}) => {
    const [inputEmoji, setEmoji] = useState("");
    const [isPickerToggled, togglePicker] = useState(false);

    const onEmojiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmoji(event.target.value);
        if (onChange) {
            onChange(event);
        }
    }

    const onEmojiClicked = (emoji: EmojiData, event: React.MouseEvent) => {
        if ((emoji as BaseEmoji).native) {
            setEmoji((emoji as BaseEmoji).native)
        }
        togglePicker(!isPickerToggled);
    }

    return (
        <Fragment>
            <div className="relative mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300">
                    <EmojiHappyIcon className="text-gray-500 h-6 w-6" aria-hidden="true" onClick={() => togglePicker(!isPickerToggled)} />
                </span>
                <input value={inputEmoji} id={id} name={name} type="text" autoComplete={name} onChange={onEmojiChange}
                    placeholder="matching an emoji within the body of a Tweet"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                {isPickerToggled ? <Picker onClick={onEmojiClicked} set="twitter" style={{ position: "absolute", top: "50px", left: "0px" }} /> : null}
            </div>
        </Fragment>
    );
}

export default EmojiPicker;