"use server";

import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { z } from "zod";

const urlSchema = z.string().url();

export async function takeScreenshot(url: string) {
  try {
    // Validate URL
    const validatedUrl = urlSchema.parse(url);

    // Configure Chrome for serverless environment
    const executablePath = await chromium.executablePath();

    // Launch browser with serverless configuration
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });

    // Create new page
    const page = await browser.newPage();

    // Set viewport size
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    // Navigate to URL
    await page.goto(validatedUrl, {
      waitUntil: "networkidle0",
    });

    // Take screenshot
    const screenshot = await page.screenshot({
      type: "png",
      fullPage: true,
      encoding: "base64",
    });

    // Close browser
    await browser.close();

    return {
      success: true,
      screenshot,
      error: null,
    };
  } catch (error) {
    console.error("Screenshot error:", error);
    return {
      success: false,
      screenshot: null,
      error:
        error instanceof Error ? error.message : "Failed to take screenshot",
    };
  }
}
