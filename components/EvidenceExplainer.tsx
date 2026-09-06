'use client';

import { useState } from 'react';
import Link from '@/components/Link';

export type ExplainerMetric = {
  id: string;
  label: string;
  value: number;
  unit: string;
  period: string;
  href: string;
  status: 'verified' | 'approx' | 'pending';
  note?: string;
};

export type ExplainerStep = {
  label: string;
  title: string;
  body: string;
  metrics: string[];
};

export function EvidenceExplainer({
  eyebrow,
  title,
  intro,
  metrics,
  steps,
  caveat,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  metrics: ExplainerMetric[];
  steps: ExplainerStep[];
  caveat: string;
}) {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const highlighted = new Set(step.metrics);

  return (
    <section className="eex" aria-labelledby={`eex-${metrics[0].id}`}>
      <div className="eex-head">
        <div>
          <p className="home-kicker mono">{eyebrow}</p>
          <h2 id={`eex-${metrics[0].id}`}>{title}</h2>
        </div>
        <p>{intro}</p>
      </div>

      <div className="eex-steps" role="tablist" aria-label={`${title} explanation steps`}>
        {steps.map((item, index) => (
          <button
            key={item.label}
            type="button"
            role="tab"
            tabIndex={index === active ? 0 : -1}
            aria-selected={index === active}
            aria-controls={`eex-panel-${metrics[0].id}`}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
              event.preventDefault();
              const next = event.key === 'Home'
                ? 0
                : event.key === 'End'
                  ? steps.length - 1
                  : (index + (event.key === 'ArrowRight' ? 1 : -1) + steps.length) % steps.length;
              setActive(next);
              const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
              tabs?.[next]?.focus();
            }}
          >
            <span>{index + 1}</span>{item.label}
          </button>
        ))}
      </div>

      <div key={active} id={`eex-panel-${metrics[0].id}`} className="eex-panel" role="tabpanel">
        <div className="eex-reading">
          <p className="eex-step-count mono">Step {active + 1} of {steps.length}</p>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
          <div className="eex-flow" aria-hidden="true">
            <span />
            <i>follow the distinction</i>
            <span />
          </div>
        </div>

        <div className="eex-bars" aria-label="Values supporting this explanation">
          {metrics.map((metric) => (
            <article key={metric.id} className={highlighted.has(metric.id) ? 'is-active' : 'is-muted'}>
              <div className="eex-bar-head">
                <strong>{metric.label}</strong>
                <span className="mono">{metric.period}</span>
              </div>
              <div className="eex-track" aria-hidden="true">
                <span style={{ ['--value' as string]: Math.min(1, Math.max(0, metric.value / 100)) }} />
              </div>
              <p className="eex-value">
                <b>{metric.value}</b> {metric.unit}
                <span>{metric.status === 'approx' ? 'Survey estimate' : 'Verified observation'}</span>
              </p>
              {metric.note ? <p className="eex-note">{metric.note}</p> : null}
              <Link href={metric.href}>See data and source →</Link>
            </article>
          ))}
        </div>
      </div>
      <p className="eex-caveat"><strong>Read carefully:</strong> {caveat}</p>
    </section>
  );
}
