import { createDeepSeek } from "@ai-sdk/deepseek";
import { gateway } from "@ai-sdk/gateway";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        "chat-model": createDeepSeek({
          apiKey: process.env.DEEPSEEK_API_KEY,
        })("deepseek-chat"),
        "chat-model-reasoning": wrapLanguageModel({
          model: createDeepSeek({
            apiKey: process.env.DEEPSEEK_API_KEY,
          })("deepseek-reasoner"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": createDeepSeek({
          apiKey: process.env.DEEPSEEK_API_KEY,
        })("deepseek-chat"),
        "artifact-model": createDeepSeek({
          apiKey: process.env.DEEPSEEK_API_KEY,
        })("deepseek-chat"),
      },
    });
