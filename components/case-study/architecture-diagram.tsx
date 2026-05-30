import type { ReactNode } from "react";
import type { DiagramType } from "@/lib/projects";

interface ArchitectureDiagramProps {
  type: DiagramType;
  className?: string;
}

const box = (x: number, y: number, w: number, h: number, label: string, fill = "#1e293b") => (
  <g key={`${x}-${y}-${label}`}>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={8}
      fill={fill}
      stroke="#38bdf8"
      strokeWidth={1.5}
      opacity={0.95}
    />
    <text
      x={x + w / 2}
      y={y + h / 2 + 5}
      textAnchor="middle"
      fill="#e2e8f0"
      fontSize={13}
      fontFamily="system-ui, sans-serif"
      fontWeight={600}
    >
      {label}
    </text>
  </g>
);

const arrow = (x1: number, y1: number, x2: number, y2: number) => (
  <line
    key={`${x1}-${y1}-${x2}-${y2}`}
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke="#64748b"
    strokeWidth={2}
    markerEnd="url(#arrowhead)"
  />
);

export function ArchitectureDiagram({ type, className = "" }: ArchitectureDiagramProps) {
  const diagrams: Record<DiagramType, ReactNode> = {
    serverless: (
      <>
        {box(40, 30, 120, 44, "Mobile / Web")}
        {box(220, 30, 120, 44, "API Gateway")}
        {box(400, 30, 130, 44, "Lambda services")}
        {box(220, 120, 120, 44, "SQS / Kinesis")}
        {box(400, 120, 130, 44, "RDS / data stores")}
        {box(40, 210, 160, 44, "Terraform CI/CD")}
        {arrow(160, 52, 220, 52)}
        {arrow(340, 52, 400, 52)}
        {arrow(465, 74, 465, 120)}
        {arrow(340, 142, 400, 142)}
        {arrow(120, 210, 120, 74)}
      </>
    ),
    marketplace: (
      <>
        {box(30, 40, 110, 44, "Next.js client")}
        {box(180, 40, 110, 44, "FastAPI API")}
        {box(330, 40, 120, 44, "PostgreSQL")}
        {box(180, 130, 110, 44, "WebSockets")}
        {box(330, 130, 120, 44, "Veriff KYC")}
        {box(30, 210, 200, 44, "AWS Lightsail")}
        {arrow(140, 62, 180, 62)}
        {arrow(290, 62, 330, 62)}
        {arrow(235, 84, 235, 130)}
        {arrow(390, 84, 390, 130)}
        {arrow(130, 210, 130, 84)}
      </>
    ),
    "ai-education": (
      <>
        {box(40, 35, 120, 44, "Next.js app")}
        {box(200, 35, 130, 44, "FastAPI / API")}
        {box(380, 35, 140, 44, "GPT-4 + grader")}
        {box(200, 125, 160, 44, "LangChain RAG")}
        {box(400, 125, 120, 44, "Vector store")}
        {box(40, 210, 200, 44, "Curriculum docs")}
        {arrow(160, 57, 200, 57)}
        {arrow(330, 57, 380, 57)}
        {arrow(280, 79, 280, 125)}
        {arrow(360, 147, 400, 147)}
        {arrow(140, 210, 140, 79)}
      </>
    ),
    "frontend-platform": (
      <>
        {box(50, 50, 130, 44, "Next.js UI")}
        {box(230, 50, 140, 44, "REST / NestJS")}
        {box(420, 50, 120, 44, "MongoDB")}
        {box(230, 150, 140, 44, "AI matching")}
        {box(50, 210, 180, 44, "Kanban / React DnD")}
        {arrow(180, 72, 230, 72)}
        {arrow(370, 72, 420, 72)}
        {arrow(300, 94, 300, 150)}
        {arrow(140, 210, 140, 94)}
      </>
    ),
  };

  return (
    <figure className={className}>
      <svg
        viewBox="0 0 560 280"
        className="w-full h-auto max-h-[320px] rounded-xl border border-foreground/10 bg-slate-950/80"
        role="img"
        aria-label="Architecture diagram"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#64748b" />
          </marker>
        </defs>
        <rect width="560" height="280" fill="#0f172a" rx={12} />
        {diagrams[type]}
      </svg>
      <figcaption className="sr-only">High-level architecture diagram</figcaption>
    </figure>
  );
}
