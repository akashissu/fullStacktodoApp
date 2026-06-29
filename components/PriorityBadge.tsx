import type { Priority } from '../src/types';

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <span className={`badge badge--${priority}`}>{priority}</span>;
}
