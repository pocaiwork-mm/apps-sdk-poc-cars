"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useWidgetProps,
  useMaxHeight,
  useDisplayMode,
  useRequestDisplayMode,
  useIsChatGptApp,
  useOpenExternal,
} from "./hooks";

export default function Home() {
  const toolOutput = useWidgetProps<{
    name?: string;
    result?: { structuredContent?: { name?: string } };
  }>();
  const maxHeight = useMaxHeight() ?? undefined;
  const displayMode = useDisplayMode();
  const requestDisplayMode = useRequestDisplayMode();
  const isChatGptApp = useIsChatGptApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const nameFromTool = toolOutput?.result?.structuredContent?.name || toolOutput?.name;
  const isFetchingTool = typeof toolOutput === "undefined";
  const hasToolName = Boolean(nameFromTool);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("MNOJ Inquiry from website");
    const body = encodeURIComponent(`Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`);
    // open user's email client with prefilled subject and body
    const mailto = `mailto:pocaiwork@gmail.com?subject=${subject}&body=${body}`;
    if (typeof window !== "undefined" && window?.openai?.openExternal) {
      try {
        window.openai.openExternal({ href: mailto });
        return;
      } catch (err) {
        // fallthrough to web fallback
        console.warn("openExternal failed, falling back to window.location", err);
      }
    }

    window.location.href = mailto;
  }

  return (
    <div
      className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20"
      style={{
        maxHeight,
        height: displayMode === "fullscreen" ? maxHeight : undefined,
      }}
    >
      {displayMode !== "fullscreen" && (
        <button
          aria-label="Enter fullscreen"
          className="fixed top-4 right-4 z-50 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-lg ring-1 ring-slate-900/10 dark:ring-white/10 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          onClick={() => requestDisplayMode("fullscreen")}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </button>
      )}

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {!isChatGptApp && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3 w-full">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
                  This app relies on data from a ChatGPT session.
                </p>
                <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
                  No{" "}
                  <a
                    href="https://developers.openai.com/apps-sdk/reference"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline font-mono bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded"
                  >
                    window.openai
                  </a>{" "}
                  property detected
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">
              {hasToolName ? `Hi ${nameFromTool}, welcome MNOJ Motors` : "Welcome to MNOJ Motors"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
            Building reliable, affordable vehicles — a POC brand for demos and
            testing.
          </p>
          </div>

          <div className="flex items-center gap-3">
            {isFetchingTool ? (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="h-3 w-3 rounded-full bg-blue-500 animate-pulse block" />
                <span>Fetching session…</span>
              </div>
            ) : hasToolName ? (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-800 text-sm">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                <span>Connected</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">No session</span>
              </div>
            )}
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-3">About MNOJ</h2>
            <p className="text-gray-700 dark:text-gray-300">
              MNOJ is a proof-of-concept vehicle brand used for demonstrating
              the apps SDK and MCP tooling. This sample company showcases a
              small catalog of cars and tools to recommend vehicles based on
              user preferences.
            </p>

            <div className="mt-6">
              <h3 className="font-medium">Headquarters</h3>
              <address className="not-italic text-gray-700 dark:text-gray-300">
                123 Demo Lane
                <br />
                Sample City, SC 01234
              </address>

              <p className="mt-3">
                <strong>Phone:</strong> <a href="tel:+1234567890" className="underline">+1 (234) 567-890</a>
                <br />
                <strong>Email:</strong> <a href="mailto:pocaiwork@gmail.com" className="underline">pocaiwork@gmail.com</a>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border px-3 py-2 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border px-3 py-2 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded border px-3 py-2 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700"
                  rows={5}
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </section>

        <footer className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} MNOJ Motors. All rights reserved.
        </footer>
      </div>
    </main>
  </div>
  );
}
