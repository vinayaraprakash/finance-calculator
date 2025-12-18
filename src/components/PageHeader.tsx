export default function PageHeader({ title, subtitle }: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-hero-blue text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-1">{title}</h1>
        {subtitle && (
          <p className="text-slate-200">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
