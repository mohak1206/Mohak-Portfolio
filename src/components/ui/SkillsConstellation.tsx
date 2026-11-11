import React, { useState, useMemo, useEffect, useRef } from 'react';
import { m } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { projectsData } from '../../data/projects';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING } from '../../lib/animation';

interface SkillNodeDef {
  id: string;
  label: string;
  category: string;
}

const CATEGORIES = [
  'Programming',
  'Frontend',
  'Backend',
  'Database',
  'AI / CV',
  'Tools',
] as const;

const SKILL_NODES: SkillNodeDef[] = [
  // Programming
  { id: 'python', label: 'Python', category: 'Programming' },
  // Frontend
  { id: 'react', label: 'React', category: 'Frontend' },
  { id: 'typescript', label: 'TypeScript', category: 'Frontend' },
  { id: 'tailwind', label: 'Tailwind CSS', category: 'Frontend' },
  { id: 'framer', label: 'Framer Motion', category: 'Frontend' },
  // Backend
  { id: 'flask', label: 'Flask', category: 'Backend' },
  { id: 'fastapi', label: 'FastAPI', category: 'Backend' },
  { id: 'socketio', label: 'Socket.IO', category: 'Backend' },
  { id: 'rest', label: 'REST APIs', category: 'Backend' },
  // Database
  { id: 'mysql', label: 'MySQL', category: 'Database' },
  { id: 'firebase', label: 'Firebase', category: 'Database' },
  { id: 'postgres', label: 'PostgreSQL', category: 'Database' },
  // AI / CV
  { id: 'yolov8', label: 'YOLOv8', category: 'AI / CV' },
  { id: 'pytorch', label: 'PyTorch', category: 'AI / CV' },
  { id: 'opencv', label: 'OpenCV', category: 'AI / CV' },
  { id: 'roboflow', label: 'Roboflow', category: 'AI / CV' },
  { id: 'colab', label: 'Google Colab', category: 'AI / CV' },
  // Tools
  { id: 'git', label: 'Git / GitHub', category: 'Tools' },
  { id: 'flutter', label: 'Flutter', category: 'Tools' },
];

const SKILL_MATCH_MAP: Record<string, string[]> = {
  python: ['python'],
  react: ['react', 'react 19', 'react (vite)'],
  typescript: ['typescript'],
  tailwind: ['tailwind', 'tailwind css'],
  framer: ['framer motion', 'framer'],
  flask: ['flask', 'flask-cors'],
  fastapi: ['fastapi', 'rest'],
  socketio: ['socket.io', 'flask-socketio', 'flask-socketio (socket.io)'],
  rest: ['rest', 'rest apis'],
  mysql: ['mysql', 'mysql-connector-python'],
  firebase: ['firebase', 'firestore', 'firebase firestore'],
  postgres: ['postgresql', 'postgres'],
  yolov8: ['yolov8', 'yolov8n', 'ultralytics'],
  pytorch: ['pytorch'],
  opencv: ['opencv', 'cv'],
  roboflow: ['roboflow'],
  colab: ['google colab', 'colab'],
  git: ['git', 'github'],
  flutter: ['flutter', 'dart', 'flutter / dart'],
};

interface Connection {
  projectId: string;
  skillId: string;
}

