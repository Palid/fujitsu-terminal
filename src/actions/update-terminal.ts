"use server";

function buildUri(line1: string, line2: string) {
  const uri = process.env.TERMINAL_URI ?? "";
  if (!uri) {
    throw new Error("TERMINAL_URI is not set");
  }
  const url = new URL(uri);

  url.searchParams.append("line1", line1);
  url.searchParams.append("line2", line2);
  return url.toString();
}

export async function updateTerminalFromLines(formData: FormData) {
  const line1 = formData.get("line1") ?? "";
  const line2 = formData.get("line2") ?? "";
  if (typeof line1 !== "string" || typeof line2 !== "string") {
    throw new Error("line1 and line2 must be strings");
  }
  const uri = buildUri(line1, line2);
  try {
    await fetch(uri, {
      method: "POST",
    });
    return {
      success: true,
    };
  } catch (err) {
    return JSON.stringify(err);
  }
}

export async function updateTerminalFromCannedResponses(formData: FormData) {
  const cannedResponse = formData.get("cannedResponse") ?? "";
  if (typeof cannedResponse !== "string") {
    throw new Error("cannedResponse must be string");
  }
  const [line1, line2] = cannedResponse.split(",");
  const uri = buildUri(line1, line2);
  try {
    await fetch(uri, {
      method: "POST",
    });
    return {
      success: true,
    };
  } catch (err) {
    return JSON.stringify(err);
  }
}
