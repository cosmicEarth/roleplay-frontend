"use server";

import {
    TCreateLoraActionState,
    TCreateLoraFormBody,
    TCreateLoraResponse,
    TDeleteLoraActionState,
    TGetLoraInfoResponse,
    TLoraFormPayload,
    TUpdateLoraActionState,
    TUpdateLoraFormBody,
    TgetLoraInfoActionReturn,
} from "@/types/loraInfoAction";
import { fetchRequest } from "./fetchRequest";
import {
    DASHBOARD_BASE_URL,
    MAIN_API_BASE_URL,
} from "@/constants/environtment";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createLoraAction(
    state: TCreateLoraActionState,
    payload: TLoraFormPayload
) {
    let data: undefined | TCreateLoraResponse;
    let isExpiredSession = false;

    try {
        const lora_model_name = payload.get("lora_model_name");
        const lora_short_bio = payload.get("lora_short_bio");
        const base_model_id = payload.get("base_model_id");

        const lora_r = payload.get("lora_r");
        const lora_alpha = payload.get("lora_alpha");
        const lora_dropout = payload.get("lora_dropout");
        const lora_bias = payload.get("lora_bias");

        const dataset = payload.get("dataset");

        const num_train_epochs = payload.get("num_train_epochs");
        const per_device_train_batch_size = payload.get(
            "per_device_train_batch_size"
        );
        const learning_rate = payload.get("learning_rate");
        const warmup_steps = payload.get("warmup_steps");
        const optimizer = payload.get("optimizer");
        const lr_scheduler_type = payload.get("lr_scheduler_type");
        const gradient_accumulation_steps = payload.get(
            "gradient_accumulation_steps"
        );

        const body: TCreateLoraFormBody = {
            lora_model_name,
            lora_short_bio,
            base_model_id,
            lora_r: parseInt(lora_r as string),
            lora_alpha: parseInt(lora_alpha as string),
            lora_dropout: parseInt(lora_dropout as string),
            lora_bias,
            dataset,
            num_train_epochs,
            per_device_train_batch_size,
            learning_rate,
            warmup_steps,
            optimizer,
            lr_scheduler_type,
            gradient_accumulation_steps,
        };

        console.log({ body });

        const res = await fetchRequest<
            TCreateLoraFormBody,
            TCreateLoraResponse
        >({
            method: "post",
            url: `${MAIN_API_BASE_URL}/lora_modal_info/`,
            body,
        });

        if (!res.isError) {
            data = res.responseData;
        }
    } catch (err: any) {
        if ("isError" in err && err.isError) {
            if ("isExpiredSession" in err && err.isExpiredSession) {
                isExpiredSession = true;
            } else {
                console.log({ err });
                return {
                    hasError: true,
                    errorMsg: err.errorData.errors,
                };
            }
        }
    }

    if (isExpiredSession) {
        return redirect(`${DASHBOARD_BASE_URL}/new-character`);
    }

    if (data) {
        return redirect(`${DASHBOARD_BASE_URL}/lora/${data.id}`);
    }
}

export async function updateLoraAction(
    lodaAdaptorId: number,
    state: TUpdateLoraActionState,
    payload: TLoraFormPayload
) {
    let data: undefined | TCreateLoraResponse;
    let isExpiredSession = false;

    try {
        const lora_model_name = payload.get("lora_model_name");
        const lora_short_bio = payload.get("lora_short_bio");
        const base_model_id = payload.get("base_model_id");

        const lora_r = payload.get("lora_r");
        const lora_alpha = payload.get("lora_alpha");
        const lora_dropout = payload.get("lora_dropout");
        const lora_bias = payload.get("lora_bias");

        const dataset = payload.get("dataset");

        const num_train_epochs = payload.get("num_train_epochs");
        const per_device_train_batch_size = payload.get(
            "per_device_train_batch_size"
        );
        const learning_rate = payload.get("learning_rate");
        const warmup_steps = payload.get("warmup_steps");
        const optimizer = payload.get("optimizer");
        const lr_scheduler_type = payload.get("lr_scheduler_type");
        const gradient_accumulation_steps = payload.get(
            "gradient_accumulation_steps"
        );

        const body: TUpdateLoraFormBody = {
            id: lodaAdaptorId,
            lora_model_name,
            lora_short_bio,
            base_model_id,
            lora_r: parseInt(lora_r as string),
            lora_alpha: parseInt(lora_alpha as string),
            lora_dropout: parseInt(lora_dropout as string),
            lora_bias,
            dataset,
            num_train_epochs,
            per_device_train_batch_size,
            learning_rate,
            warmup_steps,
            optimizer,
            lr_scheduler_type,
            gradient_accumulation_steps,
        };

        const res = await fetchRequest<
            TUpdateLoraFormBody,
            TCreateLoraResponse
        >({
            method: "put",
            url: `${MAIN_API_BASE_URL}/lora_modal_info/`,
            body,
        });

        if (!res.isError) {
            data = res.responseData;
            revalidatePath("/lora-adaptor");
            revalidatePath("/");
            revalidatePath("/profile");
        }
    } catch (err: any) {
        if ("isError" in err && err.isError) {
            if ("isExpiredSession" in err && err.isExpiredSession) {
                isExpiredSession = true;
            } else {
                console.log({ err });
                return {
                    hasError: true,
                    errorMsg: err.errorData.errors,
                };
            }
        }
    }

    if (isExpiredSession) {
        return redirect(`${DASHBOARD_BASE_URL}/new-character`);
    }

    if (data) {
        return redirect(`${DASHBOARD_BASE_URL}/lora/${data.id}`);
    }
}

export async function deleteLoraAction(
    loraAdaptorId: number,
    state: TDeleteLoraActionState,
    payload: any
) {
    let data: undefined | { message: string };
    let isExpiredSession = false;

    try {
        const res = await fetchRequest<{ id: number }, { message: string }>({
            method: "delete",
            url: `${MAIN_API_BASE_URL}/lora_modal_info/`,
            body: {
                id: loraAdaptorId,
            },
        });

        if (!res.isError) {
            revalidatePath("/lora-adaptor");
            revalidatePath("/");
            revalidatePath("/profile");
            data = res.responseData;
        }
    } catch (err: any) {
        if ("isError" in err && err.isError) {
            if ("isExpiredSession" in err && err.isExpiredSession) {
                isExpiredSession = true;
            } else {
                return err;
            }
        }
    }

    if (isExpiredSession) {
        return redirect(`${DASHBOARD_BASE_URL}/lora-adaptor`);
    }

    if (data) {
        return redirect(`${DASHBOARD_BASE_URL}/lora-adaptor`);
    }
}

export async function getLoraInfoAction(): Promise<TgetLoraInfoActionReturn> {
    let isExpiredSession = false;

    try {
        const res = await fetchRequest<undefined, TGetLoraInfoResponse>({
            method: "get",
            url: `${MAIN_API_BASE_URL}/lora_modal_info/`,
        });

        if (!res.isError) {
            return res.responseData;
        }
    } catch (err: any) {
        if ("isError" in err && err.isError) {
            if ("isExpiredSession" in err && err.isExpiredSession) {
                isExpiredSession = true;
            } else {
                console.log({ err });
                return {
                    hasError: true,
                    errorMsg: err.errorData.errors,
                };
            }
        }
    }

    if (isExpiredSession) {
        return redirect(`${DASHBOARD_BASE_URL}/lora-adaptor`);
    }
}
