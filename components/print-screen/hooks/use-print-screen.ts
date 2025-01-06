import { usePrintScreenStore } from "../store/use-print-screen-store";
import { takeScreenshot } from "../actions/print-screen-actions";

export const usePrintScreen = () => {
  const {
    isLoading,
    progress,
    setError,
    setLoading,
    setProgress,
    setScreenshot,
  } = usePrintScreenStore();

  const handleScreenshot = async (url: string) => {
    try {
      setLoading(true);
      setError("");
      setProgress(0);

      // Start with initial progress
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 1;
        if (currentProgress <= 99) {
          setProgress(currentProgress);
        }
      }, 100);

      const result = await takeScreenshot(url);

      clearInterval(progressInterval);

      if (!result.success || !result.screenshot) {
        throw new Error(result.error || "Failed to take screenshot");
      }

      setProgress(100);
      setScreenshot(result.screenshot);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    progress,
    handleScreenshot,
  };
};
