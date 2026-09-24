import { Service } from "./servicesData";

const ServiceCard = ({ service }: { service: Service }) => {
  const Icon = service.icon;
  return (
    <div
      id={service.id}
      className="group relative scroll-mt-32 overflow-hidden rounded-2xl border border-stroke bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card dark:border-white/10 dark:bg-navy-light dark:hover:border-primary/40 dark:hover:shadow-card-dark"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
      />
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary transition-transform duration-300 group-hover:-translate-y-0.5 dark:text-white">
          <Icon className="h-6 w-6" />
        </span>
        <span className="text-sm font-semibold text-body-color/50 dark:text-white/25">
          {service.number}
        </span>
      </div>
      <h3 className="relative z-10 mb-2.5 text-lg font-bold text-black transition-colors group-hover:text-primary dark:text-white">
        {service.title}
      </h3>
      <p className="relative z-10 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
        {service.description}
      </p>
    </div>
  );
};

export default ServiceCard;
