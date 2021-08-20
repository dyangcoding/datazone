import React from "react";
import Dropdown from "../components/dropdown";
import Tooltip from "../components/tooltip-wrapper";
import { RuleOptionsProperties } from "../models/ruleOptions";
import { languageEntries } from "../utils/languageUtils";
import * as DESC from "../utils/stringUtils"

interface OptionsFormProps {
    readonly options?: RuleOptionsProperties;
    readonly onChange?: (value: RuleOptionsProperties) => void;
}

interface OptionsFormState {
    readonly options: RuleOptionsProperties;
}

export class OptionsSearchForm extends React.PureComponent<OptionsFormProps, OptionsFormState> {
    constructor(props: OptionsFormProps) {
        super(props);

        this.state = {
            options: props.options || {language: "English", sample: 30} as RuleOptionsProperties
        };

        this.onIsRetweetChange = this.onIsRetweetChange.bind(this);
        this.onIsVerifiedChange = this.onIsVerifiedChange.bind(this);
        this.onIsReplyChange = this.onIsReplyChange.bind(this);
        this.onHasHashtagsChange = this.onHasHashtagsChange.bind(this);
        this.onHasLinksChange = this.onHasLinksChange.bind(this);
        this.onHasMediaChange = this.onHasMediaChange.bind(this);
        this.onHasImagesChange = this.onHasImagesChange.bind(this);
        this.onHasVideosChange = this.onHasVideosChange.bind(this);
        this.onLangChange = this.onLangChange.bind(this);
        this.onSampleChange = this.onSampleChange.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    public render(): React.ReactNode {
        const options = this.state.options;
        return (
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <fieldset>
                        <legend className="text-base font-medium text-gray-900">By Tweet Type</legend>
                        <div className="flex mt-4 text-sm">
                            <div className="flex items-start h-5">
                                <input checked={options.isRetweet} id="is-retweet" name="is-retweet" type="checkbox" onChange={this.onIsRetweetChange}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="ml-3">
                                <label htmlFor="is-retweet" className="font-medium text-gray-700">
                                    Is Retweet
                                </label>
                                <p className="text-gray-500">Matches on Retweets that match the rest of the specified rule.</p>
                            </div>
                            <div className="flex items-start h-5">
                                <input checked={options.isVerified} id="is-verified" name="is-verified" type="checkbox" onChange={this.onIsVerifiedChange}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="ml-3">
                                <label htmlFor="is-verified" className="font-medium text-gray-700">
                                    Is Verified
                                </label>
                                <p className="text-gray-500">Deliver only Tweets whose authors are verified by Twitter.</p>
                            </div>
                            <div className="flex items-start h-5">
                                <input checked={options.isReply} id="is-reply" name="is-reply" type="checkbox" onChange={this.onIsReplyChange}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="ml-3">
                                <label htmlFor="is-reply" className="font-medium text-gray-700">
                                    Is Reply
                                </label>
                                <p className="text-gray-500">Deliver only explicit replies that match a rule.</p>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend className="text-base font-medium text-gray-900">By Tweet Content</legend>
                        <div className="flex mt-4 text-sm">
                            <div className="flex items-start h-5">
                                <input checked={options.hasHashtags} id="has-hashtags" name="has-hashtags" type="checkbox" onChange={this.onHasHashtagsChange}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="ml-3">
                                <label htmlFor="has-hashtags" className="font-medium text-gray-700">
                                    Has Hashtags
                                </label>
                                <p className="text-gray-500">Matches Tweets that contain at least one hashtag.</p>
                            </div>
                            <div className="flex items-start h-5">
                                <input checked={options.hasImages} id="has-images" name="has-images" type="checkbox" onChange={this.onHasImagesChange}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="ml-3">
                                <label htmlFor="has-images" className="font-medium text-gray-700">
                                    Has Images
                                </label>
                                <p className="text-gray-500">Matches Tweets that contain a recognized URL to an image.</p>
                            </div>
                            <div className="flex items-start h-5">
                                <input checked={options.hasLinks} id="has-links" name="has-links" type="checkbox" onChange={this.onHasLinksChange}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="ml-3">
                                <label htmlFor="has-links" className="font-medium text-gray-700">
                                    has Links
                                </label>
                                <p className="text-gray-500">matches Tweets which contain links and media in the Tweet body.</p>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="flex space-x-4">
                            <div className="flex items-start h-5">
                                <input checked={options.hasMedia} id="has-media" name="has-media" type="checkbox" onChange={this.onHasMediaChange}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="text-sm">
                                <label htmlFor="has-media" className="font-medium text-gray-700">
                                    Has Media
                                </label>
                                <p className="text-gray-500">Matches Tweets that contain a media object, such as a photo, GIF, or video, as determined by Twitter.</p>
                            </div>
                            <div className="flex items-start h-5">
                                <input checked={options.hasVideos} id="has-videos" name="has-videos" type="checkbox" onChange={this.onHasVideosChange}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="text-sm">
                                <label htmlFor="has-videos" className="font-medium text-gray-700">
                                    Has Videos
                                </label>
                                <p className="text-gray-500">Matches Tweets that contain native Twitter videos, uploaded directly to Twitter.</p>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend className="text-base font-medium text-gray-900">By Tweet Content</legend>
                        <div className="flex mt-4">
                            <div className="flex flex-auto justify-between">
                                <Dropdown id="language" name="language" items={languageEntries.map(entry => entry.language)} 
                                    onChange={this.onLangChange} value={options.language} />
                                <Tooltip id="language" title="Language" description={DESC.LanguageDesc} />
                            </div>
                            <div className="flex flex-auto justify-between">
                                <Dropdown id="sample" name="sample" items={["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]} 
                                    onChange={this.onSampleChange} value={options.sample?.toLocaleString()} />
                                <Tooltip id="sample" title="sample" description={DESC.SampleDesc} />
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }

    private onIsRetweetChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({isRetweet: event.target.checked ? event.target.checked : undefined});
    }

    private onIsVerifiedChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({isVerified: event.target.checked ? event.target.checked : undefined});
    }

    private onIsReplyChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({isReply: event.target.checked ? event.target.checked : undefined});
    }

    private onHasHashtagsChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({hasHashtags: event.target.checked ? event.target.checked : undefined});
    }

    private onHasLinksChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({hasLinks: event.target.checked ? event.target.checked : undefined});
    }

    private onHasMediaChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({hasMedia: event.target.checked ? event.target.checked : undefined});
    }

    private onHasImagesChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({hasImages: event.target.checked ? event.target.checked : undefined});
    }

    private onHasVideosChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({hasVideos: event.target.checked ? event.target.checked : undefined});
    }

    private onLangChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        this.handleChange({language: event.target.value});
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