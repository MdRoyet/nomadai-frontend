"use client";

import { useState, useRef, useCallback } from "react";
import api from "@/lib/api";
import {
  Upload,
  FileText,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  X,
  Loader2,
  Table,
  ArrowRight,
} from "lucide-react";

interface KPI {
  label: string;
  value: string;
  trend?: string;
}

interface AnalysisResult {
  summary: string;
  trends: string[];
  risks: string[];
  kpis: KPI[];
  recommendations: string[];
  rawData: { headers: string[]; rows: (string | number)[][]; rowCount: number };
}

export default function DataAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (question) formData.append("question", question);

      const { data } = await api.post("/data/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(data);
    } catch (err: any) {
      alert(err.response?.data?.message || "Analysis failed");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setQuestion("");
  };

  const getFileIcon = () => {
    if (!file) return null;
    if (file.name.endsWith(".csv")) return "📊";
    if (file.name.endsWith(".json")) return "📋";
    if (file.name.endsWith(".pdf")) return "📄";
    return "📗";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-2xl mb-4">
          <BarChart3 className="w-8 h-8 text-violet-600" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          AI Data Analyzer
        </h1>
        <p className="text-neutral-500 max-w-xl mx-auto">
          Upload CSV, Excel, or JSON files and get AI-powered insights — trends, risks, KPIs, and actionable recommendations.
        </p>
      </div>

      {!result ? (
        /* Upload Zone */
        <div className="max-w-2xl mx-auto">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
              dragActive
                ? "border-violet-400 bg-violet-50 scale-[1.02]"
                : file
                  ? "border-teal-300 bg-teal-50/50"
                  : "border-neutral-200 bg-white hover:border-violet-300 hover:bg-violet-50/30"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json,.xlsx,.xls,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {file ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-3xl">{getFileIcon()}</span>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">{file.name}</p>
                  <p className="text-sm text-neutral-500">
                    {(file.size / 1024).toFixed(1)} KB •{" "}
                    {file.name.endsWith(".csv")
                      ? "CSV"
                      : file.name.endsWith(".json")
                        ? "JSON"
                        : file.name.endsWith(".pdf")
                          ? "PDF"
                          : "Excel"}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="inline-flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600"
                >
                  <X className="w-4 h-4" /> Remove
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-violet-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 mb-1">
                    Drop your file here or click to browse
                  </p>
                  <p className="text-sm text-neutral-500">
                    Supports CSV, JSON, Excel, and PDF files up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Question Input */}
          {file && (
            <div className="mt-6 space-y-4">
              <div className="bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  What would you like to know? (optional)
                </label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g., What are the top revenue months? Any declining trends?"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-400 text-sm"
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-violet-600 hover:to-indigo-700 transition-all duration-300 shadow-xl shadow-violet-500/20 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-5 h-5" />
                    Analyze Data
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results */
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-gradient-to-r from-violet-500 to-indigo-600 rounded-3xl p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Analysis Summary</h2>
              <button
                onClick={reset}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
              >
                Analyze Another File
              </button>
            </div>
            <p className="text-white/90 text-lg leading-relaxed">{result.summary}</p>
            <p className="text-white/60 text-sm mt-3">
              {file?.name} • {result.rawData.rowCount} rows • {result.rawData.headers.length} columns
            </p>
          </div>

          {/* KPIs */}
          {result.kpis.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-600" /> Key Performance Indicators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {result.kpis.map((kpi, i) => (
                  <div
                    key={i}
                    className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                  >
                    <p className="text-sm text-neutral-500 mb-1">{kpi.label}</p>
                    <p className="text-2xl font-bold text-neutral-900">{kpi.value}</p>
                    {kpi.trend && (
                      <span
                        className={`inline-flex items-center text-xs font-semibold mt-2 px-2 py-0.5 rounded-full ${
                          kpi.trend === "up"
                            ? "bg-emerald-100 text-emerald-700"
                            : kpi.trend === "down"
                              ? "bg-red-100 text-red-700"
                              : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {kpi.trend === "up" ? "↑" : kpi.trend === "down" ? "↓" : "→"} {kpi.trend}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trends & Risks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trends */}
            <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-600" /> Trends Identified
              </h3>
              <ul className="space-y-3">
                {result.trends.map((t, i) => (
                  <li key={i} className="flex gap-3 text-sm text-neutral-700">
                    <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {i + 1}
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Risks */}
            <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" /> Risks & Concerns
              </h3>
              <ul className="space-y-3">
                {result.risks.length > 0 ? (
                  result.risks.map((r, i) => (
                    <li key={i} className="flex gap-3 text-sm text-neutral-700">
                      <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        {i + 1}
                      </span>
                      {r}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-neutral-500 italic">No significant risks identified.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-violet-600" /> Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 rounded-2xl p-5"
                >
                  <span className="w-8 h-8 bg-violet-500 text-white rounded-xl flex items-center justify-center text-sm font-bold mb-3">
                    {i + 1}
                  </span>
                  <p className="text-sm text-neutral-700 leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Preview */}
          <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-neutral-100">
              <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                <Table className="w-5 h-5 text-neutral-600" /> Data Preview
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                Showing first {result.rawData.rows.length} of {result.rawData.rowCount} rows
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-neutral-50">
                    {result.rawData.headers.map((h, i) => (
                      <th
                        key={i}
                        className="px-4 py-3 text-left font-semibold text-neutral-700 border-b border-neutral-100"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.rawData.rows.slice(0, 15).map((row, i) => (
                    <tr key={i} className="hover:bg-neutral-50 transition-colors">
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-2.5 border-b border-neutral-50 text-neutral-600">
                          {String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
