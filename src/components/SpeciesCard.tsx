import { motion } from "framer-motion";

interface SpeciesCardProps {
  name: string;
  scientificName: string;
  population: string;
  status: string;
  habitat: string;
  image: string;
  index: number;
}

const SpeciesCard = ({
  name,
  scientificName,
  population,
  status,
  habitat,
  image,
  index,
}: SpeciesCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "endangered":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      case "vulnerable":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      case "critically endangered":
        return "bg-red-700/20 text-red-300 border-red-700/50";
      default:
        return "bg-jungle-amazon/20 text-jungle-canopy border-jungle-amazon/50";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card-jungle group overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jungle-darkest via-transparent to-transparent opacity-60" />
        
        {/* Status Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider border ${getStatusColor(status)}`}>
          {status}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-display text-2xl text-ivory">{name}</h3>
          <p className="text-jungle-canopy italic text-sm">{scientificName}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-jungle-medium/30">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Population</p>
            <p className="text-ivory font-semibold">{population}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Habitat</p>
            <p className="text-ivory font-semibold">{habitat}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpeciesCard;
