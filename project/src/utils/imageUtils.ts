/**
 * Converts an image File to a WebP File using the browser's Canvas API.
 * 
 * @param file The original image file
 * @param quality The quality of the WebP image (0 to 1)
 * @returns A Promise resolving to the compressed WebP File
 */
export const convertToWebP = (file: File, quality = 0.8): Promise<File> => {
    return new Promise((resolve, reject) => {
        // If it's already a webp, we might still want to compress it,
        // but typically we can just convert all images to webp.

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Create an off-screen canvas
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    return reject(new Error('Canvas context not available'));
                }

                // Draw image onto canvas
                ctx.drawImage(img, 0, 0);

                // Convert to WebP blob
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            return reject(new Error('Failed to convert image to WebP'));
                        }

                        // Generate new filename with .webp extension
                        const originalName = file.name;
                        const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
                        const newFileName = `${nameWithoutExt}.webp`;

                        // Create a new File object from the blob
                        const webpFile = new File([blob], newFileName, {
                            type: 'image/webp',
                            lastModified: Date.now(),
                        });

                        resolve(webpFile);
                    },
                    'image/webp',
                    quality
                );
            };

            img.onerror = () => reject(new Error('Failed to load image for conversion'));
            img.src = e.target?.result as string;
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
};
