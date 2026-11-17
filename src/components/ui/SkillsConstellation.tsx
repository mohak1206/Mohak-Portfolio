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
  yolov8: ['yolov8', 'yolov8n', 'ultralytics', 'yolo'],
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

  // SVG viewBox 1100 x 820 with center (550, 410)
  const width = 1100;
  const height = 820;
  const cx = 550;
  const cy = 410;
  const rInner = 150; // Inner ring: Projects
  const rOuter = 330; // Outer ring: Skills
  const rGroupArc = 365; // Group arc line radius
  const rGroupLabel = 400; // Group label radius

  // 1) Project nodes on inner ring (radius 150)
  const projectNodes = useMemo(() => {
    const list = projectsData.slice(0, 7);
    const count = list.length;
    return list.map((proj, idx) => {
      // Space evenly starting at top
      const angle = (idx / count) * 2 * Math.PI - Math.PI / 2;
      const x = cx + rInner * Math.cos(angle);
      const y = cy + rInner * Math.sin(angle);

      // Short name for label
      const shortTitle = proj.shortName || proj.title;

      // Project label drawn INSIDE the ring, facing the center
      const labelDistInward = 24;
      const labelX = cx + (rInner - labelDistInward) * Math.cos(angle);
      const labelY = cy + (rInner - labelDistInward) * Math.sin(angle);

      // textAnchor start for nodes on left half, end for right half
      const cos = Math.cos(angle);
      let textAnchor: 'start' | 'end' | 'middle' = 'middle';
      if (cos > 0.15) {
        textAnchor = 'end';
      } else if (cos < -0.15) {
        textAnchor = 'start';
      }

      return {
        id: proj.slug,
        title: shortTitle,
        fullTitle: proj.title,
        slug: proj.slug,
        stack: proj.stack,
        x,
        y,
        angle,
        labelX,
        labelY,
        textAnchor,
      };
    });
  }, [cx, cy, rInner]);

  // 2) Skill nodes on outer ring (radius 330) and Group arcs & labels (radius 400)
  const { skillNodes, groupArcs, groupLabels } = useMemo(() => {
    const totalSkills = SKILL_NODES.length;
    const totalCategories = CATEGORIES.length;

    // 12 degree gap between groups in radians
    const gapRad = 12 * (Math.PI / 180);
    const totalGap = totalCategories * gapRad;
    const availableArc = 2 * Math.PI - totalGap;

    const grouped = CATEGORIES.map((cat) => ({
      category: cat,
      items: SKILL_NODES.filter((s) => s.category === cat),
    }));

    let currentAngle = -Math.PI / 2 + gapRad / 2;
    const rawSkillNodes: Array<{
      id: string;
      label: string;
      category: string;
      x: number;
      y: number;
      angle: number;
      labelRadius: number;
      labelX: number;
      labelY: number;
      textAnchor: 'start' | 'end';
    }> = [];

    const arcs: Array<{
      category: string;
      path: string;
    }> = [];

    const labels: Array<{
      category: string;
      x: number;
      y: number;
      angle: number;
    }> = [];

    grouped.forEach((group) => {
      const count = group.items.length;
      // Span proportional to item count
      const groupSpan = (count / totalSkills) * availableArc;
      const arcStart = currentAngle;
      const arcEnd = currentAngle + groupSpan;
      const midAngle = (arcStart + arcEnd) / 2;

      // Group arc line under group's arc
      const arcX1 = cx + rGroupArc * Math.cos(arcStart);
      const arcY1 = cy + rGroupArc * Math.sin(arcStart);
      const arcX2 = cx + rGroupArc * Math.cos(arcEnd);
      const arcY2 = cy + rGroupArc * Math.sin(arcEnd);
      const arcPath = `M ${arcX1} ${arcY1} A ${rGroupArc} ${rGroupArc} 0 0 1 ${arcX2} ${arcY2}`;
      arcs.push({ category: group.category, path: arcPath });

      // Group label on third radius (400)
      const groupLabelX = cx + rGroupLabel * Math.cos(midAngle);
      const groupLabelY = cy + rGroupLabel * Math.sin(midAngle);
      labels.push({
        category: group.category,
        x: groupLabelX,
        y: groupLabelY,
        angle: midAngle,
      });

      // Individual skill nodes inside the arc
      group.items.forEach((item, itemIdx) => {
        const angle =
          count === 1
            ? midAngle
            : arcStart + ((itemIdx + 0.5) / count) * groupSpan;

        const x = cx + rOuter * Math.cos(angle);
        const y = cy + rOuter * Math.sin(angle);

        // Put each skill label OUTSIDE its node along radius (text-anchor start on right, end on left)
        const initLabelRadius = rOuter + 18;
        const labelX = cx + initLabelRadius * Math.cos(angle);
        const labelY = cy + initLabelRadius * Math.sin(angle);
        const textAnchor: 'start' | 'end' = Math.cos(angle) >= 0 ? 'start' : 'end';

        rawSkillNodes.push({
          ...item,
          x,
          y,
          angle,
          labelRadius: initLabelRadius,
          labelX,
          labelY,
          textAnchor,
        });
      });

      currentAngle = arcEnd + gapRad;
    });

    // 3) Collision Avoidance Relaxation for skill labels:
    // Approximate bounding box: (characters * 0.6 * fontSize) by fontSize (11px)
    const relaxedNodes = rawSkillNodes.map((n) => ({ ...n }));
    const maxIterations = 40;
    const nudgeStep = 4;

    for (let iter = 0; iter < maxIterations; iter++) {
      let hadOverlap = false;

      for (let i = 0; i < relaxedNodes.length; i++) {
        for (let j = i + 1; j < relaxedNodes.length; j++) {
          const a = relaxedNodes[i];
          const b = relaxedNodes[j];

          const aWidth = a.label.length * 0.6 * 11;
          const aHeight = 14;
          const aLeft = a.textAnchor === 'start' ? a.labelX : a.labelX - aWidth;
          const aRight = aLeft + aWidth;
          const aTop = a.labelY - aHeight / 2;
          const aBottom = aTop + aHeight;

          const bWidth = b.label.length * 0.6 * 11;
          const bHeight = 14;
          const bLeft = b.textAnchor === 'start' ? b.labelX : b.labelX - bWidth;
          const bRight = bLeft + bWidth;
          const bTop = b.labelY - bHeight / 2;
          const bBottom = bTop + bHeight;

          // Check AABB overlap with 3px buffer
          const overlapX = aLeft - 3 < bRight && aRight + 3 > bLeft;
          const overlapY = aTop - 3 < bBottom && aBottom + 3 > bTop;

          if (overlapX && overlapY) {
            hadOverlap = true;
            // Nudge the outer one further outwards along its radius
            const target = a.labelRadius >= b.labelRadius ? a : b;
            if (target.labelRadius < 470) {
              target.labelRadius += nudgeStep;
              target.labelX = cx + target.labelRadius * Math.cos(target.angle);
              target.labelY = cy + target.labelRadius * Math.sin(target.angle);
            }
          }
        }
      }

      if (!hadOverlap) break;
    }

    return {
      skillNodes: relaxedNodes,
      groupArcs: arcs,
      groupLabels: labels,
    };
  }, [cx, cy, rOuter, rGroupArc, rGroupLabel]);

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

  // Caption text below SVG
  const caption = useMemo(() => {
    if (!selectedNode) {
      return (
        <span className="text-muted-grey text-xs sm:text-sm">
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
          <span className="text-xs sm:text-sm">
            <strong className="text-burnt-orange font-semibold">{skill?.label}</strong>: Foundational skill across architectures.
          </span>
        );
      }

      return (
        <span className="flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm">
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
        <span className="flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm">
          <Link
            to={`/projects/${proj.slug}`}
            className="font-semibold text-burnt-orange hover:text-light-orange draw-underline-link"
          >
            {proj.fullTitle}
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
      className="relative w-full max-w-5xl mx-auto flex flex-col items-center select-none"
    >
      {/* Accessible screen-reader list */}
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

      {/* SVG Constellation Graphic: viewBox 1100 x 820, width 100%, min-height 560px on desktop */}
      <div className="w-full min-h-[560px] relative flex items-center justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-[820px] overflow-visible"
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
            opacity="0.35"
          />
          <circle
            cx={cx}
            cy={cy}
            r={rOuter}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.35"
          />

          {/* Group arc lines under each group */}
          {groupArcs.map((arc) => (
            <path
              key={arc.category}
              d={arc.path}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.45"
            />
          ))}

          {/* Group labels on third radius (400) */}
          {groupLabels.map((cat) => (
            <text
              key={cat.category}
              x={cat.x}
              y={cat.y}
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                paintOrder: 'stroke',
                stroke: 'var(--color-bg)',
                strokeWidth: '4px',
                strokeLinejoin: 'round',
              }}
              className="fill-muted-grey text-[11px] font-mono uppercase tracking-widest font-bold pointer-events-none select-none"
            >
              {cat.category}
            </text>
          ))}

          {/* Connection Lines (thin curves, opacity 0.12 by default; highlighted: orange 0.9) */}
          <g className="connections-group">
            {connections.map((c) => {
              const p = projectMap.get(c.projectId);
              const s = skillMap.get(c.skillId);
              if (!p || !s) return null;

              const isHighlighted = activeConnectionKeys.has(`${c.projectId}-${c.skillId}`);
              const isDimmed = selectedNode !== null && !isHighlighted;

              // Graceful quadratic curve bending subtly toward center
              const ctrlX = (p.x + s.x) * 0.45 + cx * 0.1;
              const ctrlY = (p.y + s.y) * 0.45 + cy * 0.1;
              const pathD = `M ${p.x} ${p.y} Q ${ctrlX} ${ctrlY} ${s.x} ${s.y}`;

              return (
                <m.path
                  key={`${c.projectId}-${c.skillId}`}
                  d={pathD}
                  fill="none"
                  initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: isHighlighted ? 0.9 : isDimmed ? 0.04 : 0.12,
                    stroke: isHighlighted ? 'var(--color-accent)' : 'var(--color-border)',
                    strokeWidth: isHighlighted ? 2 : 1.2,
                  }}
                  transition={{ duration: 0.5, ease: EASING }}
                />
              );
            })}
          </g>

          {/* Skill Nodes (Outer Ring, radius 330) */}
          <g className="skills-group">
            {skillNodes.map((s, idx) => {
              const isSelected = selectedNode?.type === 'skill' && selectedNode.id === s.id;
              const isHighlighted = activeSkillIds.has(s.id);
              const isDimmed = selectedNode !== null && !isHighlighted && !isSelected;

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
                      opacity: isDimmed ? 0.2 : 1,
                      fill: isSelected || isHighlighted ? 'var(--color-accent)' : 'var(--color-card-surface)',
                      stroke: isSelected || isHighlighted ? 'var(--color-accent)' : 'var(--color-border)',
                      strokeWidth: isSelected || isHighlighted ? 2.5 : 1.5,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: prefersReduced ? 0 : idx * 0.015,
                      ease: EASING,
                    }}
                  />

                  {/* Skill Label outside along radius with halo */}
                  <m.text
                    x={s.labelX}
                    y={s.labelY}
                    textAnchor={s.textAnchor}
                    dominantBaseline="central"
                    initial={prefersReduced ? false : { opacity: 0 }}
                    animate={{
                      opacity: isDimmed ? 0.2 : 1,
                      fill: isSelected || isHighlighted ? 'var(--color-accent)' : 'var(--color-charcoal)',
                      fontWeight: isSelected || isHighlighted ? 600 : 500,
                    }}
                    style={{
                      paintOrder: 'stroke',
                      stroke: 'var(--color-bg)',
                      strokeWidth: '4px',
                      strokeLinejoin: 'round',
                    }}
                    className="text-[11px] font-mono pointer-events-none select-none transition-colors"
                  >
                    {s.label}
                  </m.text>
                </g>
              );
            })}
          </g>

          {/* Project Nodes (Inner Ring, radius 150) */}
          <g className="projects-group">
            {projectNodes.map((p, idx) => {
              const isSelected = selectedNode?.type === 'project' && selectedNode.id === p.id;
              const isHighlighted = activeProjectIds.has(p.id);
              const isDimmed = selectedNode !== null && !isHighlighted && !isSelected;

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
                      strokeWidth="1.2"
                      opacity="0.4"
                    />
                  )}

                  <m.circle
                    cx={p.x}
                    cy={p.y}
                    r={isSelected || isHighlighted ? 11 : 8.5}
                    initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: isDimmed ? 0.2 : 1,
                      fill: isSelected || isHighlighted ? 'var(--color-accent)' : 'var(--color-card-surface)',
                      stroke: 'var(--color-accent)',
                      strokeWidth: isSelected || isHighlighted ? 3 : 2,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: prefersReduced ? 0 : idx * 0.03,
                      ease: EASING,
                    }}
                  />

                  {/* Project Title Label drawn INSIDE the ring facing center with halo */}
                  <m.text
                    x={p.labelX}
                    y={p.labelY}
                    textAnchor={p.textAnchor}
                    dominantBaseline="central"
                    initial={prefersReduced ? false : { opacity: 0 }}
                    animate={{
                      opacity: isDimmed ? 0.2 : 1,
                      fill: isSelected || isHighlighted ? 'var(--color-accent)' : 'var(--color-charcoal)',
                      fontWeight: isSelected || isHighlighted ? 600 : 500,
                    }}
                    style={{
                      paintOrder: 'stroke',
                      stroke: 'var(--color-bg)',
                      strokeWidth: '4px',
                      strokeLinejoin: 'round',
                    }}
                    className="font-serif text-[13px] pointer-events-none select-none transition-colors"
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
      <div className="w-full mt-4 p-4 rounded-lg bg-card-surface border border-warm-border text-center transition-all duration-200 min-h-[52px] flex items-center justify-center shadow-2xs">
        {caption}
      </div>
    </div>
  );
};

export default SkillsConstellation;
