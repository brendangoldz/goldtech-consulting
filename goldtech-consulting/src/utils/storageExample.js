/**
 * Amplify Storage Usage Examples
 * 
 * This file demonstrates how to use Amplify Storage with your S3 bucket
 * and Lambda function for image optimization.
 */

import { useStorage, getS3Url, getOptimizedImageUrl } from '../hooks/useStorage';

/**
 * Example 1: Using the useStorage hook in a component
 */
export const ExampleComponent = () => {
  const {
    getFileUrl,
    uploadFile,
    deleteFile,
    listFiles,
    getOptimizedImageUrl,
    loading,
    error,
  } = useStorage('public');

  // Get a file URL
  const handleGetUrl = async () => {
    try {
      const url = await getFileUrl('projects/project1.png');
      console.log('File URL:', url);
    } catch (err) {
      console.error('Error getting URL:', err);
    }
  };

  // Upload a file
  const handleUpload = async (file) => {
    try {
      const result = await uploadFile(
        `projects/${file.name}`,
        file,
        {
          contentType: file.type,
          cacheControl: 'public, max-age=31536000',
        }
      );
      console.log('Upload successful:', result);
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  // List files in a directory
  const handleListFiles = async () => {
    try {
      const files = await listFiles('projects/');
      console.log('Files:', files);
    } catch (err) {
      console.error('List error:', err);
    }
  };

  // Delete a file
  const handleDelete = async (key) => {
    try {
      await deleteFile(key);
      console.log('File deleted');
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {/* Your component UI */}
    </div>
  );
};

/**
 * Example 2: Direct utility functions (no hook needed)
 */

// Get a direct S3 URL
const directS3Url = getS3Url('projects/project1.png');
// Returns: https://goldtech-consulting-images.s3.us-east-2.amazonaws.com/projects/project1.png

// Get optimized image URL via Lambda (if configured)
const optimizedUrl = getOptimizedImageUrl('projects/project1.png', {
  width: 800,
  height: 600,
  format: 'webp',
});
// Returns: https://your-lambda-url.com?key=projects/project1.png&w=800&h=600&f=webp

/**
 * Example 3: Using in an img tag
 */
export const ImageExample = () => {
  const imageKey = 'projects/project1.png';
  const imageUrl = getS3Url(imageKey);
  
  // Or with optimization
  const optimizedImageUrl = getOptimizedImageUrl(imageKey, {
    width: 800,
    format: 'webp',
  });

  return (
    <img
      src={optimizedImageUrl}
      alt="Project 1"
      loading="lazy"
    />
  );
};

/**
 * Example 4: File upload form
 */
export const UploadForm = () => {
  const { uploadFile, loading, error } = useStorage('public');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.file.files[0];
    
    if (!file) return;

    try {
      await uploadFile(`uploads/${file.name}`, file, {
        contentType: file.type,
      });
      alert('File uploaded successfully!');
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" />
      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default {
  ExampleComponent,
  ImageExample,
  UploadForm,
};
