import React from "react";
import { RuleOptionsProperties } from "./ruleOptions";

interface OptionsFormProps {
    readonly onChange?: (value: RuleOptionsProperties) => void;
}

interface OptionsFormState {

}

export class OptionsSearchForm extends React.PureComponent<OptionsFormProps, OptionsFormState> {
    constructor(props: OptionsFormProps) {
        super(props)

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
    }

    public render(): React.ReactNode {
        return (
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <fieldset>
                        <legend className="text-base font-medium text-gray-900">By Tweet Type</legend>
                        <div className="flex mt-4">
                            <div className="flex items-start h-5">
                                <input id="is-retweet" name="is-retweet" type="checkbox"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="is-retweet" className="font-medium text-gray-700">
                                    Is Retweet
                                </label>
                                <p className="text-gray-500">Matches on Retweets that match the rest of the specified rule.</p>
                            </div>
                            <div className="flex items-start h-5">
                                <input id="is-verified" name="is-verified" type="checkbox"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="is-verified" className="font-medium text-gray-700">
                                    Is Verified
                                </label>
                                <p className="text-gray-500">Deliver only explicit replies that match a rule.</p>
                            </div>
                            <div className="flex items-start h-5">
                                <input id="is-reply" name="is-reply" type="checkbox"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="is-reply" className="font-medium text-gray-700">
                                    Is Reply
                                </label>
                                <p className="text-gray-500">Deliver only Tweets whose authors are verified by Twitter.</p>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend className="text-base font-medium text-gray-900">By Tweet Content</legend>
                        <div className="flex mt-4">
                            <div className="flex items-start h-5">
                                <input id="has-hashtags" name="has-hashtags" type="checkbox"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="has-hashtags" className="font-medium text-gray-700">
                                    Has Hashtags
                                </label>
                                <p className="text-gray-500">Matches Tweets that contain at least one hashtag.</p>
                            </div>
                            <div className="flex items-start h-5">
                                <input id="has-images" name="has-images" type="checkbox"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="has-images" className="font-medium text-gray-700">
                                    Has Images
                                </label>
                                <p className="text-gray-500">Matches Tweets that contain a recognized URL to an image.</p>
                            </div>
                            <div className="flex items-start h-5">
                                <input id="has-links" name="has-links" type="checkbox"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="has-links" className="font-medium text-gray-700">
                                    has Links
                                </label>
                                <p className="text-gray-500">matches Tweets which contain links and media in the Tweet body.</p>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="flex">
                            <div className="flex items-start h-5">
                                <input id="has-media" name="has-media" type="checkbox"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="has-media" className="font-medium text-gray-700">
                                    Has Media
                                </label>
                                <p className="text-gray-500">Matches Tweets that contain a media object, such as a photo, GIF, or video, as determined by Twitter.</p>
                            </div>
                            <div className="flex items-start h-5">
                                <input id="has-videos" name="has-videos" type="checkbox"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="has-videos" className="font-medium text-gray-700">
                                    Has Videos
                                </label>
                                <p className="text-gray-500">Matches Tweets that contain native Twitter videos, uploaded directly to Twitter.</p>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }

    private onIsRetweetChange(event: React.ChangeEvent<HTMLInputElement>): void {

    }

    private onIsVerifiedChange(event: React.ChangeEvent<HTMLInputElement>): void {
        
    }

    private onIsReplyChange(event: React.ChangeEvent<HTMLInputElement>): void {
        
    }

    private onHasHashtagsChange(event: React.ChangeEvent<HTMLInputElement>): void {
        
    }

    private onHasLinksChange(event: React.ChangeEvent<HTMLInputElement>): void {
        
    }

    private onHasMediaChange(event: React.ChangeEvent<HTMLInputElement>): void {
        
    }

    private onHasImagesChange(event: React.ChangeEvent<HTMLInputElement>): void {
        
    }

    private onHasVideosChange(event: React.ChangeEvent<HTMLInputElement>): void {
        
    }

    private onLangChange(event: React.ChangeEvent<HTMLInputElement>): void {
        
    }

    private onSampleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        
    }

    private handleChange(options: Partial<RuleOptionsProperties>): void {
        
    }
}