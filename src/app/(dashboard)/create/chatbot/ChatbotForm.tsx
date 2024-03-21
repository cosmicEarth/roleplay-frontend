"use client";

import { ReactElement, useState } from "react";
import { useFormState } from "react-dom";
import { createCharacterAction } from "@/lib/characterInfoAction";
import { TInputOption } from "@/components/atoms/Input/InputType";
import InputText from "@/components/atoms/Input/InputText";
import InputTextArea from "@/components/atoms/Input/InputTextArea";
import InputFile from "@/components/atoms/Input/InputFile";
import InputToggle from "@/components/atoms/Input/InputToggle";
import InputSelect from "@/components/atoms/Input/InputSelect";
import InputRadio from "@/components/atoms/Input/InputRadio";
import Button from "@/components/atoms/Button";
import {
    CHATBOT_AVAILABILITY_OPTIONS,
    CHATBOT_PROMPT_PLACEHOLDER,
} from "@/constants/constants";
import InputTextAreaWithUploadFile from "@/components/atoms/Input/InputTextAreaWithUploadFile";
import FormContainer from "@/components/atoms/Form/FormContainer";

type ChatbotFormProps = {
    models: TInputOption[];
    tags: TInputOption[];
};

export default function ChatbotForm({
    models,
    tags,
}: ChatbotFormProps): ReactElement {
    const [isNSFW, setIsNSFW] = useState<boolean>(false);
    const [visibility, setVisibility] = useState("unlisted");
    const [modelVal, setModelVal] = useState<TInputOption[]>([]);
    const [tagsVal, setTagsVal] = useState<TInputOption[]>([]);

    const [state, formAction] = useFormState<any, any>(createCharacterAction, {
        hasError: false,
        errorMsg: {},
    });

    return (
        <form action={formAction} className="flex flex-1 flex-col gap-10 py-5">
            <FormContainer>
                <p className="text-5 font-bold leading-normal">Basic Info</p>
                <p className="text-sm font-normal leading-normal">
                    Visualize your chatbot description
                </p>
            </FormContainer>

            <div className="flex flex-row gap-10">
                <FormContainer>
                    <InputFile
                        name="image"
                        id="image"
                        label="Add"
                        helperText="Recommend Size: 512px x 512px"
                    />
                </FormContainer>
                <FormContainer fullWidth>
                    <div className="flex flex-1 flex-col gap-7 p-4 rounded-lg ">
                        <InputText
                            name="character_name"
                            id="character_name"
                            label="Name"
                            placeholder="Bulma"
                            required
                            errorMsg={state.errorMsg.character_name}
                        />

                        <InputText
                            id="character_gender"
                            name="character_gender"
                            label="Gender"
                            placeholder="Gender of the character: male, female, N/A, etc."
                            required
                            errorMsg={state.errorMsg.character_gender}
                        />
                        <InputSelect
                            key="model_id"
                            id="model_id"
                            label="Model Name"
                            placeholder="Select Model"
                            name="model_id"
                            options={models}
                            required
                            errorMsg={state.errorMsg.model_id}
                            value={modelVal}
                            onChange={(val) => {
                                setModelVal(val);
                            }}
                        />
                    </div>
                </FormContainer>
            </div>

            <FormContainer>
                <InputTextArea
                    id="short_bio"
                    name="short_bio"
                    label="Short description"
                    helperText="Describe the character. This will be displayed on the character page, but not used by the AI."
                    placeholder="Enter a short description of your character..."
                    required
                    errorMsg={state.errorMsg.short_bio}
                />
            </FormContainer>

            <FormContainer>
                <InputTextArea
                    id="prompt"
                    name="prompt"
                    label="Character prompt"
                    helperText="Provide the exact character description as you want it to be used by the AI to generate responses and messsages."
                    placeholder={CHATBOT_PROMPT_PLACEHOLDER}
                    required
                    errorMsg={state.errorMsg.prompt}
                />
            </FormContainer>
            <FormContainer>
                <InputRadio
                    id="character_visibility"
                    name="character_visibility"
                    label="Visibility"
                    helperText="You can also change the visibility after the character is created."
                    required
                    value={visibility}
                    onChange={(val: string) => {
                        setVisibility(val);
                    }}
                    options={CHATBOT_AVAILABILITY_OPTIONS}
                    errorMsg={state.errorMsg.prompt_visibility}
                />
            </FormContainer>
            <FormContainer>
                <InputSelect
                    key="tags"
                    name="tags"
                    id="tags"
                    label="Tags"
                    placeholder="Search Tags"
                    helperText={`Select up to 5 relevant tags or keywords.`}
                    options={tags}
                    multiple
                    required
                    errorMsg={state.errorMsg.tags}
                    value={tagsVal}
                    onChange={(val) => {
                        setTagsVal(val);
                    }}
                />
            </FormContainer>

            <FormContainer>
                <p className="text-5 font-bold leading-normal">
                    Advanced info (optional)
                </p>
                <p className="text-sm font-normal leading-normal">
                    Additional information of your chatbot to make it more real.
                </p>
            </FormContainer>

            <FormContainer>
                <InputTextArea
                    id="initial_message"
                    name="initial_message"
                    label="Initial message"
                    helperText="This is the first message that the character will say for the conversation. If this is empty, we will use the name and the description to generate the initial message when creating the character."
                    placeholder="Enter a short description of your character..."
                />
            </FormContainer>

            <FormContainer>
                <InputToggle
                    value={isNSFW}
                    onChange={(e) => {
                        setIsNSFW((prev) => !prev);
                    }}
                    key={"NSFW"}
                    id="NSFW"
                    name="NSFW"
                    label="Nsfw (Not safe for work)"
                    helperText="If this character is not safe for work, turn this on."
                />
            </FormContainer>

            <FormContainer>
                <InputTextAreaWithUploadFile
                    id="character_story"
                    label="Character Story"
                    name="character_story"
                    rows={8}
                    errorMsg={state.errorMsg.character_story}
                />
            </FormContainer>

            {state.hasError && (
                <p className="text-red-500 mt-4">Please check the input</p>
            )}
            <div className="mt-8">
                <Button
                    type="submit"
                    color="primary"
                    size="fullWidth"
                    variant="fill"
                    className="min-h-12 max-h-12 flex flex-row justify-center items-center"
                >
                    Create Character
                </Button>
            </div>
        </form>
    );
}
