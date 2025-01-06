"use server";

import puppeteer from "puppeteer";
import { z } from "zod";

const urlSchema = z.string().url();

export async function takeScreenshot(url: string) {
  let browser = null;

  try {
    // Validate URL
    const validatedUrl = urlSchema.parse(url);

    // Launch browser with specific configuration for server environment
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-extensions",
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    });

    // Create new page with longer default timeout
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000); // 60 seconds

    // Set viewport size
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    // Navigate to URL and wait for network to be idle
    const response = await page.goto(validatedUrl, {
      waitUntil: ["load", "domcontentloaded", "networkidle0"],
      timeout: 60000,
    });

    if (!response || !response.ok()) {
      throw new Error(
        `Failed to load URL: ${response ? response.status() : "unknown error"}`
      );
    }

    // Add a small delay to ensure dynamic content is loaded
    await page.waitForTimeout(2000);

    // Take screenshot
    const screenshot = await page.screenshot({
      type: "png",
      fullPage: true,
      encoding: "base64",
    });

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
  } finally {
    // Ensure browser is always closed, even if there's an error
    if (browser) {
      await browser.close().catch(console.error);
    }
  }
}
