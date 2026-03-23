import { useCallback, useRef, useState } from "react";

type Props = {
  value: string;                 // base64 data URL
  onChange: (dataUrl: string) => void;
};

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export default function PhotoDropzone({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    // Optional: limit size (e.g., 3MB)
    if (file.size > 3 * 1024 * 1024) {
      alert("Image is too large. Please use an image under 3MB.");
      return;
    }

    const dataUrl = await fileToDataUrl(file);
    onChange(dataUrl);
  }, [onChange]);

  return (
    <div>
      <div
        className={`dropzone ${dragOver ? "dropzoneOver" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        {value ? (
          <img className="dropPreview" src={value} alt="Profile preview" />
        ) : (
          <div className="dropText">
            <strong>Drop a profile photo</strong>
            <div>or click to upload</div>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}