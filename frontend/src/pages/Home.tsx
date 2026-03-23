import TemplateCard from "../components/TemplateCard";
import {
  FileText,
  Layout,
  Briefcase,
  GraduationCap,
  BookOpen,
  Receipt,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-10 md:px-8">
        {/* Top */}
        <header className="mb-16">
          <div className="text-sm font-medium tracking-tight text-slate-500">
            AI Document Studio
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Create print-ready documents
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
            Describe what you need and get a clean, polished document without
            formatting it yourself.
          </p>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <textarea
              rows={4}
              placeholder="Create a modern one-page CV for a software engineer with React and Django experience."
              className="w-full resize-none rounded-2xl border-0 bg-transparent px-4 py-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />

            <div className="flex items-center justify-end border-t border-slate-100 px-2 pt-3">
              <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                Generate
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Templates */}
        <section className="mt-20">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Popular documents
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <TemplateCard
              to="/build/flyer"
              title="CV / Resume"
              description="Clean professional resume."
              icon={<FileText size={22} />}
              state={{ docType: "cv", docTitle: "CV / Resume" }}
            />

            <TemplateCard
              to="/build/flyer"
              title="Invoice"
              description="Simple printable invoice."
              icon={<Receipt size={22} />}
              state={{ docType: "invoice", docTitle: "Invoice" }}
            />

            <TemplateCard
              to="/build/flyer"
              title="Business Proposal"
              description="Structured proposal layout."
              icon={<Briefcase size={22} />}
              state={{ docType: "business_proposal", docTitle: "Business Proposal" }}
            />

            <TemplateCard
              to="/build/flyer"
              title="Lesson Plan"
              description="Clear classroom-ready lesson plan."
              icon={<GraduationCap size={22} />}
              state={{ docType: "lesson_plan", docTitle: "Lesson Plan" }}
            />

            <TemplateCard
              to="/build/flyer"
              title="Worksheet"
              description="Printable student worksheet."
              icon={<BookOpen size={22} />}
              state={{ docType: "worksheet", docTitle: "Worksheet Generator" }}
            />

            <TemplateCard
              to="/build/flyer"
              title="Portfolio"
              description="Minimal presentation layout."
              icon={<Layout size={22} />}
              state={{ docType: "portfolio", docTitle: "Portfolio" }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}