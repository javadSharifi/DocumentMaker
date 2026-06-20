import imageCompression from 'browser-image-compression';

self.onmessage = async (e: MessageEvent<File>) => {
  const file = e.data;

  if (!file) {
    self.postMessage({ error: 'No file provided' });
    return;
  }

  try {
    const options = {
      maxSizeMB: 2, // Strict 2MB limit as per requirements
      maxWidthOrHeight: 2048, // Reasonable max dimension for templates
      useWebWorker: true, // Use multi-threading inside the library if possible
      fileType: 'image/jpeg', // Force JPEG for better compression/compatibility
    };

    console.log('Worker: Starting compression...', file.size / 1024 / 1024, 'MB');
    const compressedFile = await imageCompression(file, options);
    console.log('Worker: Compression complete.', compressedFile.size / 1024 / 1024, 'MB');

    // Convert to Base64
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    reader.onloadend = () => {
      const base64data = reader.result;
      self.postMessage({ success: true, data: base64data });
    };
    reader.onerror = () => {
      self.postMessage({ error: 'Failed to read compressed file' });
    };

  } catch (error) {
    console.error('Worker: Compression failed', error);
    self.postMessage({ error: (error as Error).message });
  }
};
