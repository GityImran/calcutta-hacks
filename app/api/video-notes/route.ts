// app/api/video-notes/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs, { createWriteStream } from "fs";
import path from "path";
import os from "os";
import { pipeline } from "stream/promises";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json() as { url: string };

    // Validate input
    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Valid URL is required" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    console.log(`Processing video: ${url}`);

    // 1. Get transcript
    const transcript = await getTranscriptFromUrl(url);

    if (!transcript || transcript.trim().length < 50) {
      return NextResponse.json(
        { error: "Could not retrieve sufficient transcript from video" },
        { status: 400 }
      );
    }

    console.log(`Transcript retrieved: ${transcript.length} characters`);

    // 2. Summarise + create notes with GPT
    const completion = await openai.chat.completions.create({
      model: "gpt-4-mini",
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "video_notes",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              summary: { type: "string" },
              key_points: {
                type: "array",
                items: { type: "string" }
              },
              timeline: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    time: { type: "string" },
                    note: { type: "string" }
                  },
                  required: ["time", "note"],
                  additionalProperties: false
                }
              }
            },
            required: ["summary", "key_points"],
            additionalProperties: false
          }
        }
      },
      messages: [
        {
          role: "system",
          content:
            "You are an expert assistant that transforms video transcripts into well-structured, actionable notes. Create clear, concise summaries and extract key points that are easy to understand and apply."
        },
        {
          role: "user",
          content: `
Transcript of the video:

${transcript}

TASK:
1. Give a concise summary (5–10 sentences) capturing the main ideas.
2. Extract 10–20 key bullet-point notes (actionable, clear, no repetition).
3. If timestamps appear in the text (like [00:32] or 5:10), build a timeline array with time and corresponding note.

Return valid JSON matching the given schema.
          `
        }
      ]
    });

    const resultJson = completion.choices[0].message.content;
    if (!resultJson) {
      throw new Error("No response from GPT");
    }

    const data = JSON.parse(resultJson);

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error("Error processing video notes:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to process video" },
      { status: err?.status || 500 }
    );
  }
}

// ---- Helpers ----

// 1) Main dispatcher - use Whisper for all videos
async function getTranscriptFromUrl(url: string): Promise<string> {
  return await transcribeVideo(url);
}

// 2) Transcribe video using Whisper API
async function transcribeVideo(url: string): Promise<string> {
  let audioFilePath: string | null = null;

  try {
    // Download audio from video URL
    audioFilePath = await downloadAudio(url);

    // Create a readable stream from the audio file
    const audioStream = fs.createReadStream(audioFilePath);

    // Send to OpenAI Whisper API
    const transcription = await openai.audio.transcriptions.create({
      file: audioStream as any,
      model: "whisper-1"
    });

    return transcription.text;
  } catch (error: any) {
    throw new Error(`Failed to transcribe video: ${error.message}`);
  } finally {
    // Clean up temporary audio file
    if (audioFilePath && fs.existsSync(audioFilePath)) {
      fs.unlinkSync(audioFilePath);
    }
  }
}

// 3) Download audio from URL
async function downloadAudio(url: string): Promise<string> {
  const tempDir = os.tmpdir();
  const audioFilePath = path.join(tempDir, `audio-${Date.now()}.mp3`);

  try {
    console.log(`Downloading audio from: ${url}`);

    // Fetch the audio file
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error("No response body");
    }

    const fileStream = createWriteStream(audioFilePath);
    
    // Use the response body as a Node.js stream
    await pipeline(response.body as any, fileStream);

    console.log(`Audio downloaded to: ${audioFilePath}`);
    return audioFilePath;
  } catch (error: any) {
    // Clean up on error
    if (fs.existsSync(audioFilePath)) {
      fs.unlinkSync(audioFilePath);
    }
    console.error(`Download error for ${url}:`, error);
    throw new Error(`Failed to download audio: ${error.message}`);
  }
}
