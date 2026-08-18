'use client';

import { useState, useRef, useCallback } from 'react';

export interface CardExportData {
  title: string;
  category?: string;
  domain?: string;
  tier?: string;
  publisher?: string;
  period?: string;
  value?: string | number;
  unit?: string;
  caveat?: string;
  points?: { year: number; value: number }[];
  seriesBTitle?: string;
  seriesBPoints?: { year: number; value: number }[];
  seriesBUnit?: string;
}

export function ShareCardExporter({ data, label = 'Share Card' }: { data: CardExportData; label?: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1200;
    const H = 630;
    canvas.width = W;
    canvas.height = H;

    // Background: Studio Slate Obsidian
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, W, H);

    // Inner Surface Card
    const pad = 40;
    const cardW = W - pad * 2;
    const cardH = H - pad * 2;
    ctx.fillStyle = '#161b22';
    ctx.beginPath();
    ctx.roundRect(pad, pad, cardW, cardH, 16);
    ctx.fill();
    ctx.strokeStyle = '#30363d';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Top Header: Category / Domain Badge & Tier
    let headerX = pad + 32;
    const headerY = pad + 48;

    if (data.domain) {
      ctx.fillStyle = '#1f2937';
      ctx.beginPath();
      ctx.roundRect(headerX, headerY - 20, 140, 28, 6);
      ctx.fill();
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#31c48d';
      ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
      ctx.fillText(data.domain.toUpperCase(), headerX + 12, headerY - 1);
      headerX += 156;
    }

    if (data.tier) {
      ctx.fillStyle = '#2d1f0e';
      ctx.beginPath();
      ctx.roundRect(headerX, headerY - 20, 90, 28, 6);
      ctx.fill();
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
      ctx.fillText(data.tier.toUpperCase(), headerX + 12, headerY - 1);
      headerX += 106;
    }

    if (data.publisher) {
      ctx.fillStyle = '#8b949e';
      ctx.font = '500 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(data.publisher, headerX, headerY - 1);
    }

    // Title
    ctx.fillStyle = '#f0f6fc';
    ctx.font = '600 30px -apple-system, BlinkMacSystemFont, "Spectral", Georgia, serif';
    const titleLines = wrapText(ctx, data.title, cardW - 64);
    let titleY = pad + 100;
    titleLines.slice(0, 2).forEach((line) => {
      ctx.fillText(line, pad + 32, titleY);
      titleY += 38;
    });

    // Chart Area
    const chartX = pad + 32;
    const chartY = titleY + 15;
    const chartW = cardW - 64;
    const chartH = 210;

    // Draw Term Bands
    const xMin = 2010;
    const xMax = 2026;
    const getX = (yr: number) => chartX + ((yr - xMin) / (xMax - xMin)) * chartW;

    // Term 1 (2014-2019)
    const t1X = getX(2014);
    const t1W = getX(2019) - t1X;
    ctx.fillStyle = 'rgba(56, 139, 253, 0.07)';
    ctx.fillRect(t1X, chartY, t1W, chartH);
    ctx.fillStyle = '#58a6ff';
    ctx.font = '500 11px monospace';
    ctx.fillText('TERM 1 (2014–19)', t1X + 8, chartY + 20);

    // Term 2 (2019-2024)
    const t2X = getX(2019);
    const t2W = getX(2024) - t2X;
    ctx.fillStyle = 'rgba(56, 139, 253, 0.12)';
    ctx.fillRect(t2X, chartY, t2W, chartH);
    ctx.fillText('TERM 2 (2019–24)', t2X + 8, chartY + 20);

    // Term 3 (2024-2026)
    const t3X = getX(2024);
    const t3W = getX(2026) - t3X;
    ctx.fillStyle = 'rgba(56, 139, 253, 0.16)';
    ctx.fillRect(t3X, chartY, t3W, chartH);
    ctx.fillText('TERM 3', t3X + 8, chartY + 20);

    // Chart Border / Baseline
    ctx.strokeStyle = '#30363d';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(chartX, chartY + chartH);
    ctx.lineTo(chartX + chartW, chartY + chartH);
    ctx.stroke();

    // Year Tick Labels
    ctx.fillStyle = '#6e7681';
    ctx.font = '400 11px monospace';
    [2010, 2014, 2018, 2022, 2026].forEach((yr) => {
      const x = getX(yr);
      ctx.fillText(String(yr), x - 12, chartY + chartH + 18);
    });

    // Draw Points / Sparkline for Series A
    if (data.points && data.points.length > 0) {
      const pts = data.points;
      const vMin = Math.min(...pts.map((p) => p.value));
      const vMax = Math.max(...pts.map((p) => p.value));
      const vRange = vMax - vMin || 1;
      const getY = (v: number) => chartY + chartH - 30 - ((v - vMin) / vRange) * (chartH - 60);

      // Line
      ctx.strokeStyle = '#58a6ff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      pts.forEach((p, idx) => {
        const x = getX(p.year);
        const y = getY(p.value);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Points
      pts.forEach((p) => {
        const x = getX(p.year);
        const y = getY(p.value);
        ctx.fillStyle = '#58a6ff';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0d1117';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Latest Value callout
      const latest = pts[pts.length - 1];
      const latestX = getX(latest.year);
      const latestY = getY(latest.value);
      ctx.fillStyle = '#f0f6fc';
      ctx.font = '600 13px monospace';
      ctx.fillText(latest.value + ' ' + (data.unit || ''), Math.min(latestX - 40, chartX + chartW - 90), latestY - 12);
    }

    // Series B (if Comparator Pair)
    if (data.seriesBPoints && data.seriesBPoints.length > 0) {
      const ptsB = data.seriesBPoints;
      const vMinB = Math.min(...ptsB.map((p) => p.value));
      const vMaxB = Math.max(...ptsB.map((p) => p.value));
      const vRangeB = vMaxB - vMinB || 1;
      const getYB = (v: number) => chartY + chartH - 30 - ((v - vMinB) / vRangeB) * (chartH - 60);

      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ptsB.forEach((p, idx) => {
        const x = getX(p.year);
        const y = getYB(p.value);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      ptsB.forEach((p) => {
        const x = getX(p.year);
        const y = getYB(p.value);
        ctx.fillStyle = '#f87171';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0d1117';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    // Caveat Section / Footer
    const footY = H - pad - 26;
    if (data.caveat) {
      ctx.fillStyle = '#d29922';
      ctx.font = '500 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const caveatText = '⚠ Caveat: ' + (data.caveat.length > 130 ? data.caveat.slice(0, 130) + '…' : data.caveat);
      ctx.fillText(caveatText, pad + 32, footY - 24);
    }

    // Watermark & URL
    ctx.fillStyle = '#6e7681';
    ctx.font = '500 13px monospace';
    ctx.fillText('India, On the Record', pad + 32, footY);
    ctx.fillText('india-government.vercel.app', pad + cardW - 240, footY);
  }, [data]);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(drawCard, 50);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDownloading(true);
    const link = document.createElement('a');
    link.download = (data.title || 'india-record').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    setTimeout(() => setDownloading(false), 500);
  };

  const handleCopy = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch {
      handleDownload();
    }
  };

  return (
    <>
      <button
        type="button"
        className="export-trigger-btn"
        onClick={handleOpen}
        aria-label="Export shareable card PNG"
        title="Create high-res shareable image card"
      >
        <span className="export-icon">⤓</span>
        <span>{label}</span>
      </button>

      {open ? (
        <div className="export-backdrop" onClick={() => setOpen(false)}>
          <div className="export-modal" onClick={(e) => e.stopPropagation()}>
            <div className="export-modal-header">
              <h3 className="export-modal-title">Shareable Image Card</h3>
              <button
                type="button"
                className="export-close"
                onClick={() => setOpen(false)}
                aria-label="Close export dialog"
              >
                ✕
              </button>
            </div>

            <div className="export-preview-box">
              <canvas ref={canvasRef} className="export-canvas" />
            </div>

            <div className="export-modal-actions">
              <button
                type="button"
                className="export-action-btn"
                onClick={handleCopy}
              >
                {copied ? '✓ Image Copied!' : '📋 Copy to Clipboard'}
              </button>
              <button
                type="button"
                className="export-action-btn export-action-primary"
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? 'Downloading…' : '⤓ Download PNG'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}
