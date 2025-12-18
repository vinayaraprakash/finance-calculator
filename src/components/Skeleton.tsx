export default function Skeleton({ height = "h-4" }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${height}`}
    />
  );
}
