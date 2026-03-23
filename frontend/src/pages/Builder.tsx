import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PreviewFrame from "../components/PreviewFrame";
import PhotoDropzone from "../components/PhotoDropzone";
import { generateDocument } from "../api/client";

type DocState = {
  docType?: string;   // e.g. "lesson_plan", "invoice", "cv"
  docTitle?: string;  // e.g. "Lesson Plan"
};

function injectPhoto(html: string, photo: string) {
  if (!html || !photo) return html;

  if (html.includes('id="profilePhoto"')) {
    return html.replace(
      /<img([^>]*id="profilePhoto"[^>]*)src="[^"]*"([^>]*)>/i,
      `<img$1src="${photo}"$2>`
    );
  }

  if (html.includes("function setPhoto")) {
    return html.replace(
      /<\/body>/i,
      `<script>try{ setPhoto(${JSON.stringify(photo)}); }catch(e){}</script></body>`
    );
  }

  return html;
}

export default function Builder() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: DocState | null };

  // fallback if user refreshes page (state is lost)
  const docTitle = state?.docTitle || "Document";
  const docType = state?.docType || "flyer";

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [userInfo, setUserInfo] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string>("");

  const [photoDataUrl, setPhotoDataUrl] = useState("");

  async function onGenerate() {
    setErr("");
    setLoading(true);
    try {
      const res = await generateDocument({
        // keep your backend compatible:
        template: "flyer",        // single engine
        documentType: docType,    // NEW: tell backend what user selected
        userInfo,
        style: "clean",
      });

      const finalHtml = injectPhoto(res.html, photoDataUrl);
      setHtml(finalHtml);
    } catch (e: any) {
      setErr(e?.message || "Failed to generate.");
    } finally {
      setLoading(false);
    }
  }


  async function onPrint() {
  const w = window.open("", "_blank", "noopener,noreferrer");
  if (!w) {
    alert("Popup blocked. Allow popups to print.");
    return;
  }

  const finalHtml = injectPhoto(html, photoDataUrl);
  w.document.open();
  w.document.write(finalHtml || "<!doctype html><html><body></body></html>");
  w.document.close();

  await new Promise((r) => setTimeout(r, 150));

  const imgs = Array.from(w.document.images || []);
  await Promise.all(
    imgs.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    })
  );

  w.focus();
  w.print();
  w.onafterprint = () => w.close();
}

  function onDownloadHtml() {
    if (!html) return;

    const finalHtml = injectPhoto(html, photoDataUrl);

    const blob = new Blob([finalHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${docType}.html`;
    a.click();

    URL.revokeObjectURL(url);
  }

  const placeholder = useMemo(() => {
    // tailor the hint based on selected docType
    switch (docType) {
      case "cv":
        return "Name, contact, summary, experience, education, skills, languages...";
      case "lesson_plan":
        return "Grade, subject, topic, objectives, activities, timing, materials, assessment...";
      case "invoice":
        return "Company name, client, items, prices, totals, payment terms...";
      default:
        return "Describe what you want included (title, sections, bullet points, contact info, etc.)...";
    }
  }, [docType]);

  return (
    <div className="builder">
      <aside className="panel">
        <div className="panelTop">
          <button className="linkBtn" onClick={() => navigate("/")}>
            ← Home
          </button>
          <div className="panelTitle">{docTitle}</div>
        </div>

        <div className="field">
          <label>Profile Photo (optional)</label>
          <PhotoDropzone value={photoDataUrl} onChange={setPhotoDataUrl} />
        </div>

        <div className="field">
          <label>Paste your information</label>
          <textarea
            value={userInfo}
            onChange={(e) => setUserInfo(e.target.value)}
            placeholder={placeholder}
          />
        </div>

        {err && <div className="error">{err}</div>}

        <div className="actions">
          <button
            className="btnPrimary"
            onClick={onGenerate}
            disabled={loading || userInfo.trim().length < 10}
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          <button className="btn" onClick={onPrint} disabled={!html}>
            Print / Save PDF
          </button>

          <button className="btn" onClick={onDownloadHtml} disabled={!html}>
            Download HTML
          </button>
        </div>
      </aside>

      <main className="preview">
     <PreviewFrame ref={iframeRef} html={html} />
        
      </main>
    </div>
  );
}