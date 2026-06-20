import { useState, useCallback, useEffect, useRef } from "react";
import ImageWorker from "../../core/workers/image.worker?worker";

interface UseImageProcessorResult {
  processImage: (file: File) => Promise<string>;
  isProcessing: boolean;
  error: string | null;
}

export const useImageProcessor = (): UseImageProcessorResult => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new ImageWorker();

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  const processImage = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        setError("Worker not initialized");
        reject(new Error("Worker not initialized"));
        return;
      }

      setIsProcessing(true);
      setError(null);

      const handleMessage = (e: MessageEvent) => {
        const { success, data, error: workerError } = e.data;

        if (success) {
          setIsProcessing(false);
          resolve(data);
        } else {
          setIsProcessing(false);
          setError(workerError || "Unknown worker error");
          reject(new Error(workerError || "Unknown worker error"));
        }

        // Remove listener to avoid memory leaks or duplicate handling?
        // Actually, the worker instance is reused, so we need to be careful with listeners.
        // A simple approach is one-off worker for each task or unique ID tracking.
        // Since we process one image at a time usually, removing listener is fine.
        workerRef.current?.removeEventListener("message", handleMessage);
      };

      workerRef.current.addEventListener("message", handleMessage);
      workerRef.current.postMessage(file);
    });
  }, []);

  return { processImage, isProcessing, error };
};
