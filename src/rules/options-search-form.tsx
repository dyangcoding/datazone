import React from "react";
import Dropdown from "../components/dropdown";
import { RuleOptionsProperties } from "../models/ruleOptions";
import optionalMap, { optionalEntries } from "../utils/dropdownUtils";
import { languageEntries, languageMap } from "../utils/languageUtils";

interface OptionsFormProps {
    readonly options: RuleOptionsProperties;
    readonly onChange?: (value: RuleOptionsProperties) => void;
}

interface OptionsFormState {
    readonly options: RuleOptionsProperties;
}

export class OptionsSearchForm extends React.PureComponent<OptionsFormProps, OptionsFormState> {
    constructor(props: OptionsFormProps) {
        super(props);

        this.state = {
            options: props.options
        };

        this.onIsRetweetChange = this.onIsRetweetChange.bind(this);
        this.onIsVerifiedChange = this.onIsVerifiedChange.bind(this);
        this.onIsReplyChange = this.onIsReplyChange.bind(this);
        this.onHasHashtagsChange = this.onHasHashtagsChange.bind(this);
        this.onHasLinksChange = this.onHasLinksChange.bind(this);
        this.onHasMediaChange = this.onHasMediaChange.bind(this);
        this.onHasImagesChange = this.onHasImagesChange.bind(this);
        this.onHasVideosChange = this.onHasVideosChange.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
        this.onSampleChange = this.onSampleChange.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    public render(): React.ReactNode {
        const options = this.state.options;
        console.log(options);
        return (
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div>
                        <legend className="text-base font-medium text-gray-900">By Tweet Type</legend>
                        <div className="flex mt-4 text-sm space-x-2">
                            <Dropdown id="is-retweet" name="Is Retweet" value={this.getInitialValue(options.isRetweet)} 
                                items={optionalEntries} onChange={this.onIsRetweetChange} />
                            <Dropdown id="is-verified" name="Is Verified" value={this.getInitialValue(options.isVerified)} 
                                items={optionalEntries} onChange={this.onIsVerifiedChange} />
                            <Dropdown id="is-reply" name="Is Reply" value={this.getInitialValue(options.isReply)} 
                                items={optionalEntries} onChange={this.onIsReplyChange} />
                        </div>
                    </div>
                    <div>
                        <legend className="text-base font-medium text-gray-900">By Tweet Content</legend>
                        <div className="flex mt-4 text-sm space-x-2">
                            <Dropdown id="has-hashtags" name="Has Hashtags" value={this.getInitialValue(options.hasHashtags)} 
                                items={optionalEntries} onChange={this.onHasHashtagsChange} />
                            <Dropdown id="has-images" name="Has Images" value={this.getInitialValue(options.hasImages)}
                                items={optionalEntries} onChange={this.onHasImagesChange} />
                            <Dropdown id="has-links" name="Has Links" value={this.getInitialValue(options.hasLinks)}
                                items={optionalEntries} onChange={this.onHasLinksChange} />
                        </div>
                    </div>
                    <div>
                        <div className="flex mt-4 text-sm space-x-2">
                            <Dropdown id="has-media" name="Has Media" value={this.getInitialValue(options.hasMedia)}
                                items={optionalEntries} onChange={this.onHasMediaChange} />
                            <Dropdown id="has-videos" name="Has Videos" value={this.getInitialValue(options.hasVideos)}
                                items={optionalEntries} onChange={this.onHasVideosChange} />
                        </div>
                    </div>
                    <div>
                        <legend className="text-base font-medium text-gray-900">By Tweet Content</legend>
                        <div className="flex mt-4 space-x-4">
                            <div className="flex flex-1 justify-between">
                                <Dropdown id="language" name="Language" items={languageEntries.map(entry => entry.language)} 
                                    onChange={this.onLanguageChange} value={this.getInitialLanguage(options.language)} />
                            </div>
                            <div className="flex flex-1 justify-between">
                                <Dropdown id="sample" name="Sample" items={["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]} 
                                    onChange={this.onSampleChange} value={options.sample?.toLocaleString()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private getInitialValue(selected: boolean | undefined): string {
        if (selected === undefined) {
            return "Unset";
        } else if (selected) {
            return "Yes";
        } else {
            return "No";
        }
    }

    private getInitialLanguage(language: string | undefined): string {
        for (const entry of languageEntries) {
            if (language === entry.identifier) {
                return entry.language;
            }
        }
        return "";
    }

    private onIsRetweetChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        this.handleChange({isRetweet: optionalMap.get(event.target.value)});
    }

    private onIsVerifiedChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        this.handleChange({isVerified: optionalMap.get(event.target.value)});
    }

    private onIsReplyChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        this.handleChange({isReply: optionalMap.get(event.target.value)});
    }

    private onHasHashtagsChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        this.handleChange({hasHashtags: optionalMap.get(event.target.value)});
    }

    private onHasLinksChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        this.handleChange({hasLinks: optionalMap.get(event.target.value)});
    }

    private onHasMediaChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        this.handleChange({hasMedia: optionalMap.get(event.target.value)});
    }

    private onHasImagesChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        this.handleChange({hasImages: optionalMap.get(event.target.value)});
    }

    private onHasVideosChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        this.handleChange({hasVideos: optionalMap.get(event.target.value)});
    }

    private onLanguageChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        this.handleChange({language: languageMap().get(event.target.value)});
    }

    private onSampleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        this.handleChange({sample: Number.parseInt(event.target.value, 10)})
    }

    private handleChange(options: RuleOptionsProperties): void {
        this.setState(previousState => ({options: {...previousState.options, ...options}}), () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.options);
            }
        });
    }
}