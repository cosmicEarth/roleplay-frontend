import { ReactElement } from "react";
import DashboardLayout from "@/app/(dashboard)/layout";
import NewCharacterForm from "./form";
import AskToLogin from "@/components/organism/AskToLogin/AskToLogin";
import { getAuthSession } from "@/lib/authSession";
import { getModelInfoListAction } from "@/lib/modelInfoAction";
import { TInputOption } from "@/components/atoms/Input/InputType";
import { getTagInfoListAction } from "@/lib/tagAction";

interface NewCharacterProps {}

async function NewCharacter(props: NewCharacterProps) {
    const session = await getAuthSession();
    if (!session?.access) {
        return (
            <AskToLogin
                title="Sign in to create new AI characters"
                subtitle="Once you sign in, you can create new AI characters to talk to and interact."
            />
        );
    }

    const modelData = await getModelInfoListAction();

    if (modelData.hasError) {
        return (
            <>
                <h1>{modelData.errorMsg[0]}</h1>
                {modelData.errorMsg?.slice(1).map((val) => {
                    return <p key={val}>{val}</p>;
                })}
            </>
        );
    }

    const models = modelData.models!;

    const formattedModel: TInputOption[] = models.map((item) => {
        return { label: item.model_name, value: String(item.id) };
    });

    const tagData = await getTagInfoListAction();

    if (tagData.hasError) {
        return (
            <>
                <h1>{tagData.errorMsg[0]}</h1>
                {tagData.errorMsg?.slice(1).map((val: string) => {
                    return <p key={val}>{val}</p>;
                })}
            </>
        );
    }

    const tags = tagData.tags!;

    const formattedTag: TInputOption[] = tags.map((item) => {
        return { label: item.tag_name, value: String(item.id) };
    });

    return (
        <>
            <header className="sticky top-0 flex flex-col flex-1 bg-neutral-50 py-2 items-center z-10">
                <div className="max-w-screen-md w-full ">
                    <h4>New Character</h4>
                    <h5 className="font-normal">Draft</h5>
                </div>
            </header>
            <main className="flex flex-1 max-w-full flex-col items-center">
                <NewCharacterForm models={formattedModel} tags={formattedTag} />
            </main>
        </>
    );
}

NewCharacter.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default NewCharacter;
