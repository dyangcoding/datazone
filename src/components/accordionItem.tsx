import React from "react"
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";

export interface ItemProps {
    readonly title: string;
    readonly isToggled?: Boolean | undefined;
}

interface ItemState {
    readonly isToggled: Boolean;
}

export class AccordionItem extends React.PureComponent<ItemProps, ItemState> {

    constructor(props: ItemProps) {
        super(props);
        this.state = {
            isToggled: this.props.isToggled ? this.props.isToggled : false
        };

        this.onToggleClick = this.onToggleClick.bind(this);
    }
    
    private onToggleClick(): void {
        this.setState(state => ({isToggled: !state.isToggled}));
    }

    public render(): React.ReactNode {
        return (
            <div>
                <div className="border rounded border-white p-2 bg-light" onClick={this.onToggleClick}>
                    <div className="flex justify-between items-center p-2">
                        <div className="lead">{this.props.title}</div>
                        {this.state.isToggled ? <ChevronUpIcon className="h-6 w-6" /> : <ChevronDownIcon className="h-6 w-6"/>}
                    </div>
                </div>
                {this.state.isToggled && this.props.children}
            </div>
        );
    }
}