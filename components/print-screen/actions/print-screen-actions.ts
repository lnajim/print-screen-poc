"use server";

import puppeteer from "puppeteer";
import { z } from "zod";

const urlSchema = z.string().url();

export async function takeScreenshot(url: string) {
  try {
    // Validate URL
    const validatedUrl = urlSchema.parse(url);

    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
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
      screenshot: screenshot,
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