export const SkillsConstellation: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<{ type: 'project' | 'skill'; id: string } | null>(null);
  const prefersReduced = useReducedMotion();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // SVG dimensions & centers
  const width = 800;
  const height = 620;
  const cx = width / 2;
  const cy = height / 2 - 15;
  const rInner = 145; // Project nodes radius
  const rOuter = 250; // Skill nodes radius

  // Map project nodes on inner ring
  const projectNodes = useMemo(() => {
    const list = projectsData.slice(0, 7);
    const count = list.length;
    return list.map((proj, idx) => {
      const angle = (idx / count) * 2 * Math.PI - Math.PI / 2;
      const x = cx + rInner * Math.cos(angle);
      const y = cy + rInner * Math.sin(angle);
      return {
        id: proj.slug,
        title: proj.title.replace(' using YOLOv8', '').replace(': Cross-Platform College App', ''),
        fullTitle: proj.title,
        slug: proj.slug,
        stack: proj.stack,
        x,
        y,
        angle,
      };
    });
  }, [cx, cy, rInner]);

  // Map skill nodes on outer ring, grouped into arcs by category
  const { skillNodes, categoryLabels } = useMemo(() => {
    const nodes: Array<SkillNodeDef & { x: number; y: number; angle: number }> = [];
    const catLabels: Array<{ category: string; x: number; y: number; angle: number }> = [];

    // Group skills by category
    const grouped = CATEGORIES.map((cat) => ({
      category: cat,
      items: SKILL_NODES.filter((s) => s.category === cat),
    }));

    const totalCategories = CATEGORIES.length;
    grouped.forEach((group, catIdx) => {
      const arcStart = (catIdx / totalCategories) * 2 * Math.PI - Math.PI / 2 + 0.12;
      const arcEnd = ((catIdx + 1) / totalCategories) * 2 * Math.PI - Math.PI / 2 - 0.12;
      const count = group.items.length;

      // Category label at midpoint of arc
      const midAngle = (arcStart + arcEnd) / 2;
      const catX = cx + (rOuter + 38) * Math.cos(midAngle);
      const catY = cy + (rOuter + 38) * Math.sin(midAngle);
      catLabels.push({
        category: group.category,
        x: catX,
        y: catY,
        angle: midAngle,
      });

      group.items.forEach((item, itemIdx) => {
        const angle = count === 1 ? midAngle : arcStart + (itemIdx / (count - 1)) * (arcEnd - arcStart);
        const x = cx + rOuter * Math.cos(angle);
        const y = cy + rOuter * Math.sin(angle);
        nodes.push({ ...item, x, y, angle });
      });
    });

    return { skillNodes: nodes, categoryLabels: catLabels };
  }, [cx, cy, rOuter]);

  // Compute connections between projects and skills
  const connections: Connection[] = useMemo(() => {
    const conns: Connection[] = [];
    projectNodes.forEach((proj) => {
      const pStack = proj.stack.map((s) => s.toLowerCase());
      skillNodes.forEach((skill) => {
        const aliases = SKILL_MATCH_MAP[skill.id] || [skill.id];
        const hasMatch = aliases.some((alias) =>
          pStack.some((ps) => ps.includes(alias) || alias.includes(ps))
        );
        if (hasMatch) {
          conns.push({ projectId: proj.id, skillId: skill.id });
        }
      });
    });
    return conns;
  }, [projectNodes, skillNodes]);

  // Lookup dictionaries
  const projectMap = useMemo(() => new Map(projectNodes.map((p) => [p.id, p])), [projectNodes]);
  const skillMap = useMemo(() => new Map(skillNodes.map((s) => [s.id, s])), [skillNodes]);

  // Active highlights
  const activeProjectIds = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    if (selectedNode.type === 'project') return new Set([selectedNode.id]);
    const matches = connections
      .filter((c) => c.skillId === selectedNode.id)
      .map((c) => c.projectId);
    return new Set(matches);
  }, [selectedNode, connections]);

  const activeSkillIds = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    if (selectedNode.type === 'skill') return new Set([selectedNode.id]);
    const matches = connections
      .filter((c) => c.projectId === selectedNode.id)
      .map((c) => c.skillId);
    return new Set(matches);
  }, [selectedNode, connections]);

  const activeConnectionKeys = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    const keys = new Set<string>();
    connections.forEach((c) => {
      if (
        (selectedNode.type === 'project' && c.projectId === selectedNode.id) ||
        (selectedNode.type === 'skill' && c.skillId === selectedNode.id)
      ) {
        keys.add(`${c.projectId}-${c.skillId}`);
      }
    });
    return keys;
  }, [selectedNode, connections]);

  // Clear selection on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedNode(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Caption text
  const caption = useMemo(() => {
    if (!selectedNode) {
      return (
        <span className="text-muted-grey">
          Hover or tap any project or skill to explore technology connections. Click a project node to view details.
        </span>
      );
    }

    if (selectedNode.type === 'skill') {
      const skill = skillMap.get(selectedNode.id);
      const connectedProjects = connections
        .filter((c) => c.skillId === selectedNode.id)
        .map((c) => projectMap.get(c.projectId))
        .filter(Boolean);

      if (!skill || connectedProjects.length === 0) {
        return (
          <span>
            <strong className="text-burnt-orange">{skill?.label}</strong>: Foundational skill across architectures.
          </span>
        );
      }

      return (
        <span className="flex flex-wrap items-center justify-center gap-1.5">
          <span className="font-semibold text-charcoal">{skill.label}</span>
          <span className="text-muted-grey">is used in:</span>
          {connectedProjects.map((p, idx) => (
            <React.Fragment key={p!.slug}>
              <Link
                to={`/projects/${p!.slug}`}
                className="draw-underline-link font-semibold text-burnt-orange hover:text-light-orange"
              >
                {p!.title}
              </Link>
              {idx < connectedProjects.length - 1 && <span className="text-muted-grey">·</span>}
            </React.Fragment>
          ))}
        </span>
      );
    }

    if (selectedNode.type === 'project') {
      const proj = projectMap.get(selectedNode.id);
      const connectedSkills = connections
        .filter((c) => c.projectId === selectedNode.id)
        .map((c) => skillMap.get(c.skillId))
        .filter(Boolean);

      if (!proj) return null;

      return (
        <span className="flex flex-wrap items-center justify-center gap-1.5">
          <Link
            to={`/projects/${proj.slug}`}
            className="font-semibold text-burnt-orange hover:text-light-orange draw-underline-link"
          >
            {proj.title}
          </Link>
          <span className="text-muted-grey">connects:</span>
          <span className="text-charcoal font-mono text-xs">
            {connectedSkills.map((s) => s!.label).join(', ')}
          </span>
        </span>
      );
    }

    return null;
  }, [selectedNode, connections, projectMap, skillMap]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto flex flex-col items-center select-none"
    >
      {/* Accessible screen-reader text list */}
      <div className="sr-only">
        <h4>Technology Constellation List</h4>
        <ul>
          {projectNodes.map((p) => {
            const pSkills = connections
              .filter((c) => c.projectId === p.id)
              .map((c) => skillMap.get(c.skillId)?.label)
              .filter(Boolean);
            return (
              <li key={p.id}>
                {p.title}: {pSkills.join(', ')}
              </li>
            );
          })}
        </ul>
      </div>

      {/* SVG Constellation Graphic */}
      <div className="w-full aspect-[4/3] sm:aspect-[16/11] max-h-[640px] relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle guide circles */}
          <circle
            cx={cx}
            cy={cy}
            r={rInner}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.4"
          />
          <circle
            cx={cx}
            cy={cy}
            r={rOuter}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.4"
          />

          {/* Category arc labels */}
          {categoryLabels.map((cat) => (
            <text
              key={cat.category}
              x={cat.x}
              y={cat.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-grey text-[10px] font-mono uppercase tracking-widest font-semibold pointer-events-none"
            >
              {cat.category}
            </text>
          ))}

          {/* Connection Lines */}
          <g className="connections-group">
            {connections.map((c) => {
              const p = projectMap.get(c.projectId);
              const s = skillMap.get(c.skillId);
              if (!p || !s) return null;

              const isHighlighted = activeConnectionKeys.has(`${c.projectId}-${c.skillId}`);
              const isDimmed = selectedNode !== null && !isHighlighted;

              return (
                <m.line
                  key={`${c.projectId}-${c.skillId}`}
                  x1={p.x}
                  y1={p.y}
                  x2={s.x}
                  y2={s.y}
                  initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: isHighlighted ? 1 : isDimmed ? 0.15 : 0.45,
                    stroke: isHighlighted ? 'var(--color-accent)' : 'var(--color-border)',
                    strokeWidth: isHighlighted ? 2 : 1.2,
                  }}
                  transition={{ duration: 0.6, ease: EASING }}
                />
              );
            })}
          </g>

          {/* Skill Nodes (Outer Ring) */}
          <g className="skills-group">
            {skillNodes.map((s, idx) => {
              const isSelected = selectedNode?.type === 'skill' && selectedNode.id === s.id;
              const isHighlighted = activeSkillIds.has(s.id);
              const isDimmed = selectedNode !== null && !isHighlighted && !isSelected;

              // Text position slightly outside or inside node based on angle
              const cos = Math.cos(s.angle);
              const sin = Math.sin(s.angle);
              const labelDistance = 14;
              const textAnchor = cos > 0.2 ? 'start' : cos < -0.2 ? 'end' : 'middle';
              const labelX = s.x + labelDistance * cos;
              const labelY = s.y + labelDistance * sin + (Math.abs(cos) <= 0.2 ? (sin > 0 ? 12 : -8) : 3);

              return (
                <g
                  key={s.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedNode(isSelected ? null : { type: 'skill', id: s.id })}
                  onMouseEnter={() => setSelectedNode({ type: 'skill', id: s.id })}
                  onMouseLeave={() => setSelectedNode(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Skill ${s.label}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedNode(isSelected ? null : { type: 'skill', id: s.id });
                    }
                  }}
                >
                  <m.circle
                    cx={s.x}
                    cy={s.y}
                    r={isSelected || isHighlighted ? 6.5 : 4.5}
                    initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: isDimmed ? 0.25 : 1,
                      fill: isSelected || isHighlighted ? 'var(--color-accent)' : 'var(--color-card-surface)',
                      stroke: isSelected || isHighlighted ? 'var(--color-accent)' : 'var(--color-border)',
                      strokeWidth: isSelected || isHighlighted ? 2.5 : 1.5,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: prefersReduced ? 0 : idx * 0.02,
                      ease: EASING,
                    }}
                  />

                  {/* Skill Label */}
                  <m.text
                    x={labelX}
                    y={labelY}
                    textAnchor={textAnchor}
                    initial={prefersReduced ? false : { opacity: 0 }}
                    animate={{
                      opacity: isDimmed ? 0.2 : 1,
                      fill: isSelected || isHighlighted ? 'var(--color-accent)' : 'var(--color-charcoal)',
                      fontWeight: isSelected || isHighlighted ? 600 : 400,
                    }}
                    className="text-[11px] font-mono pointer-events-none select-none transition-colors"
                  >
                    {s.label}
                  </m.text>
                </g>
              );
            })}
          </g>

          {/* Project Nodes (Inner Ring) */}
          <g className="projects-group">
            {projectNodes.map((p, idx) => {
              const isSelected = selectedNode?.type === 'project' && selectedNode.id === p.id;
              const isHighlighted = activeProjectIds.has(p.id);
              const isDimmed = selectedNode !== null && !isHighlighted && !isSelected;

              // Text label placement
              const cos = Math.cos(p.angle);
              const sin = Math.sin(p.angle);
              const textAnchor = cos > 0.2 ? 'start' : cos < -0.2 ? 'end' : 'middle';
              const labelX = p.x + (cos > 0.2 ? 18 : cos < -0.2 ? -18 : 0);
              const labelY = p.y + (Math.abs(cos) <= 0.2 ? (sin > 0 ? 24 : -18) : 4);

              return (
                <g
                  key={p.id}
                  className="cursor-pointer group"
                  onClick={() => navigate(`/projects/${p.slug}`)}
                  onMouseEnter={() => setSelectedNode({ type: 'project', id: p.id })}
                  onMouseLeave={() => setSelectedNode(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Project ${p.title}. Click to view project details`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      navigate(`/projects/${p.slug}`);
                    } else if (e.key === ' ') {
                      e.preventDefault();
                      setSelectedNode(isSelected ? null : { type: 'project', id: p.id });
                    }
                  }}
                >
                  {/* Subtle outer glow ring when active */}
                  {(isSelected || isHighlighted) && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="18"
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  )}

                  <m.circle
                    cx={p.x}
                    cy={p.y}
                    r={isSelected || isHighlighted ? 12 : 9}
                    initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: isDimmed ? 0.25 : 1,
                      fill: isSelected || isHighlighted ? 'var(--color-accent)' : 'var(--color-card-surface)',
                      stroke: 'var(--color-accent)',
                      strokeWidth: isSelected || isHighlighted ? 3 : 2,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: prefersReduced ? 0 : idx * 0.04,
                      ease: EASING,
                    }}
                  />

                  {/* Project Title Label */}
                  <m.text
                    x={labelX}
                    y={labelY}
                    textAnchor={textAnchor}
                    initial={prefersReduced ? false : { opacity: 0 }}
                    animate={{
                      opacity: isDimmed ? 0.2 : 1,
                      fill: isSelected || isHighlighted ? 'var(--color-accent)' : 'var(--color-charcoal)',
                      fontWeight: isSelected || isHighlighted ? 600 : 500,
                    }}
                    className="font-serif text-[12px] sm:text-[13px] pointer-events-none select-none transition-colors"
                  >
                    {p.title}
                  </m.text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Caption row below SVG */}
      <div className="w-full mt-4 p-4 rounded-[6px] bg-card-surface border border-warm-border text-center text-xs sm:text-sm font-sans transition-all duration-200 min-h-[52px] flex items-center justify-center shadow-2xs">
        {caption}
      </div>
    </div>
  );
};

export default SkillsConstellation;
