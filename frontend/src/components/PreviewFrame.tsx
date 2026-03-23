import { forwardRef } from "react";

type Props = {
  html: string;
};

const EMPTY_HTML = "<!doctype html><html><head></head><body></body></html>";

const PreviewFrame = forwardRef<HTMLIFrameElement, Props>(({ html }, ref) => {
  if (!html) {
    return (
      <div className="previewEmpty">
        <div className="previewEmptyInner">
          <div className="previewEmptyTitle">Preview</div>
          <div className="previewEmptyText">
            Generate a document to see it here. Then you can Print / Save as PDF.
          </div>
        </div>
      </div>
    );
  }

  return (
    <iframe
      ref={ref}
      title="Preview"
      className="previewFrame"
      sandbox="allow-same-origin allow-scripts allow-modals"
      srcDoc={html || EMPTY_HTML}
    />
  );
});

export default PreviewFrame;